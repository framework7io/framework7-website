const { JSDOM } = require('jsdom');
const jQuery = require('jquery');
const fs = require('fs');

const searchData = [];

let currentData = [];
try {
  currentData = require('../search-index.json') || [];
} catch (e) {
  // no index
}

function generateTitleHash(title) {
  return title.trim()
    .replace(/\ /g, '-')
    .replace(/\//g, '-')
    .replace(/"/g, '')
    .replace(/'/g, '-')
    .replace(/:/g, '')
    .replace(/,/g, '')
    .replace(/\./g, '')
    .replace(/\+/g, '')
    .replace(/---/g, '-')
    .replace(/--/g, '-')
    .toLowerCase()
    .replace(/\-&-/g, '-');
}

function addSection(section) {
  if (section.text) {
    section.text = section.text.map((el) => {
      return el
        .replace(/([ ]{2,})/g, ' ')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/([\n ]{2,})/g, '\n')
        .replace(/([\n]{2,})/g, '\n');
    }).join('\n').replace(/([\n ]{2,})/g, '\n');
  }
  searchData.push(section);
}
function parseFolder(folder, docs) {
  const files = fs.readdirSync(`./${folder}/`);
  files.forEach((file) => {
    if (file.indexOf('.') === 0) return;
    const content = fs.readFileSync(`./${folder}/${file}`, 'utf8');
    const dom = new JSDOM(content, {});
    const window = dom.window;
    const $ = jQuery(window);
    const $docsContent = $('.docs-content');
    $docsContent.find('pre code.html, pre code.css').parent('pre').remove();

    const page = $docsContent.find('h1').text();
    const url = `/${folder}/${file}`;

    let section;
    const $nextAll = $docsContent.find('h1').nextAll();
    for (let i = 0; i < $nextAll.length; i += 1) {
      const $el = $nextAll.eq(i);
      if ($el.is('pre')) continue;
      if ($el.hasClass('with-device')) continue;
      if ($el.is('h2')) {
        if (section) addSection(section);
        section = {
          docs,
          page,
        };
        section.section = $el.text().trim();
        section.pageUrl = url;
        section.sectionUrl = `${url}#${generateTitleHash(section.section)}`;
      } else if (section) {
        if (!section.text) section.text = [];
        let text = '';
        if ($el.is('h3')) {
          text += `${$el.text().trim()}`;
        }
        if ($el.is('table')) {
          text += $.makeArray($el.find('tr'))
            .map((row) => {
              return $.makeArray($(row).find('td')).map(cell => $(cell).text().trim()).join(' | ');
            })
            .join('\n');
        } else {
          text += $el.text().trim();
        }
        section.text.push(text);
      }
    }
    if (section) {
      addSection(section);
    }
  });
}

parseFolder('docs', 'Framework7 API');
parseFolder('vue', 'Framework7 Vue');
parseFolder('react', 'Framework7 React');

fs.writeFileSync('./search-index.json', JSON.stringify(searchData, null, 2));

console.log('Done!');
console.log(`Entries before: ${currentData.length}`);
console.log(`Entries after: ${searchData.length}`);
