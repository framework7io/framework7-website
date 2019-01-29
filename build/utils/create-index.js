const makeId = require('./make-id');

module.exports = (content = '') => {
  if (content.indexOf('ul.docs-index') < 0) {
    return content;
  }
  function replaceText(text) {
    return text.replace(/#\[code([^\]]*)]/g, '$1').trim();
  }

  const headings = [];
  let re;
  re = / h([1-5])\([^\(]*\) ([^\n]*)/g;
  content = content.replace(re, ((string, level, text, index) => {
    if (level === '1' || level === '4' || level === '5') return string;
    text = replaceText(text);
    const id = makeId(text);
    let lineIndex;
    content.split(/\n/g).forEach((line, lIndex) => {
      if (`${line}\n`.indexOf(`${string}\n`) >= 0) {
        lineIndex = lIndex;
      }
    });
    headings.push({
      level,
      text,
      index: lineIndex,
      id,
    });
    return ` h${level}#${id}${string.substring(3)}`;
  }));

  re = / h([1-5]) ([^\n]*)/g;
  content = content.replace(re, ((string, level, text, index) => {
    if (level === '1' || level === '4' || level === '5') return string;
    text = replaceText(text);
    const id = makeId(text);
    let lineIndex;
    content.split(/\n/g).forEach((line, lIndex) => {
      if (`${line}\n`.indexOf(`${string}\n`) >= 0) {
        lineIndex = lIndex;
      }
    });
    headings.push({
      level,
      text,
      index: lineIndex,
      id,
    });
    return ` h${level}#${id}${string.substring(3)}`;
  }));

  re = / \+cssVars\('([a-z\-0-9]*)'\)/g;
  content = content.replace(re, ((string, module, index) => {
    const id = makeId('CSS Variables');

    let lineIndex;
    content.split(/\n/g).forEach((line, lIndex) => {
      if (line.indexOf(string) >= 0) lineIndex = lIndex;
    });

    headings.push({
      level: '2',
      text: 'CSS Variables',
      index: lineIndex,
      id,
    });
    return string;
  }));

  re = / \+cssVars\('([a-z\-0-9]*)', false, '([a-zA-Z 0-9]*)'\)/g;
  content = content.replace(re, ((string, module, title, index) => {
    const id = makeId(title);

    let lineIndex;
    content.split(/\n/g).forEach((line, lIndex) => {
      if (line.indexOf(string) >= 0) lineIndex = lIndex;
    });

    headings.push({
      level: '2',
      text: title,
      index: lineIndex,
      id,
    });
    return string;
  }));

  headings.sort((a, b) => {
    return a.index > b.index ? 1 : -1;
  });

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

  content = content.replace(/\n([ ]*)ul.docs-index([^\n]*)\n/g, `\n$1ul.docs-index$2\n$1  ${indexHtml}\n`);

  return content;
};
