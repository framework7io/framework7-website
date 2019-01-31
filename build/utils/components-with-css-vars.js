const fs = require('fs');
const path = require('path');

const modules = fs.readdirSync(path.resolve(__dirname, '../../packages/core/components'));

const withCssVars = [];

modules.forEach((module) => {
  if (module[0] === '.') return;
  if (fs.existsSync(path.resolve(__dirname, `../../packages/core/components/${module}/${module}-vars.less`))) {
    const content = fs.readFileSync(path.resolve(__dirname, `../../packages/core/components/${module}/${module}-vars.less`), 'utf8');
    if (content && content.trim().length) withCssVars.push(module);
  }
});

module.exports = withCssVars;
