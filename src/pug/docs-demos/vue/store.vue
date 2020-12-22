<template>
  <f7-app :store="store" :routes="routes">
    <f7-view main url="/" />
  </f7-app>
</template>
<script>
import store from './store';
import StorePage from './store_page.vue';

export default {
  setup() {
    const routes = [{ path: '/', component: StorePage }];
    return {
      store,
      routes,
    };
  },
};
</script>
