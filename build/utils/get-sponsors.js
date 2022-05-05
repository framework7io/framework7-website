module.exports = (sponsorsArr) => {
  const sponsors = {
    topSupporter: sponsorsArr.filter((s) => s.active && s.plan === 'topSupporter'),
    silverSponsor: sponsorsArr.filter((s) => s.active && s.plan === 'silverSponsor'),
    goldSponsor: sponsorsArr.filter((s) => s.active && s.plan === 'goldSponsor'),
    platinumSponsor: sponsorsArr.filter((s) => s.active && s.plan === 'platinumSponsor'),
    diamondSponsor: sponsorsArr.filter((s) => s.active && s.plan === 'diamondSponsor'),
  };
  return sponsors;
};
