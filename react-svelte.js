const fs = require('fs');

fs.readdirSync('./src/pug/docs-demos/svelte/').forEach((fileName, index) => {
  if (fileName.indexOf('.pug') < 0) return;
  if (fileName.indexOf('_layout') >= 0) return;
  let content = fs.readFileSync(`./src/pug/docs-demos/svelte/${fileName}`, 'utf8');

  const components = [];
  const found = content.match(/<[A-Z][a-zA-Z]*/g);
  if (found) {
    found.forEach((t) => {
      const tag = t.replace('<', '');
      if (components.indexOf(tag) < 0) components.push(tag);
    });
  }
  // content = content
  //   .replace(/style={{([^}]*)}}/g, (string, styles) => {
  //     console.log(styles);
  //   });

  if (content.indexOf('$theme') >= 0) {
    content = content
      .replace(/this.$theme/g, 'theme')
      .replace(/self.$f7ready/g, 'f7ready');
    components.unshift('theme');
  }
  if (content.indexOf('$f7ready(') >= 0) {
    content = content
      .replace(/this.$f7ready/g, 'f7ready')
      .replace(/self.$f7ready/g, 'f7ready');
    components.unshift('f7ready');
  }
  if (content.indexOf('$f7;') >= 0 || content.indexOf('$f7.') >= 0) {
    content = content
      .replace(/this\.\$f7;/g, 'f7')
      .replace(/self\.\$f7;/g, 'f7')
      .replace(/this\.\$f7\./g, 'f7.')
      .replace(/self\.\$f7\./g, 'f7.');
    components.unshift('f7');
  }

  const scriptContent = `
<script>
  import {${components.join(', ')}} from 'framework7-svelte';
</script>
`;

  fs.writeFileSync(`./src/pug/docs-demos/svelte/${fileName}`, content);
});
