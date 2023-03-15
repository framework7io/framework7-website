const fs = require('fs');
const path = require('path');

// eslint-disable-next-line
const sponsorsList = require(path.resolve(__dirname, '../src/pug/sponsors/sponsors.json'));
const keepImages = sponsorsList.map((s) => s.image);

fs.readdirSync('./public/i/sponsors').forEach((f) => {
  if (f[0] === '.') return;
  if (!keepImages.includes(f)) {
    fs.unlinkSync(path.resolve('./public/i/sponsors', f));
  }
});
