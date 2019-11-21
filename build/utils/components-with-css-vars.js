const fs = require('fs');
const path = require('path');

const modules = fs.readdirSync(path.resolve(__dirname, '../../public/packages/core/components'));

const withCssVars = [];

modules.forEach((module) => {
  if (module[0] === '.') return;
  const cssVarsPath = path.resolve(__dirname, `../../public/packages/core/components/${module}/${module}-vars.less`);
  if (fs.existsSync(cssVarsPath)) {
    const content = fs.readFileSync(cssVarsPath, 'utf8');
    if (content && content.trim().length) withCssVars.push(module);
  }
});

module.exports = withCssVars;
