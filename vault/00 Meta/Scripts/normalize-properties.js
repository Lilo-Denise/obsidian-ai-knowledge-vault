// Normalize note properties to the vault schema (see Structure Spec).
// Run from a terminal while Obsidian is open:
//   obsidian eval code="globalThis.NORMALIZE_DRY=true; $(cat '00 Meta/Scripts/normalize-properties.js')"
// Set NORMALIZE_DRY=false to write. Writes go through Obsidian's frontmatter API.
(async () => {
  const DRY = globalThis.NORMALIZE_DRY !== false;
  const ORDER = ['type', 'status', 'source', 'author', 'published', 'created', 'tags', 'lang', 'mode', 'id'];
  const DROP = ['title', 'description', 'updated', 'cubox_type', 'cubox_url'];
  const SKIP = ['90 Templates/'];
  const iso = v => {
    if (typeof v !== 'string') return v;
    const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    return m ? `${m[3]}-${m[1]}-${m[2]}` : v;
  };
  const ordered = o => {
    const out = {};
    for (const k of ORDER) if (k in o) out[k] = o[k];
    for (const k of Object.keys(o)) if (!(k in out)) out[k] = o[k];
    return out;
  };
  const report = [];
  for (const file of app.vault.getMarkdownFiles()) {
    if (SKIP.some(s => file.path.startsWith(s))) continue;
    const fm0 = app.metadataCache.getFileCache(file)?.frontmatter;
    if (!fm0) { report.push(`SKIP no frontmatter: ${file.path}`); continue; }
    const old = { ...fm0 };
    delete old.position;
    const isCubox = 'cubox_url' in old || 'cubox_type' in old || file.path.startsWith('01 Inbox/Cubox/');
    const fm = { ...old };

    // description: Cubox "@name 的笔记" becomes author; anything else moves into the body
    let bodyLine = null;
    const desc = typeof fm.description === 'string' ? fm.description.trim() : '';
    if (desc) {
      const m = desc.match(/^@(.+?)\s*的笔记/);
      if (isCubox && m) { if (!fm.author) fm.author = m[1].trim(); }
      else bodyLine = desc;
    }
    for (const k of DROP) delete fm[k];

    if (typeof fm.author === 'string') fm.author = fm.author.replace(/^\[\[(.*?)\]\]$/, '$1');
    if (Array.isArray(fm.tags)) fm.tags = fm.tags.filter(t => t !== 'clippings');
    else if (fm.tags == null || fm.tags === '') fm.tags = [];
    fm.created = iso(fm.created);
    if (isCubox && !fm.lang) fm.lang = 'zh';
    if (fm.type === 'framework') { fm.type = 'knowledge'; if (!fm.status) fm.status = 'done'; }
    if (!fm.type) fm.type = 'source';
    if (!fm.status) fm.status = 'inbox';

    const next = ordered(fm);
    if (JSON.stringify(next) === JSON.stringify(old) && !bodyLine) continue;
    const removed = Object.keys(old).filter(k => !(k in next));
    const added = Object.keys(next).filter(k => !(k in old));
    const changed = Object.keys(next).filter(k => k in old && JSON.stringify(next[k]) !== JSON.stringify(old[k]));
    report.push(`${file.path} | -[${removed}] +[${added}] ~[${changed}]${bodyLine ? ' | desc->body' : ''}`);
    if (DRY) continue;

    await app.fileManager.processFrontMatter(file, f => {
      for (const k of Object.keys(f)) delete f[k];
      Object.assign(f, next);
    });
    if (bodyLine) {
      const quote = bodyLine.split('\n').map(l => `> ${l}`).join('\n');
      await app.vault.process(file, text => {
        const fmEnd = text.match(/^---\n[\s\S]*?\n---\n/);
        const head = fmEnd ? fmEnd[0] : '';
        const body = text.slice(head.length);
        const h1 = body.match(/^\s*# .*\n/);
        return h1
          ? head + h1[0] + '\n' + quote + '\n' + body.slice(h1[0].length)
          : head + quote + '\n\n' + body;
      });
    }
  }
  return (DRY ? 'DRY RUN\n' : 'APPLIED\n') + `${report.length} notes\n` + report.join('\n');
})()
