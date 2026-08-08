# themes/customtheme/ — Custom EJS Theme

## OVERVIEW

Custom-built EJS theme (previously active before switching to NexT). Full custom layout stack with its own CSS (Stylus), JS, and assets. Not currently active — root `_config.yml` sets `theme: next`.

## LAYOUT

```
layout/
├── index.ejs         # Homepage
├── post.ejs          # Single post
├── page.ejs          # Static pages
├── archive.ejs       # Archive view
├── category.ejs      # Category listing
├── tag.ejs           # Tag listing
├── layout.ejs        # Base wrapper
├── _partial/         # Reusable components
│   ├── head.ejs, header.ejs, footer.ejs
│   ├── sidebar.ejs, article.ejs
│   ├── analytics.ejs, mathjax.ejs
│   ├── search.ejs, pagination.ejs
│   ├── categories.ejs, tags.ejs
│   ├── archive.ejs, totop.ejs
│   └── after_footer.ejs
├── _widget/          # Sidebar widgets
└── post/             # Post partials
```

## ASSETS

- **CSS**: `source/css/style.styl` (Stylus with `_base/` and `_partial/`)
- **JS**: `source/js/` — gallery, totop, QR code, jquery 2.0.3
- **Fonts**: `source/font/` — custom icon fonts (7 files)
- **Fancybox**: `source/fancybox/` — image lightbox (full jquery.fancybox bundle)
- **Images**: `source/img/` — logo, avatar, icons, banner
- **Scripts**: `scripts/fancybox.js` — Hexo tag plugin for Fancybox

## CONFIG (themes/customtheme/_config.yml)

| Feature | Setting |
|---------|---------|
| PDF embed | `enable: true` |
| Index expand | `expand: true` (full posts on home) |
| TOC | Article: off, Aside: off |
| Creative Commons | `none` |
| Highlight | Default theme |
| Color | `#006666` (teal) |

## NOTES

- This theme is stable and functional — switching back just requires `theme: customtheme` in root `_config.yml`
- Uses EJS templates (NexT uses Swig) — not compatible with `_data/next.yml` overrides
- Has Fancybox bundled (not CDN) — 2MB+ of vendor JS
- Includes custom Qiniu domain image references in config
