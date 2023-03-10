const fs = require('fs');

fs.readdirSync('./src/pug/svelte').forEach((f) => {
  if (!f.includes('.pug') || f.includes('svelteSource')) return;
  let sourceCount = 0;
  const reactContentSources = fs
    .readFileSync(`./src/pug/react/${f}`, 'utf-8')
    .split('\n')
    .filter((line) => line.includes('reactSourceFilterNew'));
  const content = fs
    .readFileSync(`./src/pug/svelte/${f}`, 'utf-8')
    .split('\n')
    .map((line) => {
      if (line.includes('svelteSource')) {
        if (line.includes('store.js')) return line;
        sourceCount += 1;
        return reactContentSources[sourceCount - 1]
          .replace(`'react'`, 'svelte')
          .replace(`.jsx`, '.svelte');
      }
      return line;
    });
  fs.readFileSync(`./src/pug/svelte/${f}`, content);
});
