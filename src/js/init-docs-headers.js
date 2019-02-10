import $ from 'dom7';

function handleDocsHeaderScroll() {
  $('.docs-content').find('h1, h2, h3, h4').each((index, el) => {
    const elOffset = $(el).offset().top;
    if (elOffset <= 0) $(el).addClass('docs-header-stuck');
    else $(el).removeClass('docs-header-stuck');
  });
}
export default function initDocsNav() {
  // if ($('.docs-content').length > 0) {
  //   $(window).on('resize scroll', () => {
  //     handleDocsHeaderScroll();
  //   });
  //   handleDocsHeaderScroll();
  // }
}
