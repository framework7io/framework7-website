const highlight = require('./highlight');

module.exports = (code, { lang } = {}) => {
  code = code
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;lt;/g, '&lt;')
    .replace(/&amp;gt;/g, '&gt;');

  code = `<pre><code class="${lang || ''}">${highlight(code, lang)}</code></pre>`;
  return code;
};
