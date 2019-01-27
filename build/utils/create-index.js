
module.exports = (content = '') => {
  if (content.indexOf('ul.docs-index') < 0) {
    return content;
  }
  function replaceText(text) {
    return text.replace(/#\[code([^\]]*)]/g, '$1').trim();
  }
  function makeId(text) {
    return text
      .toLowerCase()
      .replace(/[\/\\\+\(\)'":;\.\,\!\?\<\>= _#$*&]/g, ' ')
      .trim()
      .replace(/[ ]{2,}/g, ' ')
      .replace(/ /g, '-');
  }
  const headings = [];
  let re;
  re = / h([1-5])\([^\(]*\) ([^\n]*)/g;
  content = content.replace(re, ((string, level, text, index) => {
    text = replaceText(text);
    const id = makeId(text);
    headings.push({
      level, text, index, id,
    });
    if (level === '1') return string;
    return ` h${level}#${id}${string.substring(3)}`;
  }));

  re = / h([1-5]) ([^\n]*)/g;
  content = content.replace(re, ((string, level, text, index) => {
    text = replaceText(text);
    const id = makeId(text);
    headings.push({
      level, text, index, id,
    });
    if (level === '1') return string;
    return ` h${level}#${id}${string.substring(3)}`;
  }));

  headings.sort((a, b) => {
    return a.index > b.index ? 1 : -1;
  });

  if (content.indexOf('.docs-index') >= 0) {
    let indexHtml = '';
    let hasNested = false;
    headings.forEach(({ level, text, id }, index) => {
      if (level === '1' || level === 1) return;
      const tag = `h${level}`;
      if (tag === 'h3' && !hasNested) {
        indexHtml += '<ul>';
        hasNested = true;
      }
      if (tag === 'h2' && hasNested) {
        indexHtml += '</ul>';
        hasNested = false;
      }
      indexHtml += `<li><a href="#${id}">${text}</a></li>`;
      if (hasNested && index === headings.length - 1) {
        indexHtml += '</ul>';
      }
    });
    content = content.replace(/\n([ ]*)ul.docs-index\n/g, `\n$1ul.docs-index\n$1  ${indexHtml}\n`);
  }
  return content;
};
