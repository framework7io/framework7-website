import $, * as methods from 'dom7';
import initDocsSearch from './init-docs-search';
import initDocsDevice from './init-docs-device';
import initDocsNav from './init-docs-nav';
import initDocsTables from './init-docs-tables';
import copyToClipboard from './copy-to-clipboard';
import initUiInitiativeTemplates from './init-uiinititative-templates';
import initUiInitiativePlugins from './init-uiinititative-plugins';
import initExamplePreview from './init-example-preview';
import initHomeCanvas from './init-home-canvas';

Object.keys(methods).forEach((key) => {
  $.fn[key] = methods[key];
});

initHomeCanvas();
initDocsTables();
initDocsSearch();
initDocsDevice();
initDocsNav();
initUiInitiativeTemplates();
initUiInitiativePlugins();
initExamplePreview();

if ($('.home-intro .constructor').length) {
  const content = $('.home-intro .constructor').html();
  $('.home-intro').on('animationend', (e) => {
    if (e.animationName === 'constructor-flip') {
      setTimeout(() => {
        $('.home-intro .constructor').remove();
        $('.home-intro .center').prepend(
          `<div class="constructor constructor-no-in">${content}</div>`,
        );
      });
    }
  });
}

function trackOutboundClick(url) {
  if (!window.gtag || !url) return;
  window.gtag('event', 'click', {
    event_category: 'outbound',
    event_label: url,
  });
}

$('a').on('click', function onClick() {
  const url = this.href;
  if (!url) return;
  if (url.indexOf('http') !== 0 || url.indexOf(document.location.host) >= 0) return;
  trackOutboundClick(url, 'outbound');
});

// Mobile nav
$('.nav-toggle').on('click', () => {
  $('.nav-menu').addClass('nav-menu-visible');
});
$('.nav-menu-backdrop').on('click', () => {
  $('.nav-menu').removeClass('nav-menu-visible');
});

// Shuffle footer sponsors
function shuffleArray(array, inPlace = false) {
  const arr = inPlace ? array : [...array];
  let j;
  let x;
  let i;
  for (i = arr.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
}
if ($('footer .custom-sponsors a').length) {
  let sponsors = [];
  $('footer .custom-sponsors a').each((el) => {
    sponsors.push(el);
  });
  sponsors = shuffleArray(sponsors);

  $('footer .custom-sponsors').append($(sponsors));
}

// Home device theme switch
$('.home-header .theme-switch a').click(function onClick(e) {
  if ($(this).hasClass('active')) {
    return;
  }
  e.preventDefault();
  const url = $(this).attr('href');
  const theme = url.split('?theme=')[1];
  $('header .phone iframe').attr('src', `${url}&safe-areas=true`);
  $('header .phone').removeClass('ios md').addClass(theme);
  $('.home-header .theme-switch a').removeClass('active');
  $(this).addClass('active');
  $('header .phone .fullscreen').attr('href', url);
});

$('.home-header a[href="#get-started"]').click((e) => {
  e.preventDefault();
  $('#get-started')[0].scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
});

$('.f7-demo-icon i').on('click', function onClick() {
  const el = this;
  const text = $(el).parent().next().text();
  copyToClipboard(text, () => {
    const $toastEl = $(
      `<div class="f7-demo-icons-toast"><b>${text}</b> is copied to clipboard</div>`,
    );
    $toastEl.once('animationend', () => {
      $toastEl.remove();
    });
    $(document.body).append($toastEl);
  });
});

// Docs clickable titles
$('.docs-content')
  .find('h2, h3')
  .on('click', function onClick() {
    const $h = $(this);
    if (!$h.attr('id')) return;
    document.location.hash = $h.attr('id');
  });

// Showcase
$('.showcase-apps .app-icon').on('click', function onClick() {
  const appHtml = $(this).parents('.app').html();
  $('body').append('<div class="showcase-app-preview-backdrop"></div>');
  $('body').append(
    `<div class="showcase-app-preview"><span class="showcase-app-preview-close"></span>${appHtml
      .replace('<h4>', '<h3>')
      .replace('</h4>', '</h3>')}</div>`,
  );
  $('body').css('overflow', 'hidden');
});
$(document).on('click', '.showcase-app-preview-close, .showcase-app-preview-backdrop', () => {
  $('.showcase-app-preview, .showcase-app-preview-backdrop').remove();
  $('body').css('overflow', '');
});
$(document).on('click', '.app-show-shots a', function onClick(e) {
  e.preventDefault();
  $(this)
    .parent()
    .hide()
    .parents('.showcase-app-preview')
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
    return;
  }
  if (window.fetch) {
    window
      .fetch('https://api.github.com/repos/framework7io/framework7')
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;
        localStorage.setItem('f7-git-stats-date', new Date().getTime());
        if (data.stargazers_count) {
          const stars = data.stargazers_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          localStorage.setItem('f7-git-stats-stars', stars);
          $('.gh-stars span').html(stars);
        }
      });
  }
}
const gitStatsDate = localStorage.getItem('f7-git-stats-date');
if (gitStatsDate && new Date().getTime() - gitStatsDate * 1 < 1000 * 60 * 60) {
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
      $('.carbon').append(
        '<div class="carbon-placeholder">Support Framework7 development by disabling AdBlock for this website</div>',
      );
    }
  }, 0);
}
testAdBlock();
