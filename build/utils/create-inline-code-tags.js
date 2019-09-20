module.exports = (content = '') => {
  content = content.replace(/`([^\n`]*)`/g, (string, code) => {
    if (string.indexOf('${') >= 0) return string;
    code = code
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<code>${code}</code>`;
  });

  return content;
};
