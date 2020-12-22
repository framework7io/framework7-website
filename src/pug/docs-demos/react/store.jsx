import React from 'react';
import { App, View } from 'framework7-react';
import store from './store';
import StorePage from './store_page.jsx';

export default () => {
  return (
    <App store={store} routes={[{ path: '/', component: StorePage }]}>
      <View main url="/" />
    </App>
  );
};
