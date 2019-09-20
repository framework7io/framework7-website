module.exports = (content = '') => {
  content = content.replace(/`([^\n`]*)`/g, (string, code) => {
    if (string.indexOf('${') >= 0) return string;
    return `<code>${code}</code>`;
  });

  return content;
};
