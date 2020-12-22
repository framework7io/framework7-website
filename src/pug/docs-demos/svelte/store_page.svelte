<Page>
  <Navbar title="Store" />
  {#if users.length}
    <List>
      {#each users as user}
        <ListItem title={user} />
      {/each}
    </List>
  {:else}
    <Block strong>
      <Button fill preloader loading={loading} onClick={loadUsers}>
        Load Users
      </Button>
    </Block>
  {/if}
</Page>
<script>
import { useStore, Page, Navbar, Block, List, ListItem, Button } from 'framework7-svelte';
import store from './store';

let loading = useStore('loading', (value) => loading = value);
let users = useStore('users', (value) => users = value);

const loadUsers = () => {
  store.dispatch('getUsers');
};
</script>
