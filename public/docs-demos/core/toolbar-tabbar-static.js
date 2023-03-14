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
  componentUrl: './toolbar-tabbar-static_f7.html',
});
