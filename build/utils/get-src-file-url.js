const pkg = require('../../package.json');

module.exports = (file) => {
  return `${pkg.repository.url}/edit/v4/src/pug/${file.path.split('/src/pug/')[1]}`;
};
