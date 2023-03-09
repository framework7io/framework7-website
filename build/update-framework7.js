const { promise: exec } = require('exec-sh');

const update = async () => {
  await exec(
    'npm i framework7@beta framework7-react@beta framework7-vue@beta framework7-svelte@beta --save',
  );
  await exec('cp -r ../framework7/packages/* public/packages/');
  await exec('cp -r ../framework7/kitchen-sink/core/* public/kitchen-sink/core');
  await exec('cp -r ../framework7/kitchen-sink/react/dist/* public/kitchen-sink/react');
  await exec('cp -r ../framework7/kitchen-sink/vue/dist/* public/kitchen-sink/vue');
  await exec('cp -r ../framework7/kitchen-sink/svelte/dist/* public/kitchen-sink/svelte');
  await exec('cp ../framework7/CHANGELOG.md src/CHANGELOG.md');
};

update();
