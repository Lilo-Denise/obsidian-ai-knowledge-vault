---
type: index
status: done
created: 2026-09-14
tags: [obsidian]
---

# Vault Home

Entry point. The board below is the only thing that needs looking at; everything else is a map.

![[Tracker.base]]

## Folders

| Folder | Holds |
|---|---|
| `00 Dashboard/` | Views that read the vault and hold no knowledge |
| `00 Meta/` | This manual, the tracker, templates for capture tools, scripts |
| `01 Inbox/` | Passive capture: Web Clipper to `Clipper/`, Cubox to `Cubox/`. Cleared weekly |
| `02 Projects/` | Work with a deliverable and a finish line. One folder each, with a `00 <name> Index.md` |
| `03 Knowledge/` | Digested notes in 8 areas: `10 Marketing`, `20 GTM`, `30 Product Management`, `40 AI`, `50 Startup`, `60 Industry & Companies`, `70 Tools`, `80 General` |
| `04 Output/` | Shipped, audience-facing work |
| `05 Career/` | Job search: case practice, resume, interview stories, company prep |
| `08 Archive/` | Dead or finished |
| `90 Templates/` | Note templates |

Attachments live next to their note in `assets/<note name>/`, placed automatically.

## Fields

```yaml
type: source | knowledge | index | project | output     # required
#   source    = anchored to one external source; your notes go IN this file (most notes)
#   knowledge = standalone, written on purpose, not tied to a single source (few)
status: inbox | ref | todo | doing | done | dropped     # required
mode: read | ai-first | quick                            # optional; ai-first = a model gave the first frame
source: <url>                                           # optional
author: / published:                                    # optional, source notes only
lang: zh                                                # only when a note is not in English
created: YYYY-MM-DD
```

`dropped` has to exist. Without it, abandoned items pose as `todo` forever and the board stops being opened.

## Rules

- **One mechanism per job.** Folder = stage and area. Property = type and status. Tag = subject.
- **Tags:** subject only, flat (no `a/b/c`), two to four per note, and only if you will later want to pull up every note on that subject.
- **Filing Marketing / GTM / PM:** how we take it to market goes to `20 GTM`; how we position and say it goes to `10 Marketing`; what we build and why goes to `30 Product Management`. Main question wins, tag the other side.
- **New subfolder:** about ten notes under one tag in one area, and you want to browse rather than search.
- **New area:** will it run for more than a year, overlap every existing area by less than half, and have a one-sentence boundary? All three must be yes. Until then: `80 General/` plus a tag.
- **Each collection gets one Index note** (contents, links out, through-line). Each note ends with a `## Related` section of two to five links.
