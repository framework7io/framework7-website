const path = require('path');
const pkg = require('../../package.json');

module.exports = (file) => {
  return `${pkg.repository.url}/edit/master/src/pug/${
    file.path.split(`${path.sep}src${path.sep}pug${path.sep}`)[1]
  }`;
};
