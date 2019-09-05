import $ from 'dom7';
import initDocsSearch from './init-docs-search';
import initDocsDevice from './init-docs-device';
import initDocsNav from './init-docs-nav';
import initDocsHeaders from './init-docs-headers';

initDocsSearch();
initDocsDevice();
initDocsNav();
initDocsHeaders();

// Home device theme switch
$('.home-header .theme-switch a').click(function onClick(e) {
  if ($(this).hasClass('active')) {
    return;
  }
  e.preventDefault();
  const url = $(this).attr('href');
  $('header .phone iframe').attr('src', url);
  $('.home-header .theme-switch a').removeClass('active');
  $(this).addClass('active');
  $('header .phone .fullscreen').attr('href', url);
});
$('.home-header .mobile-preview-button').click((e) => {
  e.preventDefault();
  $('.home-header').toggleClass('mobile-preview-enabled');
});
$('.home-header a[href="#get-started"]').click((e) => {
  e.preventDefault();
  $('#get-started')[0].scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
});


// Docs clickable titles
$('.docs-content').find('h2, h3').on('click', function onClick() {
  const $h = $(this);
  if (!$h.attr('id')) return;
  document.location.hash = $h.attr('id');
});

// Showcase
$('.showcase-apps .app-icon').on('click', function onClick() {
  const appHtml = $(this).parents('.app').html();
  $('body').append('<div class="showcase-app-preview-backdrop"></div>');
  $('body').append(`<div class="showcase-app-preview"><span class="showcase-app-preview-close"></span>${appHtml.replace('<h4>', '<h3>').replace('</h4>', '</h3>')}</div>`);
  $('body').css('overflow', 'hidden');
});
$(document).on('click', '.showcase-app-preview-close, .showcase-app-preview-backdrop', () => {
  $('.showcase-app-preview, .showcase-app-preview-backdrop').remove();
  $('body').css('overflow', '');
});
$(document).on('click', '.app-show-shots a', function onClick(e) {
  e.preventDefault();
  $(this).parent().hide().parents('.showcase-app-preview')
    .find('.app-shots')
    .show()
    .find('img')
    .each(function forEach() {
      $(this).attr('src', $(this).attr('data-src'));
    });
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
