const fs = require('fs');
const codeFilter = require('./code-filter');

module.exports = (src, url = '') => {
  let source = fs.readFileSync(`../framework7/kitchen-sink/react/src/pages/${src}`, 'utf-8');
  // console.log(src);
  source = source.replace(` backLink="Back"`, '');
  const res = `
  <div class="example-preview my-8">
    <div class="example-preview-top flex items-center justify-between rounded-t-lg bg-black py-2 px-4">
      <div class="example-preview-file text-white text-opacity-75">${src}</div>
      <div class="example-preview-buttons flex">
        <div class="example-preview-buttons-group">
          <a
            href=${url}
            target="_blank"
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
          <button class="example-preview-button-active"
          >
            iOS
          </button>
          <button
          >
            MD
          </button>
        </div>
        <div class="example-preview-buttons-group">
          <button class="example-preview-button-active"
          >
            Light
          </button>
          <button
          >
            Dark
          </button>
        </div>
      </div>
    </div>
    <div class="example-preview-container">
      <div class="example-preview-code">
        ${codeFilter(source, { lang: 'jsx' })}
      </div>
      <div class="example-preview-frame">
        <iframe
          title="demo"
          src="/kitchen-sink/react/${url}"
          loading="lazy"
        />
      </div>
    </div>
  </div>
  `;
  return res;
};
