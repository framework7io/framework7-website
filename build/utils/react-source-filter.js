const codeFilter = require('./code-filter');
const fs = require('fs');
const path = require('path');

module.exports = (src, { strip = true } = {}) => {
  if (strip) {
    src = src
      .replace(/<App>([^±]*)<\/App>/g, '$1')
      .replace(/<View>([^±]*)<\/View>/g, '$1')
      .replace(/<View main>([^±]*)<\/View>/g, '$1')
      .replace(/[ ]*<Page([^±]*)<\/Page>/g, (str) =>
        str
          .split('\n')
          .map((line) => {
            let indent = 0;
            let stopIndent;
            if (line.indexOf(' ') === 0) {
              line.split('').forEach((char) => {
                if (char === ' ' && !stopIndent) indent += 1;
                else stopIndent = true;
              });
            }
            if (indent > 4) {
              line = line.slice(4);
            }
            return line;
          })
          .join('\n'),
      )
      .trim()
      .replace('import { App, View, ', 'import { ')
      .replace('import { View, App, ', 'import { ')
      .replace('  App,\n', '')
      .replace('  View,\n', '');
  }
  let cssContent = '';
  if (src.match(/import '.\/([a-z-]*).css'/)) {
    const filename = src.match(/import '.\/([a-z-]*).css'/)[1];
    cssContent = fs.readFileSync(
      path.resolve(__dirname, `../../src/pug/docs-demos/react/${filename}.css`),
      'utf-8',
    );
    cssContent = `/* ${filename}.css */\n${cssContent}`;
    cssContent = codeFilter(cssContent, { lang: 'css' });
  }

  return codeFilter(src, { lang: 'jsx' }) + cssContent;
};
