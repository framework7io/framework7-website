const fs = require('fs');

const csv = fs.readFileSync('./tr.csv', 'utf-8');
const sponsors = JSON.parse(fs.readFileSync('./src/pug/sponsors/sponsors.json', 'utf-8'));

const trs = csv
  .split('\n')
  .filter((_, index) => index > 0)
  .map((line) => {
    const data = line.split(',');
    let date;
    try {
      date = new Date(JSON.parse(data[0]));
    } catch (err) {
      return '';
    }

    const ref = `https://opencollective.com/${data[17].replace(/"/g, '')}`;
    return { date, ref };
  })
  .filter((tr) => !!tr)
  .filter(({ date }) => {
    return new Date().getTime() - date.getTime() < 45 * 24 * 60 * 60 * 1000;
  })
  .map(({ ref }) => ref);

const toRemove = sponsors
  .filter((s) => s.ref.includes('opencollective') && !s.endDate && !trs.includes(s.ref))
  .map((s) => s.ref);

console.log(toRemove);
