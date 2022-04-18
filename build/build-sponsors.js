const fs = require('fs');
const path = require('path');

module.exports = (cb) => {
  fs.copyFileSync(
    path.resolve(__dirname, '../src/pug/sponsors/sponsors.json'),
    path.resolve(__dirname, '../public/sponsors/sponsors.json'),
  );
  if (cb) cb();
};
