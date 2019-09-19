
module.exports = (content = '') => {
  content = content.replace(/`([^`^\n^(${)]*)`/g, (string, code) => {
    return `<code>${code}</code>`;
  });

  return content;
};
