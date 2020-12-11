import Framework7 from 'framework7/lite-bundle';
import Framework7Svelte from 'framework7-svelte';

import App from './F7_SVELTE_DEMO.svelte';

let theme = 'ios';
if (window.location.href.indexOf('theme=md') >= 0) theme = 'md';
if (window.location.href.indexOf('theme=aurora') >= 0) theme = 'aurora';

const themePlugin = {
  params: {
    theme,
  },
};

Framework7.use(themePlugin);
Framework7.use(Framework7Svelte, { theme });

// Init Svelte App
const app = new App({
  target: document.getElementById('app'),
});

export default app;
