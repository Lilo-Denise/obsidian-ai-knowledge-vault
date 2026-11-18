# Obsidian + Claude Knowledge Vault

The structure behind my personal knowledge base: how reading, courses and research get captured, filed, tracked and turned into my own notes, with Claude working inside Obsidian. I designed the rules with Claude and use it daily inside the vault.

This repo is the empty template: folders, note templates, capture settings, a tracking board and one maintenance script. My notes are not included.

## The problem it solves

I save far more than I study: articles, videos, social posts, course material. Before this setup, saved items sat unread in a folder for a month, folders multiplied by topic, and nothing showed what I was actually learning.

## How it works

```
 Web Clipper ──┐                        ┌──→ ref (saved, not studied: most items, by design)
 (browser)     ├──→ 01 Inbox ──→ triage ┤
 Cubox ────────┘                        └──→ Source note ──→ Index / Map
 (phone reading,                              annotations grow
  triaged first)                              inside the same file

 Courses, books, research ──→ straight to the right area or 02 Projects (skips the Inbox)
```

- **Two capture routes.** Things I run into go through the Inbox. Things I choose to study skip it.
- **One file per source.** Highlights, my notes and questions all live in the source note, which moves from `ref` to `doing` to `done`.
- **Index notes connect collections.** Each course or project gets one Index note listing its parts, links out, and the through-line.

## Three mechanisms, one job each

| Mechanism | Answers | Example |
|---|---|---|
| Folder | Which stage, which area | `01 Inbox`, `03 Knowledge/20 GTM` |
| Property | What it is, how far along | `type: source`, `status: doing` |
| Tag | What it's about | `positioning`, `agents` |

If something is already expressed one way, it is not expressed another way too. That single rule keeps the vault from sprawling.

## Where Claude comes in

- **Claude inside Obsidian** through the Claudian plugin, which runs Claude Code on my Claude subscription (no API key). I ask it to summarize a source, explain a passage, or draft an Index note from a collection.
- **AI-labeled notes.** The `mode: ai-first` property marks notes where a model gave me the first frame, so months later I know which judgments are mine.
- **Maintenance by script.** `normalize-properties.js` brings every note's properties to the schema (with a dry run first), run from a terminal through the Obsidian CLI.

## What's in the repo

```
vault/
  00 Dashboard/Learning.md        where attention actually went (Dataview)
  00 Meta/00 Vault Home.md        fields, folders and rules in one page
  00 Meta/Tracker.base            board and table views (Obsidian Bases)
  00 Meta/Clipper Templates/      Web Clipper templates for articles and YouTube
  00 Meta/Scripts/                normalize-properties.js
  01 Inbox/ … 90 Templates/       the empty folder structure and three note templates
```

## Use it

1. Copy `vault/` into a new Obsidian vault.
2. Turn on the core Bases plugin; install Dataview for the dashboard.
3. In the Obsidian Web Clipper extension, import `types.json` under Properties and the two templates under Templates.
4. Optional: install Cubox Sync and point it at `01 Inbox/Cubox`, and Claudian for Claude inside Obsidian.

## Plugins I use

Bases (core), Dataview, Templater, QuickAdd, Tasks, PDF++, Excalidraw, Custom Attachment Location, Advanced Rename and Delete Handler, Cubox Sync, Claudian.
