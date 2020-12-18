<template>
  <f7-app :routes="routes">
    <f7-view main>
      <f7-page>
        <f7-navbar title="Tabs"></f7-navbar>
        <f7-list>
          <f7-list-item link="/tabs-static/" title="Static Tabs"></f7-list-item>
          <f7-list-item link="/tabs-animated/" title="Animated Tabs"></f7-list-item>
          <f7-list-item link="/tabs-swipeable/" title="Swipeable Tabs"></f7-list-item>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-app>
</template>
<script>
import TabsStatic from './tabs_static.vue';
import TabsAnimated from './tabs_animated.vue';
import TabsSwipeable from './tabs_swipeable.vue';

export default {
  data() {
    return {
      routes: [
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
      ],
    };
  },
};
</script>
