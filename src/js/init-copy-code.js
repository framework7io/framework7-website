import $ from 'dom7';
import copyToClipboard from './copy-to-clipboard';

export default function initCopyCode() {
  $('pre').each((preElement) => {
    const $button = $(
      `<button class="f7-copy-btn">
        <i class="f7-icons f7-copy-icon">square_on_square</i>
        <i class="f7-icons f7-check-icon hidden">checkmark_alt</i>
      </button>`,
    );
    $(preElement).append($button);
    $button.on('click', function onClick() {
      const el = this;
      const text = $(el).prev().text();
      console.log(text);
      copyToClipboard(text);
      $button.find('.f7-copy-icon, .f7-check-icon').toggleClass('hidden');
      setTimeout(() => {
        $button.find('.f7-copy-icon, .f7-check-icon').toggleClass('hidden');
      }, 2000);
    });
  });
}
