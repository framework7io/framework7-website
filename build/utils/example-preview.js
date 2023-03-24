const stripIndent = require('strip-indent');
const fs = require('fs');
const codeFilter = require('./code-filter');

module.exports = (framework, src, url = '') => {
  const subPath = framework === 'core' ? '' : 'src/';
  const filePath = `./public/kitchen-sink/${framework}/${subPath}pages/${src}`;
  /* eslint-disable */
  const lang = framework === 'react' ? 'jsx' : framework === 'svelte' ? 'svelte' : 'html';
  /* eslint-enable */
  let iframeSrc =
    framework === 'core'
      ? `/kitchen-sink/${framework}/?theme=ios&mode=light&example-preview=true#!/${url}/`
      : `/kitchen-sink/${framework}/dist/?theme=ios&mode=light&example-preview=true#!/${url}/`;
  let source;
  if (framework === 'core' && !fs.existsSync(filePath)) {
    iframeSrc = `/docs-demos/core/${url}.html?theme=ios&mode=light`;
    source = fs.readFileSync(`./src/pug/docs-demos/core/${src}`, 'utf-8');
    let templateContent = source.match(/<!-- source start -->([^±]*)<!-- source end -->/g);
    if (templateContent && templateContent[0]) {
      templateContent = templateContent[0]
        .replace(/<!-- source start -->\n/, '')
        .replace(/<!-- source end -->/, '')
        .split('\n')
        .map((line) => {
          let indent = 0;
          let stopIndent;
          if (line.indexOf(' ') === 0) {
            line.split('').forEach((char) => {
              if (char === ' ' && !stopIndent) indent += 1;
              else stopIndent = true;
            });
          }
          if (indent > 4) {
            line = line.slice(4);
          }
          return line;
        })
        .join('\n');
      const scriptContent = source.split('</template>')[1].trim();
      source = `<template>\n${templateContent}</template>\n${scriptContent}`.replace(
        /[ ]*<\/template>/,
        '</template>',
      );
      if (source.indexOf('<script>') < 0 && source.indexOf('<style>') < 0) {
        source = source.split('<template>')[1].split('</template>')[0];
        source = stripIndent(source).trim();
      }
    }

    if (source.indexOf('// SKIP SOURCE START') >= 0) {
      source = source.split('// SKIP SOURCE START')[0] + source.split('// SKIP SOURCE END')[1];
    }
  } else {
    source = fs.readFileSync(filePath, 'utf-8');
  }
  source = source
    .replace(` backLink="Back"`, '')
    .replace(` back-link="Back"`, '')
    .replace(
      `<div class="left">
        <a href="#" class="link back">
          <i class="icon icon-back"></i>
          <span class="if-not-md">Back</span>
        </a>
      </div>
      `,
      '',
    )
    .replace(
      `<div class="left">
        <a class="link back">
          <i class="icon icon-back"></i>
          <span class="if-not-md">Back</span>
        </a>
      </div>
      `,
      '',
    )
    .replace(
      `<div class="left">
          <a href="#" class="link back">
            <i class="icon icon-back"></i>
            <span class="if-not-md">Back</span>
          </a>
        </div>
        `,
      '',
    )
    .replace(
      `<div class="left">
          <a class="link back">
            <i class="icon icon-back"></i>
            <span class="if-not-md">Back</span>
          </a>
        </div>
        `,
      '',
    )
    .replace(
      `<div class="left">
          <a class="link back">
            <i class="icon icon-back"></i>
            <span class="if-not-md">Back</span>
          </a>
        </div>
        `,
      '',
    );

  const res = `
  <div class="example-preview my-8">
    <div class="example-preview-top flex items-center justify-between rounded-t-lg bg-black py-2 px-4">
      <div class="example-preview-file text-white text-opacity-75">${src}</div>
      <div class="example-preview-buttons flex">
        <div class="example-preview-buttons-group">
          <a
            href=${iframeSrc}
            target="_blank"
            title="Open in new tab"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        </div>
        <div class="example-preview-buttons-group">
          <button class="example-preview-button-active" data-theme="ios" title="iOS theme">
            <i class="f7-icons">logo_apple</i>
          </button>
          <button data-theme="md" title="Material theme">
            <i class="f7-icons">logo_android</i>
          </button>
        </div>
        <div class="example-preview-buttons-group">
          <button class="example-preview-button-active" data-mode="light" title="Light mode">
            <i class="f7-icons">sun_max_fill</i>
          </button>
          <button data-mode="dark" title="Dark mode">
            <i class="f7-icons">moon_fill</i>
          </button>
        </div>
      </div>
    </div>
    <div class="example-preview-container">
      <div class="example-preview-code">
        ${codeFilter(source, { lang })}
      </div>
      <div class="example-preview-frame">
        <iframe
          title="demo"
          src="${iframeSrc}"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </div>
  `;
  return res;
};
