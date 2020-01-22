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
<script>
  import {Page, Navbar, Toolbar, Link, Tabs, Tab, Block, App, View, List, ListItem} from 'framework7-svelte';
  import TabsStatic from './tabs_static.svelte';
  import TabsAnimated from './tabs_animated.svelte';
  import TabsSwipeable from './tabs_swipeable.svelte';

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
</script>
