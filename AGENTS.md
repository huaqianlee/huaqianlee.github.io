# PROJECT KNOWLEDGE BASE

**Generated:** 2026-06-03
**Project:** Andy.Lee's Personal Website — `huaqianlee.github.io`

## QUICK START

```bash
# Personal site (Astro) — dev server
cd astro && npm run dev          # → http://localhost:4321

# Blog (Hexo) — dev server
cd blog && node node_modules/hexo/bin/hexo server   # → http://localhost:4000/blog

# Combined build for deployment
bash scripts/build.sh            # → dist/ (Astro + Hexo merged)
```

## STRUCTURE

```
huaqianlee.github.io/            # Git repo root
├── astro/                       # Astro 5.x — personal website
│   ├── src/pages/
│   │   ├── index.astro          # Terminal-style homepage
│   │   ├── about.astro          # About me
│   │   └── projects.astro       # Project portfolio
│   ├── src/layouts/Layout.astro # Base layout (JetBrains Mono, dark theme)
│   ├── public/
│   │   └── image/ → ../../blog/source/image/   # Symlink to blog images
│   ├── astro.config.mjs
│   └── package.json
├── blog/                        # Existing Hexo 5.4.2 blog (moved here)
│   ├── _config.yml              # root: /blog/ — served at /blog/
│   ├── source/                  # Has own .git (blog-file repo)
│   │   ├── _posts/{category}/
│   │   └── image/
│   ├── themes/next/             # NexT 7.8.0 Mist scheme
│   └── AGENTS.md                # Blog-specific instructions
├── scripts/
│   └── build.sh                 # Combined build: Astro + Hexo → dist/
├── .github/workflows/
│   └── deploy.yml               # GitHub Actions → GitHub Pages
├── dist/                        # Built output (gitignored)
├── package.json                 # Root scripts only
└── .gitignore
```

## KEY FACTS

| Fact | Detail |
|------|--------|
| Site URL | `https://huaqianlee.github.io` |
| Personal site | Astro 5.18.2 — static, zero JS, terminal theme |
| Blog | Hexo 5.4.2, NexT 7.8.0 Mist scheme, at `/blog/` |
| Deploy | GitHub Actions (push to main) → GitHub Pages |
| Images | Shared via symlink `astro/public/image → blog/source/image` |
| Git | Root is main repo. `blog/source/` has separate git (blog-file) |

## DEPLOYMENT

Push to `main` → GitHub Actions runs `scripts/build.sh` → deploys `dist/` to GitHub Pages.

Manual deploy:
```bash
bash scripts/build.sh
# Then push content of dist/ to gh-pages branch, or let CI handle it
```

## ANTI-PATTERNS

- **Do NOT edit `blog/themes/next/` directly** — override via `blog/source/_data/next.yml`
- **Do NOT remove the image symlink** at `astro/public/image` — blog posts reference `/image/...`
- **Do NOT commit `dist/`, `blog/public/`, `blog/.deploy_git/`** — generated outputs
- **Do NOT use `npm run` in blog/** — bin symlinks may be broken; use `node node_modules/hexo/bin/hexo` instead
- **Do NOT run `hexo deploy`** — CI handles deployment now

## COMMANDS (blog)

```bash
node node_modules/hexo/bin/hexo generate   # Build blog
node node_modules/hexo/bin/hexo server     # Dev server
node node_modules/hexo/bin/hexo new post "Title"   # New post
hexo new page "Name"                       # New page
```

## SISTER INSTRUCTION FILES

| File | Covers |
|------|--------|
| `blog/AGENTS.md` | Blog content, Hexo config, front-matter conventions |
| `blog/themes/next/AGENTS.md` | Active theme config |
