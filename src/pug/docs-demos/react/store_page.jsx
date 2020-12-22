import React from 'react';
import { useStore, Page, Navbar, Block, List, ListItem, Button } from 'framework7-react';
import store from './store';

export default () => {
  const loading = useStore('loading');
  const users = useStore('users');

  const loadUsers = () => {
    store.dispatch('getUsers');
  };

  return (
    <Page>
      <Navbar title="Store" />
      {users.length && (
        <List>
          {users.map((user) => (
            <ListItem title={user} key={user} />
          ))}
        </List>
      )}
      {!users.length && (
        <Block strong>
          <Button fill preloader loading={loading} onClick={loadUsers}>
            Load Users
          </Button>
        </Block>
      )}
    </Page>
  );
};
