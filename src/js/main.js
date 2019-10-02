import $ from 'dom7';
import initDocsDevice from './init-docs-device';
import initDocsNav from './init-docs-nav';
import initDocsHeaders from './init-docs-headers';

initDocsDevice();
initDocsNav();
initDocsHeaders();

// Docs clickable titles
$('.docs-content').find('h2, h3').on('click', function onClick() {
  const $h = $(this);
  if (!$h.attr('id')) return;
  document.location.hash = $h.attr('id');
});

// GH Stars/Forks
function fetchGitStats(local) {
  if (local) {
    if (localStorage.getItem('f7-git-stats-stars')) {
      $('.gh-stars span').html(localStorage.getItem('f7-git-stats-stars'));
    }
    if (localStorage.getItem('f7-git-stats-forks')) {
      $('.gh-forks span').html(localStorage.getItem('f7-git-stats-forks'));
    }
    return;
  }
  if (window.fetch) {
    window.fetch('https://api.github.com/repos/framework7io/framework7')
      .then(res => res.json())
      .then((data) => {
        if (!data) return;
        localStorage.setItem('f7-git-stats-date', new Date().getTime());
        if (data.stargazers_count) {
          const stars = data.stargazers_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          localStorage.setItem('f7-git-stats-stars', stars);
          $('.gh-stars span').html(stars);
        }
        if (data.forks) {
          const forks = data.forks.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          localStorage.setItem('f7-git-stats-forks', forks);
          $('.gh-forks span').html(forks);
        }
      });
  }
}
const gitStatsDate = localStorage.getItem('f7-git-stats-date');
if (gitStatsDate && (new Date().getTime() - gitStatsDate * 1) < 1000 * 60 * 60) {
  fetchGitStats(true);
} else {
  fetchGitStats();
}

// Carbon
function testAdBlock() {
  let adBlockEnabled = false;
  const testAd = document.createElement('div');
  testAd.innerHTML = '&nbsp;';
  testAd.className = 'adsbox';
  document.body.appendChild(testAd);
  window.setTimeout(() => {
    if (testAd.offsetHeight === 0) {
      adBlockEnabled = true;
    }
    testAd.remove();
    if (adBlockEnabled) {
      $('.carbon').append('<div class="carbon-placeholder">Support Framework7 development by disabling AdBlock for this website</div>');
    }
  }, 0);
}
testAdBlock();
