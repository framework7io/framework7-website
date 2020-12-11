<template>
  <f7-app :routes="routes">
    <f7-view main url="/" />
  </f7-app>
</template>
<script>
  import LoginScreenMain from './login-screen_main.vue';
  import LoginScreenPage from './login-screen_page.vue';

  export default {
    data() {
      return {
        routes: [
          {
            path: '/',
            component: LoginScreenMain,
          },
          {
            path: '/login-screen-page/',
            component: LoginScreenPage,
          },
        ],
      };
    },
  }
</script>
