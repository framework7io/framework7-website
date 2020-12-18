import React from 'react';
import { Page, Navbar, App, View, List, ListItem } from 'framework7-react';

import TabsStatic from './tabs_static.jsx';
import TabsAnimated from './tabs_animated.jsx';
import TabsSwipeable from './tabs_swipeable.jsx';

const routes = [
  {
    path: '/tabs-static/',
    component: TabsStatic,
  },
  {
    path: '/tabs-animated/',
    component: TabsAnimated,
  },
  {
    path: '/tabs-swipeable/',
    component: TabsSwipeable,
  },
];

export default () => (
  <App routes={routes}>
    <View main>
      <Page>
        <Navbar title="Tabs" />
        <List>
          <ListItem link="/tabs-static/" title="Static Tabs" />
          <ListItem link="/tabs-animated/" title="Animated Tabs" />
          <ListItem link="/tabs-swipeable/" title="Swipeable Tabs" />
        </List>
      </Page>
    </View>
  </App>
);
