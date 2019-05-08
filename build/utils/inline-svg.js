const fs = require('fs');

module.exports = (svgPath) => {
  return fs.readFileSync(svgPath, 'utf-8');
};
