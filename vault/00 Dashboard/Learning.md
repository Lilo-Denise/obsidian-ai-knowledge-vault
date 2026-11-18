---
type: index
status: doing
created: 2026-09-15
tags: [obsidian]
---

# Learning

Where attention actually went, not where it was meant to go. All computed; nothing to maintain.

## By area

Counts are the stock. *Last touched* and *Active 30d* are the signal.

```dataview
TABLE WITHOUT ID area AS "Area", length(rows) AS "Notes",
  dateformat(max(rows.file.mtime), "MM-dd") AS "Last touched",
  length(filter(rows, (r) => r.file.mtime >= date(today) - dur(30 days))) AS "Active 30d"
FROM "03 Knowledge" OR "05 Career"
GROUP BY choice(startswith(file.folder, "03 Knowledge"), split(file.folder, "/")[1], split(file.folder, "/")[0]) AS area
SORT length(rows) DESC
```

## Intake by month

From `created`, so it reflects when work actually happened.

```dataview
TABLE WITHOUT ID month AS "Month", length(rows) AS "Added"
FROM "03 Knowledge" OR "05 Career" OR "02 Projects" OR "04 Output"
WHERE created
GROUP BY dateformat(date(created), "yyyy-MM") AS month
SORT month DESC
LIMIT 8
```

## Recently touched

```dataview
TABLE WITHOUT ID file.link AS "Note", file.folder AS "Where",
  dateformat(file.mtime, "MM-dd") AS "Touched"
FROM -"00 Meta" AND -"00 Dashboard" AND -"90 Templates"
SORT file.mtime DESC
LIMIT 12
```

## Open right now

```dataview
TABLE WITHOUT ID file.link AS "Note", status AS "Status", file.folder AS "Where"
WHERE status = "doing" OR status = "todo"
SORT status ASC, file.mtime DESC
```

## Thin areas

Three notes or fewer. Not a nudge to study them, just a look at what you actually traded away.

```dataview
TABLE WITHOUT ID area AS "Area", length(rows) AS "Notes",
  dateformat(max(rows.file.mtime), "MM-dd") AS "Last touched"
FROM "03 Knowledge" OR "05 Career"
GROUP BY choice(startswith(file.folder, "03 Knowledge"), split(file.folder, "/")[1], split(file.folder, "/")[0]) AS area
WHERE length(rows) <= 3
SORT length(rows) ASC
```

Empty areas never appear: Dataview only counts folders that contain notes.

## Related

- [[00 Vault Home]]: structure, fields, rules
- [[Tracker.base|Tracker]]: board view
