const pkg = require('../../package.json');

module.exports = (file) => {
  return `${pkg.repository.url}/edit/master/src/pug/${file.path.split('/src/pug/')[1]}`;
};
