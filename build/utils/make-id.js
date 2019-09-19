module.exports = (text) => {
  return text
    .toLowerCase()
    .replace(/[\/\\\+\(\)'":;\.\,\!\?\<\>= _#$*&`]/g, ' ')
    .trim()
    .replace(/[ ]{2,}/g, ' ')
    .replace(/ /g, '-');
};
