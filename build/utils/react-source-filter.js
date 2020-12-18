const codeFilter = require('./code-filter');

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
      .replace('  App,\n', '')
      .replace('  View,\n', '');
  }

  return codeFilter(src, { lang: 'jsx' });
};
