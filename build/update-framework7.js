const { promise: exec } = require('exec-sh');

const update = async () => {
  await exec(
    'npm i framework7@beta framework7-react@beta framework7-vue@beta framework7-svelte@beta --save',
  );
  await exec('cp -r ../framework7/packages/* public/packages/');
  await exec('rm -rf public/kitchen-sink');
  await exec('mkdir public/kitchen-sink');
  await exec('mkdir public/kitchen-sink/core');
  await exec('mkdir public/kitchen-sink/vue');
  await exec('mkdir public/kitchen-sink/vue/src');
  await exec('mkdir public/kitchen-sink/vue/dist');
  await exec('mkdir public/kitchen-sink/react');
  await exec('mkdir public/kitchen-sink/react/src');
  await exec('mkdir public/kitchen-sink/react/dist');
  await exec('mkdir public/kitchen-sink/svelte');
  await exec('mkdir public/kitchen-sink/svelte/src');
  await exec('mkdir public/kitchen-sink/svelte/dist');
  await exec('cp -r ../framework7/kitchen-sink/core/* public/kitchen-sink/core');
  await exec('cp -r ../framework7/kitchen-sink/react/dist/* public/kitchen-sink/react/dist');
  await exec('cp -r ../framework7/kitchen-sink/react/src/* public/kitchen-sink/react/src');
  await exec('cp -r ../framework7/kitchen-sink/vue/dist/* public/kitchen-sink/vue/dist');
  await exec('cp -r ../framework7/kitchen-sink/vue/src/* public/kitchen-sink/vue/src');
  await exec('cp -r ../framework7/kitchen-sink/svelte/dist/* public/kitchen-sink/svelte/dist');
  await exec('cp -r ../framework7/kitchen-sink/svelte/src/* public/kitchen-sink/svelte/src');
  await exec('cp ../framework7/CHANGELOG.md src/CHANGELOG.md');
};

update();
