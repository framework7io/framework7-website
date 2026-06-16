// User Experienced (UXD) newsletter — auto popover + nav-triggered modal

const STORAGE_KEY = 'uxd_popover_dismissed';
const SHOW_DELAY_MS = 4000;
const MIN_WIDTH = 1024;

function track(event, label) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, {
      event_category: 'newsletter',
      event_label: label,
    });
  }
}

// Defer loading the Substack embed until the popover/modal is first shown
function loadIframe(container) {
  if (!container) return;
  const iframe = container.querySelector('iframe[data-src]');
  if (iframe && !iframe.getAttribute('src')) {
    iframe.setAttribute('src', iframe.getAttribute('data-src'));
  }
}

export default function initUxd() {
  const popover = document.querySelector('.uxd-popover');
  const modal = document.querySelector('.uxd-modal');

  // Auto popover (wide screens only)
  if (popover) {
    const showPopover = () => {
      if (window.innerWidth < MIN_WIDTH) return;
      if (modal && modal.classList.contains('uxd-modal-visible')) return;
      loadIframe(popover);
      popover.classList.add('uxd-popover-visible');
      track('uxd_popover_show', 'auto_popover');
    };
    const dismissPopover = () => {
      popover.classList.remove('uxd-popover-visible');
      try {
        localStorage.setItem(STORAGE_KEY, '1');
      } catch (e) {
        // ignore storage errors
      }
      track('uxd_popover_dismiss', 'auto_popover');
    };

    const closeBtn = popover.querySelector('.uxd-popover-close');
    if (closeBtn) closeBtn.addEventListener('click', dismissPopover);

    let dismissed = false;
    try {
      dismissed = localStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {
      // ignore storage errors
    }
    if (!dismissed && window.innerWidth >= MIN_WIDTH) {
      setTimeout(showPopover, SHOW_DELAY_MS);
    }
  }

  // Modal (opened from the nav logo button)
  if (modal) {
    const openModal = () => {
      loadIframe(modal);
      modal.classList.add('uxd-modal-visible');
      document.body.style.overflow = 'hidden';
      if (popover) popover.classList.remove('uxd-popover-visible');
      track('uxd_modal_open', 'nav_button');
    };
    const closeModal = () => {
      modal.classList.remove('uxd-modal-visible');
      document.body.style.overflow = '';
    };

    const navBtn = document.querySelector('.nav-uxd');
    if (navBtn) navBtn.addEventListener('click', openModal);

    const closeBtn = modal.querySelector('.uxd-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    const backdrop = modal.querySelector('.uxd-modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeModal);

    const container = modal.querySelector('.uxd-modal-container');
    if (container) {
      container.addEventListener('click', (e) => {
        if (e.target === container) closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('uxd-modal-visible')) {
        closeModal();
      }
    });
  }
}
