<App store={store} routes={[{ path: '/', component: StorePage }]}>
  <View main url="/" />
</App>

<script>
  import { App, View } from 'framework7-svelte';
  import store from './store';
  import StorePage from './store_page.svelte';
</script>
