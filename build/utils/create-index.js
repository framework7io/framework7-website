const makeId = require('./make-id');
const componentsWithCssVars = require('./components-with-css-vars');

module.exports = (content = '') => {
  if (content.indexOf('ul.docs-index') < 0) {
    return content;
  }
  function replaceText(text) {
    return text
      .replace(/#\[code([^\]]*)]/g, '$1')
      .replace(/`([^`]*)`/g, '$1')
      .trim();
  }

  const headings = [];

  function findHeadings(replace) {
    let re;
    re = / h([1-5])\([^\(]*\) ([^\n]*)/g;
    content = content.replace(re, ((string, level, text, index) => {
      if (level === '1' || level === '4' || level === '5') return string;
      text = replaceText(text);
      const id = makeId(text);
      if (!replace) {
        headings.push({
          level,
          text,
          index,
          id,
        });
        return string;
      }
      return ` h${level}#${id}${string.substring(3)}`;
    }));

    re = / h([1-5]) ([^\n]*)/g;
    content = content.replace(re, ((string, level, text, index) => {
      if (level === '1' || level === '4' || level === '5') return string;
      text = replaceText(text);
      const id = makeId(text);
      if (!replace) {
        headings.push({
          level,
          text,
          index,
          id,
        });
        return string;
      }
      return ` h${level}#${id}${string.substring(3)}`;
    }));

    re = / \+cssVars\('([a-z\-0-9]*)'\)/g;
    content = content.replace(re, ((string, module, index) => {
      if (componentsWithCssVars.indexOf(module) < 0) {
        return string;
      }
      const id = makeId('CSS Variables');
      if (!replace) {
        headings.push({
          level: '2',
          text: 'CSS Variables',
          index,
          id,
        });
      }

      return string;
    }));

    re = / \+cssVars\('([a-z\-0-9]*)', false, '([a-zA-Z 0-9]*)'\)/g;
    content = content.replace(re, ((string, module, title, index) => {
      if (componentsWithCssVars.indexOf(module) < 0) {
        return string;
      }
      const id = makeId(title);
      if (!replace) {
        headings.push({
          level: '2',
          text: title,
          index,
          id,
        });
      }

      return string;
    }));
  }

  findHeadings();
  findHeadings(true);

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
