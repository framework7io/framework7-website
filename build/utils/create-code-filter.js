module.exports = (content = '') => {
  content = content.replace(/```([a-z]*)([^`]*)```/g, (string, lang, code) => {
    return `:code(lang="${lang}")${code.trimRight()}`;
  });

  return content;
};
