const jsdom = require('jsdom').jsdom;
const jQuery = require('jquery');
const fs = require('fs');

const files = fs.readdirSync('./docs/');
const searchData = [];

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
    .toLowerCase().replace(/\-&-/g,'-');
}

files.forEach((file) => {
  if (file.indexOf('.') === 0) return;
  const content = fs.readFileSync(`./docs/${file}`, 'utf8');
  const document = jsdom(content, {});
  const window = document.defaultView;
  const $ = jQuery(window);
  const $docsContent = $('.docs-content');
  $docsContent.find('pre code.html, pre code.css').parent('pre').remove();

  const docs = 'Framework7 API';
  const page = $docsContent.find('h1').text();
  const url = `/docs/${file}`;

  let section;
  const $nextAll = $docsContent.find('h1').nextAll();
  for (let i = 0; i < $nextAll.length; i += 1) {
    const $el = $nextAll.eq(i);
    if ($el.is('pre')) continue;
    if ($el.hasClass('with-device')) continue;
    if ($el.is('h2')) {
      if (section) searchData.push(section);
      section = {
        docs,
        page,
      };
      section.section = $el.text().trim();
      section.url = `${url}#${generateTitleHash(section.section)}`
    } else if (section) {
      if (!section.text) section.text = '';
      let text = '';
      if ($el.is('h3')) {
        text += `\n${$el.text().trim()}\n`;
      }
      if ($el.is('table')) {
        text += $.makeArray($el.find('tr'))
          .map((row) => {
            return $.makeArray($(row).find('td')).map(cell => $(cell).text()).join(' | ')
          })
          .join('\n')
      }
      else text += $el.text().trim();

      section.text += text;
    }
  }
  if (section) {
    searchData.push(section);
  }
});

fs.writeFileSync('./search-index.json', JSON.stringify(searchData, null, 2))

