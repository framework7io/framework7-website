let theme = 'ios';
if (window.location.href.indexOf('theme=md') >= 0) theme = 'md';

const themePlugin = {
  params: {
    theme,
  },
};

// eslint-disable-next-line
Framework7.use(themePlugin);

// eslint-disable-next-line
const app = new Framework7({
  el: '#app',
  componentUrl: './F7_CORE_DEMO.f7.html',
});
