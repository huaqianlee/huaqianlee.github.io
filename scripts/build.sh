#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"

echo "==> Building Astro (personal site)..."
cd "$ROOT/astro"
npm run build

echo ""
echo "==> Building Hexo (blog)..."
cd "$ROOT/blog"
node node_modules/hexo/bin/hexo generate

echo ""
echo "==> Merging blog into dist/blog/..."
mkdir -p "$DIST/blog"
cp -a "$ROOT/blog/public/"* "$DIST/blog/"

echo ""
echo "==> Done! Output: $DIST"
echo "    Personal site:  $DIST/index.html"
echo "    Blog:           $DIST/blog/index.html"
