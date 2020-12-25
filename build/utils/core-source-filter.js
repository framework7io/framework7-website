const stripIndent = require('strip-indent');
const codeFilter = require('./code-filter');

module.exports = (src, { strip = true, unwrapTemplate = false } = {}) => {
  if (strip) {
    let templateContent = src.match(/<!-- source start -->([^±]*)<!-- source end -->/g);
    if (templateContent && templateContent[0]) {
      templateContent = templateContent[0]
        .replace(/<!-- source start -->\n/, '')
        .replace(/<!-- source end -->/, '')
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
        .join('\n');
      const scriptContent = src.split('</template>')[1].trim();
      src = `<template>\n${templateContent}</template>\n${scriptContent}`.replace(
        /[ ]*<\/template>/,
        '</template>',
      );
    }
  }
  if (unwrapTemplate) {
    src = src.split('<template>')[1].split('</template>')[0];
    src = stripIndent(src).trim();
  }

  return codeFilter(src, { lang: 'html' });
};
