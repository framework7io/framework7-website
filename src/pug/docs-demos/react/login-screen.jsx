import React from 'react';
import { App, View } from 'framework7-react';

import LoginScreenPage from './login-screen_page.jsx';
import LoginScreenMain from './login-screen_main.jsx';

export default () => (
  <App
    routes={[
      {
        path: '/',
        component: LoginScreenMain,
      },
      {
        path: '/login-screen-page/',
        component: LoginScreenPage,
      },
    ]}
  >
    <View main url="/" />
  </App>
);
