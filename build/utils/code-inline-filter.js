module.exports = (code, { lang } = {}) => {
  code = code
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  code = `<code class="${lang || ''}">${code}</code>`;
  return code;
};
