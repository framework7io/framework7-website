const path = require('path');

module.exports = (jsonPath) => {
  // eslint-disable-next-line
  return require(path.resolve(__dirname, `../../src/pug/${jsonPath}`));
};
