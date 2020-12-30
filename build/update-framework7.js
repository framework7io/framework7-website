const { promise: exec } = require('exec-sh');
const fs = require('fs');

const update = async () => {
  await exec('npm update framework7');
  await exec('npm update framework7-react');
  await exec('npm update framework7-vue');
  await exec('npm update framework7-svelte');
  await exec('cp -r ../framework7/packages/* public/packages/');
  await exec('cp -r ../framework7/kitchen-sink/* public/kitchen-sink/');
  await exec('cp ../framework7/CHANGELOG.md src/CHANGELOG.md');

  const corePkg = require('../public/packages/core/package.json');
  const currentPkg = require('../package.json');

  const date = new Date();
  const formattedDate = Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

  currentPkg.releaseVersion = corePkg.version;
  currentPkg.releaseDate = formattedDate;

  fs.writeFileSync('./package.json', JSON.stringify(currentPkg, '', 2));
};

update();
