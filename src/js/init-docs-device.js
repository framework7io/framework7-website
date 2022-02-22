import $ from 'dom7';

let demoDevicePreviewLink;
function handleDeviceScroll() {
  const st = window.scrollY;
  const firstPreviewPosition = $('[data-device-preview]').eq(0).offset().top + st;
  const device = $('.docs-demo-device:not(.docs-inline-device)');
  device.addClass('visible');
  const deviceStartOffset = device.parent().offset().top + st;
  let devicePosition = deviceStartOffset;
  if (devicePosition < firstPreviewPosition - deviceStartOffset) {
    devicePosition = firstPreviewPosition - deviceStartOffset;
  }
  if (devicePosition + device.outerHeight() > device.parent().outerHeight()) {
    devicePosition = device.parent().outerHeight() - device.outerHeight();
  }
  let stopPosition;
  let stopPositionStopScrollDevice;
  let stopPositionPageNav;
  const stopPositionContent =
    $('.docs-content .with-device').offset().top +
    $('.docs-content .with-device').outerHeight() +
    st -
    deviceStartOffset;
  if ($('.stop-scroll-device').length > 0) {
    stopPositionStopScrollDevice = $('.stop-scroll-device').offset().top + st - deviceStartOffset;
  }
  if ($('.docs-page-nav').length > 0) {
    stopPositionPageNav =
      $('.docs-page-nav').offset().top -
      $('.docs-page-nav')[0].offsetHeight +
      st -
      deviceStartOffset;
  }
  stopPosition = Math.min(
    ...[stopPositionStopScrollDevice, stopPositionPageNav, stopPositionContent].filter(
      (pos) => !!pos,
    ),
  );
  if (stopPosition) {
    stopPosition -= device.outerHeight();
  }
  if (stopPosition && devicePosition >= stopPosition) {
    devicePosition = stopPosition;
  }

  if (st + deviceStartOffset > devicePosition) devicePosition = st - deviceStartOffset;
  if (devicePosition > stopPosition) devicePosition = stopPosition;
  if (devicePosition < firstPreviewPosition - deviceStartOffset) {
    devicePosition = firstPreviewPosition - deviceStartOffset;
  }

  device.transform(`translateY(${devicePosition}px)`);
  let newPreviewLink;
  $('[data-device-preview]').each(function forEach() {
    const link = $(this);
    if (link.offset().top < $(window).height() / 2) {
      newPreviewLink = link.attr('data-device-preview');
    }
  });
  if (!newPreviewLink)
    newPreviewLink = $('[data-device-preview]').eq(0).attr('data-device-preview');
  if (newPreviewLink !== demoDevicePreviewLink) {
    demoDevicePreviewLink = newPreviewLink;
    device.find('.fade-overlay').addClass('visible');
    let onLoadTriggerd;
    const iframeEl = device.find('iframe')[0];
    const theme = device.find('.docs-demo-device-theme-buttons a.active').attr('data-theme');
    const mode = device.find('.docs-demo-device-mode-buttons a.active').attr('data-mode');
    iframeEl.onload = function onload() {
      onLoadTriggerd = true;
      if (mode === 'dark') {
        iframeEl.contentDocument.documentElement.classList.add('dark');
      }
      setTimeout(() => {
        device.find('.fade-overlay').removeClass('visible');
      }, 300);
    };
    setTimeout(() => {
      if (!onLoadTriggerd) {
        device.find('.fade-overlay').removeClass('visible');
      }
    }, 1000);
    device.find('iframe').attr('src', `${newPreviewLink}${theme ? `?theme=${theme}` : ''}`);
  }
}

export default function initDocsDevice() {
  if ($('.docs-content .with-device').length > 0) {
    $(window).on('resize', () => {
      handleDeviceScroll();
    });
    $(window).on('scroll', () => {
      handleDeviceScroll();
    });
    handleDeviceScroll();
  }

  if ($('.docs-demo-device').length > 0) {
    $('.docs-demo-device-theme-buttons a').on('click', function onClick(e) {
      e.preventDefault();
      const a = $(this);
      if (a.hasClass('active')) return;
      a.parent().find('.active').removeClass('active');
      a.addClass('active');
      const device = a.parents('.docs-demo-device');
      const theme = a.attr('data-theme');
      const $iframeEl = device.find('iframe');
      const src = $iframeEl.attr('src');
      const mode = device.find('.docs-demo-device-mode-buttons a.active').attr('data-mode');
      device.find('.fade-overlay').addClass('visible');
      $iframeEl.once('load', () => {
        if (mode === 'dark') {
          $iframeEl[0].contentDocument.documentElement.classList.add('dark');
        }
        setTimeout(() => {
          device.find('.fade-overlay').removeClass('visible');
        }, 300);
      });
      $iframeEl.attr('src', `${src.split('?')[0]}?theme=${theme}`);
    });
    $('.docs-demo-device-mode-buttons a').on('click', function onClick(e) {
      e.preventDefault();
      const a = $(this);
      if (a.hasClass('active')) return;
      a.parent().find('.active').removeClass('active');
      a.addClass('active');
      const device = a.parents('.docs-demo-device');
      const mode = a.attr('data-mode');
      const iframeEl = device.find('iframe')[0];
      if (mode === 'dark') {
        iframeEl.contentDocument.documentElement.classList.add('dark');
      } else {
        iframeEl.contentDocument.documentElement.classList.remove('dark');
      }
    });
  }
}
