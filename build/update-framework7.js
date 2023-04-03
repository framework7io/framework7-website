const { promise: exec } = require('exec-sh');
const path = require('path');

const update = async () => {
  await exec(
    'npm i framework7@latest framework7-react@latest framework7-vue@latest framework7-svelte@latest --save',
  );
  await exec('cp -r ../framework7/packages/* public/packages/');
  await exec('rm -rf public/kitchen-sink');
  try {
    await exec(`mkdir ${path.resolve(__dirname, '../public/kitchen-sink')}`);
    await exec(`mkdir ${path.resolve(__dirname, '../public/kitchen-sink/core')}`);
    await exec(`mkdir ${path.resolve(__dirname, '../public/kitchen-sink/vue')}`);
    await exec(`mkdir ${path.resolve(__dirname, '../public/kitchen-sink/vue/src')}`);
    await exec(`mkdir ${path.resolve(__dirname, '../public/kitchen-sink/vue/dist')}`);
    await exec(`mkdir ${path.resolve(__dirname, '../public/kitchen-sink/react')}`);
    await exec(`mkdir ${path.resolve(__dirname, '../public/kitchen-sink/react/src')}`);
    await exec(`mkdir ${path.resolve(__dirname, '../public/kitchen-sink/react/dist')}`);
    await exec(`mkdir ${path.resolve(__dirname, '../public/kitchen-sink/svelte')}`);
    await exec(`mkdir ${path.resolve(__dirname, '../public/kitchen-sink/svelte/src')}`);
    await exec(`mkdir ${path.resolve(__dirname, '../public/kitchen-sink/svelte/dist')}`);
    await exec('cp -r ../framework7/kitchen-sink/core/* public/kitchen-sink/core');
    await exec('cp -r ../framework7/kitchen-sink/react/dist/* public/kitchen-sink/react/dist');
    await exec('cp -r ../framework7/kitchen-sink/react/src/* public/kitchen-sink/react/src');
    await exec('cp -r ../framework7/kitchen-sink/vue/dist/* public/kitchen-sink/vue/dist');
    await exec('cp -r ../framework7/kitchen-sink/vue/src/* public/kitchen-sink/vue/src');
    await exec('cp -r ../framework7/kitchen-sink/svelte/dist/* public/kitchen-sink/svelte/dist');
    await exec('cp -r ../framework7/kitchen-sink/svelte/src/* public/kitchen-sink/svelte/src');
    await exec('cp ../framework7/CHANGELOG.md src/CHANGELOG.md');
  } catch (err) {
    console.log(err);
  }
};

update();
