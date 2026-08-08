# themes/next/ — Active NexT Theme

## OVERVIEW

Active theme: NexT (v8+) with Mist scheme. 1011-line `_config.yml` controls all visual and functional behavior. This is an upstream theme — prefer `_data/next.yml` overrides over direct edits.

## KEY CONFIG (themes/next/_config.yml)

| Setting | Value | Notes |
|---------|-------|-------|
| Scheme | Mist | Light sidebar, clean layout |
| Dark mode | `false` | |
| Gitalk | `enable: true` | GitHub Issues as comments |
| Local search | `enable: true` | Uses hexo-generator-searchdb |
| Chat | `enable: true` (service: chatra) | Sidebar chat button |
| Reading progress | `enable: true` | Top bar, #37c6c0 |
| Code copy | `enable: true` | Button on code blocks |
| Bookmark | `enable: true` | Saves reading progress |
| Motion | `enable: true` | Velocity.js animations |
| Font | `enable: true` | Global: Arial 0.9em |

## ENABLED FEATURES

- **Social links**: GitHub, Email, Weibo, Google+, Twitter, Facebook
- **Sidebar**: Hidden by default (toggle via icon), avatar with rotation
- **TOC**: Enabled, sidebar, max depth 6
- **Footer**: Since 2014, CC BY-NC-SA license
- **Menu**: Home, Archives, Categories, Tags, About
- **Post meta**: Created date, updated date, categories, word count

## LAYOUT FILES

- `layout/` — Swig templates (NexT uses Swig, not EJS)
- `scripts/` — Custom NexT plugins (tags, filters, helpers)
- `source/` — JS, CSS (Stylus), images

## ANTI-PATTERNS

- Do NOT edit theme files directly — overrides go in `source/_data/next.yml`
- Do NOT enable `mathjax` / `katex` unless a post has `mathjax: true` in front-matter
- Gitalk credentials are in config — rotate if this repo becomes private
