const path = require('path');
const pug = require('pug');
const fs = require('fs');

const pugContent = fs.readFileSync('./src/pug/docs-demos/core/_layout.pug', 'utf8');
const pugTemplate = pug.compile(pugContent);

function buildOne(fileName, cb) {
  const name = fileName.split('.f7.html')[0];
  if (name.indexOf('_') >= 0 || !name) {
    if (cb) cb();
    return Promise.resolve();
  }
  const time = Date.now();
  console.log(`Starting core: ${name}`);

  const f7Demos = fs
    .readdirSync('./src/pug/docs-demos/core')
    .filter((f) => f.indexOf('.f7.html') >= 0);

  const html = pugTemplate({
    F7_CORE_DEMO: name,
  });
  fs.writeFileSync(`./public/docs-demos/core/${name}.html`, html);

  const jsContent = fs
    .readFileSync('./src/pug/docs-demos/core/_main.js', 'utf-8')
    .replace(/F7_CORE_DEMO/g, name)
    .replace(/\.f7\.html/g, '_f7.html');
  fs.writeFileSync(`./public/docs-demos/core/${name}.js`, jsContent);

  // f7 demos
  f7Demos
    .filter((file) => file.indexOf(`${name}.f7.html`) === 0 || file.indexOf(`${name}_`) === 0)
    .forEach((file) => {
      const fileContent = fs
        .readFileSync(`./src/pug/docs-demos/core/${file}`, 'utf-8')
        .replace(/\.f7\.html/g, '_f7.html');
      fs.writeFileSync(
        `./public/docs-demos/core/${file.replace(/\.f7\.html/g, '_f7.html')}`,
        fileContent,
      );
    });

  console.log(`Finished core: ${name} in ${Date.now() - time}ms`);
  if (cb) cb();
  return Promise.resolve();
}

async function buildAll(cb) {
  try {
    fs.readdirSync(path.resolve(__dirname, '../public/docs-demos/core'))
      .filter(
        (file) =>
          (file.includes('.js') && !file.includes('.json')) ||
          file.includes('.css') ||
          file.includes('.html'),
      )
      .forEach((file) => {
        fs.unlinkSync(path.resolve(__dirname, `../public/docs-demos/core/${file}`));
      });
  } catch (err) {
    // err happened
  }
  const coreDemos = fs
    .readdirSync(path.resolve(__dirname, '../src/pug/docs-demos/core'))
    .filter((f) => f.includes('.f7.html') && !f.includes('_'));

  // eslint-disable-next-line
  for (name of coreDemos) {
    // eslint-disable-next-line
    await buildOne(name);
  }
  if (cb) cb();
}

module.exports = {
  one: buildOne,
  all: buildAll,
};
