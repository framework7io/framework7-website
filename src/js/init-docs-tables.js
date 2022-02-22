import $ from 'dom7';

export default function initDocsTables() {
  $(
    '.params-table tbody tr:not(.subparam-open-row):not(.subparam-close-row) > td:first-child',
  ).each((el) => {
    const textContent = el.textContent;
    if (!textContent || $(el).find('a').length > 0) return;
    const linkEl = document.createElement('a');
    linkEl.id = `param-${textContent}`;
    linkEl.href = `#param-${textContent}`;
    for (let i = el.childNodes.length - 1; i >= 0; i -= 1) {
      linkEl.prepend(el.childNodes[i]);
    }
    el.appendChild(linkEl);
  });
  $('.methods-table tbody tr > td:first-child').each((el) => {
    const textContent = el.textContent;
    if (!textContent || $(el).find('a').length > 0) return;
    const linkEl = document.createElement('a');
    linkEl.id = `method-${textContent}`;
    linkEl.href = `#method-${textContent}`;
    for (let i = el.childNodes.length - 1; i >= 0; i -= 1) {
      linkEl.prepend(el.childNodes[i]);
    }
    el.appendChild(linkEl);
  });
  $('.events-table tbody tr > td:first-child').each((el) => {
    const textContent = el.textContent;
    if (!textContent || $(el).find('a').length > 0) return;
    const linkEl = document.createElement('a');
    linkEl.id = `event-${textContent}`;
    linkEl.href = `#event-${textContent}`;
    for (let i = el.childNodes.length - 1; i >= 0; i -= 1) {
      linkEl.prepend(el.childNodes[i]);
    }
    el.appendChild(linkEl);
  });
}
