<template>
  <f7-page>
    <f7-navbar title="Store" />
    <f7-list v-if="users.length">
      <f7-list-item v-for="user in users" :title="user" />
    </f7-list>
    <f7-block v-else strong>
      <f7-button fill preloader :loading="loading" @click="loadUsers"> Load Users </f7-button>
    </f7-block>
  </f7-page>
</template>
<script>
import { useStore } from 'framework7-vue';
import store from './store';

export default {
  setup() {
    const loading = useStore('loading');
    const users = useStore('users');

    const loadUsers = () => {
      store.dispatch('getUsers');
    };

    return {
      loading,
      users,
      loadUsers,
    };
  },
};
</script>
