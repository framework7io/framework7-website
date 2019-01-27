const highlight = require('./highlight');

module.exports = (code, { lang } = {}) => {
  code = code
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  code = `<pre><code class="${lang || ''}">${highlight(code, lang)}</pre></code>`;
  return code;
};
