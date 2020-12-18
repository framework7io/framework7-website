import React from 'react';
import ReactDOM from 'react-dom';
import Framework7 from 'framework7/lite-bundle';
import Framework7React from 'framework7-react';

import App from './F7_REACT_DEMO.jsx';

let theme = 'ios';
if (window.location.href.indexOf('theme=md') >= 0) theme = 'md';
if (window.location.href.indexOf('theme=aurora') >= 0) theme = 'aurora';

const themePlugin = {
  params: {
    theme,
  },
};

Framework7.use(themePlugin);
Framework7.use(Framework7React, { theme });

ReactDOM.render(React.createElement(App), document.getElementById('app'));
