let theme = 'ios';
if (window.location.href.indexOf('theme=md') >= 0) theme = 'md';

let darkMode = false;
if (window.location.href.indexOf('mode=dark') >= 0) darkMode = true;

const themePlugin = {
  params: {
    theme,
    darkMode,
  },
};

// eslint-disable-next-line
Framework7.use(themePlugin);

// eslint-disable-next-line
const app = new Framework7({
  el: '#app',
  componentUrl: './view-page-transitions_f7.html',
});
