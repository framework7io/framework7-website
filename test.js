const fs = require('fs');
const path = require('path');

fs.readdirSync('./src/pug/docs').forEach((f) => {
  let content = fs.readFileSync(path.resolve('./src/pug/docs', f), 'utf-8');
  if (content.includes('_docs-demo-device') && !content.includes('data-device-preview'))
    content = content.replace('include ../_docs-demo-device', '');
  fs.writeFileSync(path.resolve('./src/pug/docs', f), content);
});
