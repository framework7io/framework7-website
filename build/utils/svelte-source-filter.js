const stripIndent = require('strip-indent');
const codeFilter = require('./code-filter');

module.exports = (src, { strip = true } = {}) => {
  if (strip) {
    src = src
      .replace(/<App>([^±]*)<\/App>/g, '$1')
      .replace(/<View>([^±]*)<\/View>/g, '$1')
      .replace(/<View main>([^±]*)<\/View>/g, '$1')
      .replace(/[ ]*<Page([^±]*)<\/Page>/g, str => stripIndent(str))
      .trim()
      .replace(/import {([^±]*)App, /, 'import {$1')
      .replace(/import {([^±]*)View, /, 'import {$1');
  }

  return codeFilter(src, { lang: 'svelte' });
};
