<template>
  <f7-app :routes="routes">
    <f7-view main>
      <f7-page>
        <f7-navbar title="Toolbar & Tabbar"></f7-navbar>
        <f7-list>
          <f7-list-item link="/toolbar/" title="Toolbar"></f7-list-item>
          <f7-list-item link="/tabbar/" title="Tabbar"></f7-list-item>
          <f7-list-item link="/tabbar-labels/" title="Tabbar With Labels"></f7-list-item>
          <f7-list-item link="/tabbar-scrollable/" title="Tabbar Scrollable"></f7-list-item>
          <f7-list-item link="/toolbar-hide-scroll/" title="Hide Toolbar On Scroll"></f7-list-item>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-app>
</template>
<script>
import ToolbarPage from './toolbar-tabbar_toolbar.vue';
import TabbarPage from './toolbar-tabbar_tabbar.vue';
import TabbarLabelsPage from './toolbar-tabbar_tabbar-labels.vue';
import TabbarScrollablePage from './toolbar-tabbar_tabbar-scrollable.vue';
import ToolbarHidePage from './toolbar-tabbar_toolbar-hide-scroll.vue';

export default {
  data() {
    return {
      routes: [
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
      ],
    };
  },
};
</script>
