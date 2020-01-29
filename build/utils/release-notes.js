const { Remarkable } = require('remarkable');
const fs = require('fs');
const path = require('path');

const highlight = require('./highlight');

const md = new Remarkable({
  langPrefix: '',
  highlight(code, lang) {
    return highlight(code, lang);
  },
});

module.exports = function releaseNotes() {
  let content = fs.readFileSync(path.resolve(__dirname, '../../src/CHANGELOG.md'), 'utf8');
  content = content.split('# Change Log')[1]
    .replace(/\n### /g, '\n#### ')
    .replace(/\n## /g, '\n### ')
    .replace(/\n# /g, '\n## ');

  const html = md.render(content);
  return html;
};
