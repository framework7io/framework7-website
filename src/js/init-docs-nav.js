import $ from 'dom7';

function handleNavToggleScroll() {
  const st = window.scrollY;
  const headerHeight = $('.internal-header')[0].offsetHeight + $('.bsa-cpc, .internal-header-adline')[0].offsetHeight;

  const pos = Math.max(headerHeight - st, 0);
  $('.docs-nav-toggle').transform(`translateY(${pos}px)`);
  $('.docs-nav-toggle').css({ opacity: 1 });
}
function findPrevLink(current) {
  let prev = current.prev('li');
  if (!prev.length) {
    prev = current.parents('li').prev('li').find('li:last-child');
  }
  if (prev && prev.length && prev.find('a').attr('href') && prev.find('a').attr('href').indexOf('#') >= 0) {
    prev = findPrevLink(prev);
  }
  return prev;
}
function findNextLink(current) {
  let next = current.next('li');
  if (!next.length) {
    next = current.parents('li').next('li').find('li:first-child');
  }
  if (next && next.length && next.find('a').attr('href') && next.find('a').attr('href').indexOf('#') >= 0) {
    next = findNextLink(next);
  }
  return next;
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
    if (!loc) {
      loc = document.location.href;
      loc = loc.split(document.location.host)[1];
    }

    let $activeListItem;
    $('.docs-nav a').each(function forEach() {
      const link = $(this).attr('href');
      if (loc === link && link !== '#') {
        $activeListItem = $(this).parent('li');
        $(this).addClass('active').parent('li').addClass('active');
      }
    });
    $('.docs-nav-toggle').click(() => {
      $('.docs-nav').toggleClass('docs-nav-visible');
    });

    if ($activeListItem && $activeListItem.length) {
      const $prevListItem = findPrevLink($activeListItem);
      const $nextListItem = findNextLink($activeListItem);

      if ($prevListItem.length || $nextListItem.length) {
        $('.docs-content').append(`
          <div class="docs-page-nav">
            <div class="docs-page-nav-prev">
              ${$prevListItem.length ? `
                <a href="${$prevListItem.find('a').attr('href')}">← ${$prevListItem.text()}</a>
              ` : ''}
            </div>
            <div class="docs-page-nav-next">
              ${$nextListItem.length ? `
                <a href="${$nextListItem.find('a').attr('href')}">${$nextListItem.text()} →</a>
              ` : ''}</div>
          </div>
        `);
      }
    }

    $(window).on('resize scroll', () => {
      handleNavToggleScroll();
    });
    handleNavToggleScroll();
  }
}
