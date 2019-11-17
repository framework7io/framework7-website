const fs = require('fs');
const less = require('less');

const codeFilter = require('./code-filter');
const makeId = require('./make-id');
const componentsWithCssVars = require('./components-with-css-vars');

module.exports = (component, info = true, title = 'CSS Variables') => {
  if (componentsWithCssVars.indexOf(component) < 0) return '';
  let content = fs.readFileSync(`./public/packages/core/components/${component}/${component}-vars.less`, 'utf8');
  let css;
  content = `
.ios-vars(@ruleset) {
  .ios {
    @ruleset();
  }
}
.md-vars(@ruleset) {
  .md {
    @ruleset();
  }
}
.aurora-vars(@ruleset) {
  .aurora {
    @ruleset();
  }
}
.dark-vars(@ruleset) {
  .theme-dark, &.theme-dark {
    @ruleset();
  }
}
.light-vars(@ruleset) {
  & {
    @ruleset();
  }
}
.ltr(@ruleset) {
  @ruleset();
}
.rtl(@ruleset) {}

${content}
  `;
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
