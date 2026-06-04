# source/ — Content Root

## OVERVIEW

All blog content: 126 posts (16 categories), 5 custom pages, 11 journal entries. Images: 177 legacy + 262 cloud-migrated.

## STRUCTURE

```
source/
├── _posts/       # Blog posts by category subdirectory
│   ├── Android/   # 43 — Android system, kernel, frameworks
│   ├── Linux/     # 19 — Linux kernel, shell, drivers
│   ├── FirstCode/ # 12 — Android app dev (Misc)
│   ├── Life/      # 11 — Personal journals
│   ├── Git/       # 10 — Git workflows
│   ├── ARTS/      # 9 — Weekly ARTS challenges
│   ├── Uav/       # 7 — Drone/UAV development
│   ├── Notes/     # 3 — Tech notes
│   ├── Hexo/      # 2 — Blog engine notes
│   ├── Java/      # 2
│   ├── Web/       # 2
│   ├── C_C++/     # 1
│   ├── Camera/    # 1
│   ├── Discovery/ # 1
│   └── English/   # 1
├── about/         # About page (layout: About)
├── categories/    # Categories index (type: "categories")
├── tags/          # Tags index (type: "tags")
├── search/        # Local search (layout: search)
├── journal/       # Life journal entries (11)
└── image/         # Embedded images
    └── cloud/      # 262 cloud-migrated images (2026-05-28)
```

## WHERE TO LOOK

| Task | Path |
|------|------|
| Android posts | `source/_posts/Android/` |
| Linux posts | `source/_posts/Linux/` |
| Life journals | `source/_posts/Life/` or `source/journal/` |
| Upload images | `source/image/{category}/` |
| Cloud-migrated images | `source/image/{path}` |

## CONVENTIONS

- **Post filenames**: English kebab-case, no dates in filename
- **Front-matter**: `title` in quotes, `categories` as YAML list (two-level hierarchy), `tags` as list or scalar
- **Category hierarchy**: e.g. `Android Tree` → `Native/Kernel/Misc/etc.`
- **Images**: Use `post_asset_folder: true` — images in `source/image/{category}/`
- **Tags**: Single lowercase keyword (e.g. `tools`, `git`, `kernel`)
- **Category names**: Use spaces, no hyphens (e.g. `Android Tree`, `Linux Tree`)

## ANTI-PATTERNS

- Do NOT create flat post lists — always categorize into subdirectory
- Do NOT put Chinese in filenames — English kebab-case only
- `PDF01/` and `PDF02/` are resource folders, not category subdirs — do not treat as post categories
