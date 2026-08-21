/* global hexo */

'use strict';

const path = require('path');

hexo.extend.filter.register('theme_inject', injects => {
  let theme = hexo.theme.config;
  if (!theme.giscus || !theme.giscus.enable) return;

  injects.comment.raw('giscus', '<div class="comments giscus"></div>', {}, {cache: true});

  injects.bodyEnd.file('giscus', path.join(hexo.theme_dir, 'layout/_third-party/comments/giscus.swig'));
});
