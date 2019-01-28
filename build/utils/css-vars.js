const fs = require('fs');
const less = require('less');

const codeFilter = require('./code-filter');
const makeId = require('./make-id');

module.exports = (component, info = true, title = 'CSS Variables') => {
  const file = `./packages/core/components/${component}/${component}-vars.less`;
  if (!fs.existsSync(file)) return '';
  const content = fs.readFileSync(`./packages/core/components/${component}/${component}-vars.less`, 'utf8');
  if (!content || !content.trim().length) return '';
  let css;
  less.render(content, (err, output) => {
    css = output.css;
  });
  if (!css || !css.trim().length) return '';
  return `
    ${info || title ? `
    <h2 id="${makeId(title)}">${title}</h2>
    ` : ''}
    ${info ? `
    <p>Below is the list of related <a href="https://developer.mozilla.org/docs/Web/CSS/Using_CSS_variables" target="_blank" rel="nofollow">CSS variables</a> (CSS custom properties).</p>
    ` : ''}
    ${info && css.indexOf('/*') >= 0 ? `
    <div class="important-note">
      <p>Note that commented variables are not specified by default and their values is what they fallback to in this case.</p>
    </div>
    ` : ''}
    ${codeFilter(css, { lang: 'css' })}
  `;
};
