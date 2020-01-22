<App routes={routes}>
  <View main url="/" />
</App>

<script>
  import {f7, App, View} from 'framework7-svelte';

  import LoginScreenMain from './login-screen_main.svelte';
  import LoginScreenPage from './login-screen_page.svelte';

  const routes = [
    {
      path: '/',
      component: LoginScreenMain,
    },
    {
      path: '/login-screen-page/',
      component: LoginScreenPage,
    },
  ];
</script>
