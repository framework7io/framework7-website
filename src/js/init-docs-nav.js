import $ from 'dom7';

function findPrevLink(current) {
  let prev = current.prev('li');
  if (!prev.length) {
    prev = current.parents('li').prev('li').find('li:last-child');
  }
  if (
    prev &&
    prev.length &&
    prev.find('a').attr('href') &&
    prev.find('a').attr('href').indexOf('#') >= 0
  ) {
    prev = findPrevLink(prev);
  }
  return prev;
}
function findNextLink(current) {
  let next = current.next('li');
  if (!next.length) {
    next = current.parents('li').next('li').find('li:first-child');
  }
  if (
    next &&
    next.length &&
    next.find('a').attr('href') &&
    next.find('a').attr('href').indexOf('#') >= 0
  ) {
    next = findNextLink(next);
  }
  return next;
}
export default function initDocsNav() {
  if ($('.docs-nav').length > 0) {
    let loc = document.location.href;
    const originalLoc = loc;
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
    if ($('.docs-nav-frameworks').length > 0) {
      if (originalLoc.includes('/docs/')) {
        $('.docs-nav-frameworks a[href="/docs/"]').addClass('active');
      } else if (originalLoc.includes('/react/')) {
        $('.docs-nav-frameworks a[href="/react/"]').addClass('active');
      } else if (originalLoc.includes('/vue/')) {
        $('.docs-nav-frameworks a[href="/vue/"]').addClass('active');
      } else if (originalLoc.includes('/svelte/')) {
        $('.docs-nav-frameworks a[href="/svelte/"]').addClass('active');
      }
    }

    let $activeListItem;
    $('.docs-nav a').each(function forEach() {
      const link = $(this).attr('href');
      if ((loc === link || loc === link.replace('.html', '')) && link !== '#') {
        $activeListItem = $(this).parent('li');
        $(this).addClass('active').parent('li').addClass('active');
      }
    });
    $('.docs-nav-toggle, .docs-nav-backdrop').click(() => {
      $('.docs-nav').toggleClass('docs-nav-visible');
      if ($('.docs-nav').hasClass('docs-nav-visible')) {
        $('nav').css('z-index', 10);
      } else {
        $('nav').css('z-index', '');
      }
    });

    if ($activeListItem && $activeListItem.length) {
      const $prevListItem = findPrevLink($activeListItem);
      const $nextListItem = findNextLink($activeListItem);

      if ($prevListItem.length || $nextListItem.length) {
        $('.docs-content').append(`
          <div class="docs-page-nav">
            <div class="docs-page-nav-prev">
              ${
                $prevListItem.length
                  ? `
                <a href="${$prevListItem.find('a').attr('href')}">← ${$prevListItem.text()}</a>
              `
                  : ''
              }
            </div>
            <div class="docs-page-nav-next">
              ${
                $nextListItem.length
                  ? `
                <a href="${$nextListItem.find('a').attr('href')}">${$nextListItem.text()} →</a>
              `
                  : ''
              }</div>
          </div>
        `);
      }
    }
  }
  if ($('.docs-index-title').length > 0) {
    $('.docs-index-title').on('click', () => {
      $('.docs-right-block-index').toggleClass('docs-index-visible');
    });
    $('.docs-index a').on('click', () => {
      $('.docs-right-block-index').removeClass('docs-index-visible');
    });
    $(document).on('click', (e) => {
      if (!e.target.closest('.docs-right-block-index')) {
        $('.docs-right-block-index').removeClass('docs-index-visible');
      }
    });
  }
}
