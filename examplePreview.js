const fs = require('fs');

fs.readdirSync('./src/pug/svelte').forEach((f) => {
  if (!f.includes('.pug')) return;
  let sourceCount = 0;
  if (!fs.existsSync(`./src/pug/react/${f}`)) return;
  const reactContentSources = fs
    .readFileSync(`./src/pug/react/${f}`, 'utf-8')
    .split('\n')
    .filter((line) => line.includes('reactSourceFilterNew'))
    .map((line) => line.trim());
  let content = fs.readFileSync(`./src/pug/svelte/${f}`, 'utf-8');
  if (!content.includes('svelteSource')) return;
  content = content
    .split('\n')
    .map((line) => {
      if (line.includes('svelteSource')) {
        if (line.includes('store.js')) return line;
        sourceCount += 1;
        const spaces = Array.from({ length: line.length - line.trim().length })
          .map(() => ' ')
          .join('');
        return (
          spaces +
          reactContentSources[sourceCount - 1]
            .replace(`'react'`, 'svelte')
            .replace(`.jsx`, '.svelte')
        );
      }
      return line;
    })
    .join('\n');
  fs.writeFileSync(`./src/pug/svelte/${f}`, content);
});
