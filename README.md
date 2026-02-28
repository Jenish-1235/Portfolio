# Jenish Togadiya – Portfolio

Minimal portfolio built with Astro. All content is driven by JSON files so you can edit data without changing application code.

## Data Files

All editable content lives in `src/data/`:

| File | Purpose |
|------|---------|
| `site.json` | Site-wide: name, tagline, bio, contact, nav, footer, page titles/descriptions |
| `projects.json` | Projects list (earliest → latest; displayed reversed) |
| `experience.json` | Jobs and education (earliest → latest; displayed reversed) |

### site.json

- **name**, **tagline**, **bio** (array of paragraphs; use `**text**` for bold)
- **profileImage** – path to profile photo (e.g. `/profile.png`)
- **contact** – email, linkedin, linkedinLabel, github, githubLabel, resume
- **nav** – array of `{ label, href }`
- **footer** – contactTitle, contactMessage, copyright
- **home** – section titles, subtitles, archive links, empty messages
- **pages** – title, description, emptyMessage per page (projects, experience, blog)

### projects.json / experience.json

- Append new items at the end (chronological order).
- The site displays them reversed (newest first).

## Blog (Notion)

Blog posts come from a Notion database. Configure `NOTION_API_KEY` and `NOTION_DATABASE_ID` in `.env`.

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
