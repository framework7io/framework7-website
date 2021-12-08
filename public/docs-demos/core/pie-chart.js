let theme = 'ios';
if (window.location.href.indexOf('theme=md') >= 0) theme = 'md';
if (window.location.href.indexOf('theme=aurora') >= 0) theme = 'aurora';

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
  componentUrl: './pie-chart_f7.html',
});
