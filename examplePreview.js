const fs = require('fs');

fs.readdirSync('./src/pug/vue').forEach((f) => {
  if (!f.includes('.pug')) return;
  let sourceCount = 0;
  if (!fs.existsSync(`./src/pug/react/${f}`)) return;
  const reactContentSources = fs
    .readFileSync(`./src/pug/react/${f}`, 'utf-8')
    .split('\n')
    .filter((line) => line.includes('reactSourceFilterNew'))
    .map((line) => line.trim());
  let content = fs.readFileSync(`./src/pug/vue/${f}`, 'utf-8');
  if (!content.includes('vueSource')) return;
  content = content
    .split('\n')
    .map((line) => {
      if (line.includes('vueSource')) {
        if (line.includes('store.js')) return line;
        sourceCount += 1;
        const spaces = Array.from({ length: line.length - line.trim().length })
          .map(() => ' ')
          .join('');
        return (
          spaces +
          reactContentSources[sourceCount - 1].replace(`'react'`, 'vue').replace(`.jsx`, '.vue')
        );
      }
      return line;
    })
    .join('\n');
  fs.writeFileSync(`./src/pug/vue/${f}`, content);
});
