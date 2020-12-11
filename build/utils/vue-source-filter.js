const stripIndent = require('strip-indent');
const codeFilter = require('./code-filter');

module.exports = (src, { strip = true } = {}) => {
  if (strip) {
    src = src
      .replace(/<f7-app>([^±]*)<\/f7-app>/g, '$1')
      .replace(/<f7-view>([^±]*)<\/f7-view>/g, '$1')
      .replace(/<f7-view main>([^±]*)<\/f7-view>/g, '$1')
      .replace(/[ ]*<f7-page([^±]*)<\/f7-page>/g, (str) => stripIndent(str))
      .trim()
      .replace(/import {([^±]*)f7-app, /, 'import {$1')
      .replace(/import {([^±]*)f7-view, /, 'import {$1')
      .replace('<template>\n  \n    \n<f7-page>', '<template>\n<f7-page>')
      .replace('</f7-page>\n    \n  \n</template>', '</f7-page>\n</template>');
  }

  return codeFilter(src, { lang: 'html' });
};
