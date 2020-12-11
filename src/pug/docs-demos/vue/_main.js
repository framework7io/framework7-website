import { createApp } from 'vue';
import Framework7 from 'framework7/lite-bundle';
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';

import App from './F7_VUE_DEMO.vue';

let theme = 'ios';
if (window.location.href.indexOf('theme=md') >= 0) theme = 'md';
if (window.location.href.indexOf('theme=aurora') >= 0) theme = 'aurora';

const themePlugin = {
  params: {
    theme,
  },
};

Framework7.use(themePlugin);
Framework7.use(Framework7Vue, { theme });

// Init Vue App
const app = createApp(App);

registerComponents(app);

app.mount('#app');
