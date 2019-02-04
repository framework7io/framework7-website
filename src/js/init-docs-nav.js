import $ from 'dom7';

function handleNavToggleScroll() {
  const st = window.scrollY;
  const headerHeight = $('.internal-header')[0].offsetHeight + $('.bsa-cpc')[0].offsetHeight;

  const pos = Math.max(headerHeight - st, 0);
  $('.docs-nav-toggle').transform(`translateY(${pos}px)`);
  $('.docs-nav-toggle').css({ opacity: 1 });
}
export default function initDocsNav() {
  if ($('.docs-nav').length > 0) {
    let loc = document.location.href;
    if (loc.indexOf('?') >= 0) loc = loc.split('?')[0];
    if (loc.indexOf('#') >= 0) loc = loc.split('#')[0];
    if (loc.indexOf('/') >= 0) {
      loc = loc.split('/');
      loc = loc[loc.length - 1];
    }

    $('.docs-nav a').each(function forEach() {
      const link = $(this).attr('href');
      if (loc === link && link !== '#') {
        $(this).addClass('active').parent('li').addClass('active');
      }
    });
    $('.docs-nav-toggle').click(() => {
      $('.docs-nav').toggleClass('docs-nav-visible');
    });
    $(window).on('resize scroll', () => {
      handleNavToggleScroll();
    });
    handleNavToggleScroll();
  }
}
