const fs = require('fs');
const path = require('path');

const N4_JSON = path.resolve(__dirname, '../../src/pug/sponsors/n4-sponsors.json');

function readN4() {
  if (!fs.existsSync(N4_JSON)) return [];
  try {
    delete require.cache[N4_JSON];
    // eslint-disable-next-line
    return require(N4_JSON);
  } catch (err) {
    return [];
  }
}

module.exports = (sponsorsArr) => {
  const merged = [...readN4(), ...sponsorsArr];
  const sponsors = {
    topSupporter: merged.filter((s) => s.active && s.plan === 'topSupporter'),
    silverSponsor: merged.filter((s) => s.active && s.plan === 'silverSponsor'),
    goldSponsor: merged.filter((s) => s.active && s.plan === 'goldSponsor'),
    platinumSponsor: merged.filter((s) => s.active && s.plan === 'platinumSponsor'),
    diamondSponsor: merged.filter((s) => s.active && s.plan === 'diamondSponsor'),
  };
  return sponsors;
};
