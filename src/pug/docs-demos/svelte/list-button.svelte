<App>
  <View main>
    <Page>
      <Navbar title="List Button" />
      <List>
        <ListButton title="List Button 1" />
        <ListButton title="List Button 2" />
        <ListButton title="List Button 3" />
      </List>

      <List inset>
        <ListButton title="List Button 1" />
        <ListButton title="List Button 2" />
        <ListButton title="List Button 3" />
      </List>

      <List inset>
        <ListButton title="Red List Button" color="red" />
        <ListButton title="Green List Button" color="green" />
        <ListButton title="Orange List Button" color="orange" />
      </List>
    </Page>
  </View>
</App>

<script>
  import {App, View, Page, Navbar, List, ListButton} from 'framework7-svelte';
</script>
