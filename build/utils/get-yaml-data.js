const yaml = require('js-yaml');
const fs = require('fs');

module.exports = (ymlPath) => {
  const doc = yaml.safeLoad(fs.readFileSync(`./src/pug/${ymlPath}`, 'utf8'));
  return doc;
};
