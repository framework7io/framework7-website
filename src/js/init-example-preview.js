import $ from 'dom7';

export default function initExamplePreview() {
  if ($('.example-preview').length > 0) {
    $('.example-preview-buttons button').on('click', function onClick(e) {
      e.preventDefault();
      const a = $(this);
      if (a.hasClass('example-preview-button-active')) return;
      a.parent()
        .find('.example-preview-button-active')
        .removeClass('example-preview-button-active');
      a.addClass('example-preview-button-active');
      const example = a.parents('.example-preview');
      const iframe = example.find('iframe');
      let url = iframe.attr('src');
      const theme = a.attr('data-theme');
      const mode = a.attr('data-mode');
      if (theme) {
        url = url.replace(/ios|md/, theme);
      }
      if (mode) {
        url = url.replace(/light|dark/, mode);
      }
      example.find('.example-preview-buttons-group a').attr('href', url);
      iframe.attr('src', url);
    });
  }
}
