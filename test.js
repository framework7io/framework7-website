const fs = require('fs');
const path = require('path');

fs.readdirSync('./src/pug/docs').forEach((f) => {
  let content = fs.readFileSync(path.resolve('./src/pug/docs', f), 'utf-8');
  if (content.includes('ul.docs-index') && !content.includes('block docs-index'))
    content = content
      .replace('ul.docs-index', '')
      .replace('block content', 'block docs-index\n\nblock content');
  fs.writeFileSync(path.resolve('./src/pug/docs', f), content);
});
