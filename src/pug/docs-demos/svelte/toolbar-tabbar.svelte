<App routes={routes}>
  <View main>
    <Page>
      <Navbar title="Toolbar & Tabbar" />
      <List>
        <ListItem link="/toolbar/" title="Toolbar" />
        <ListItem link="/tabbar/" title="Tabbar" />
        <ListItem link="/tabbar-labels/" title="Tabbar With Labels" />
        <ListItem link="/tabbar-scrollable/" title="Tabbar Scrollable" />
        <ListItem link="/toolbar-hide-scroll/" title="Hide Toolbar On Scroll" />
      </List>
    </Page>
  </View>
</App>
<script>
  import { Page, Navbar, Toolbar, Link, BlockTitle, Block, Button, NavRight, Tabs, Tab, App, View, List, ListItem } from 'framework7-svelte';

  import ToolbarPage from './toolbar-tabbar_toolbar.svelte';
  import TabbarPage from './toolbar-tabbar_tabbar.svelte';
  import TabbarLabelsPage from './toolbar-tabbar_tabbar-labels.svelte';
  import TabbarScrollablePage from './toolbar-tabbar_tabbar-scrollable.svelte';
  import ToolbarHidePage from './toolbar-tabbar_toolbar-hide-scroll.svelte';

  const routes = [
    {
      path: '/toolbar/',
      component: ToolbarPage,
    },
    {
      path: '/tabbar/',
      component: TabbarPage,
    },
    {
      path: '/tabbar-labels/',
      component: TabbarLabelsPage,
    },
    {
      path: '/tabbar-scrollable/',
      component: TabbarScrollablePage,
    },
    {
      path: '/toolbar-hide-scroll/',
      component: ToolbarHidePage,
    },
  ];
</script>
