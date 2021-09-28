import $ from 'dom7';

export default function initUiInitiativePlugins() {
  const $container = $('.uiinitiative-plugins');
  if ($container.length === 0) return;
  fetch('https://uiinitiative.com/api/list?type=plugin&tech=Framework7')
    .then((res) => res.json())
    .then((items) => {
      let content = '';
      items.forEach((item) => {
        content += `
        <div class="app">
          <a class="app-cover" href="${item.url}" target="_blank" data-hover-text="Get">
            <img src="${item.cover}"">
          </a>
          <div class="app-info">
            <div class="app-title">${item.title}</div>
            <div class="app-subtitle">${item.subtitle}</div>
          </div>
        </div>
        `;
      });
      $container.append(content);
    });
}
