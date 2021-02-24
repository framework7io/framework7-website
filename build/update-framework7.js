const { promise: exec } = require('exec-sh');
const fs = require('fs');

const update = async () => {
  await exec('npm update framework7 framework7-react framework7-vue framework7-svelte');
  await exec('cp -r ../framework7/packages/* public/packages/');
  await exec('cp -r ../framework7/kitchen-sink/core/* public/kitchen-sink/core');
  await exec('cp -r ../framework7/kitchen-sink/react/dist/* public/kitchen-sink/react');
  await exec('cp -r ../framework7/kitchen-sink/vue/dist/* public/kitchen-sink/vue');
  await exec('cp -r ../framework7/kitchen-sink/svelte/dist/* public/kitchen-sink/svelte');
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
