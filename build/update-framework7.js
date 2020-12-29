const { promise: exec } = require('exec-sh');

const update = async () => {
  await exec('npm update framework7');
  await exec('npm update framework7-react');
  await exec('npm update framework7-vue');
  await exec('npm update framework7-svelte');
  await exec('cp -r ../framework7/packages/* public/packages/');
  await exec('cp -r ../framework7/kitchen-sink/* public/kitchen-sink/');
};

update();
