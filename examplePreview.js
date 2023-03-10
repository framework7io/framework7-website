const fs = require('fs');

fs.readdirSync('./src/pug/docs').forEach((f) => {
  if (!f.includes('.pug')) return;

  let content = fs.readFileSync(`./src/pug/docs/${f}`, 'utf-8');
  if (!content.includes('coreSource')) return;
  content = content
    .split('\n')
    .map((line) => {
      if (line.includes('coreSource')) {
        if (line.includes('store.js')) return line;
        const spaces = Array.from({ length: line.length - line.trim().length })
          .map(() => ' ')
          .join('');
        const fName = line
          .split('include:coreSource ../docs-demos/core/')[1]
          .split('.f7.html')[0]
          .replace(/_/g, '-');
        return `${spaces}+reactSourceFilterNew('core', '${fName}.html', '${fName}')`;
      }
      return line;
    })
    .join('\n');
  fs.writeFileSync(`./src/pug/docs/${f}`, content);
});
