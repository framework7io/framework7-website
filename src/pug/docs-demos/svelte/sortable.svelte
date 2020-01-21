
<App>
  <View main>
    <Page>
      <Navbar title="Sortable List">
        <NavRight>
          <Link sortableToggle=".sortable">Toggle</Link>
        </NavRight>
      </Navbar>

      <Block>
        <p>Just click "Toggle" button on navigation bar to enable/disable sorting</p>
      </Block>
      <List sortable>
        <ListItem
          title="1 Jenna Smith"
          after="CEO"
        >
          <i class="icon demo-list-icon" slot="media" />
        </ListItem>
        <ListItem
          title="2 John Doe"
          after="Director"
        >
          <i class="icon demo-list-icon" slot="media" />
        </ListItem>
        <ListItem
          title="3 John Doe"
          after="Developer"
        >
          <i class="icon demo-list-icon" slot="media" />
        </ListItem>
        <ListItem
          title="4 Aaron Darling"
          after="Manager"
        >
          <i class="icon demo-list-icon" slot="media" />
        </ListItem>
        <ListItem
          title="5 Calvin Johnson"
          after="Accounter"
        >
          <i class="icon demo-list-icon" slot="media" />
        </ListItem>
        <ListItem
          title="6 John Smith"
          after="SEO"
        >
          <i class="icon demo-list-icon" slot="media" />
        </ListItem>
        <ListItem
          title="7 Chloe"
          after="Manager"
        >
          <i class="icon demo-list-icon" slot="media" />
        </ListItem>
      </List>
      <List mediaList sortable>
        <ListItem
          title="Yellow Submarine"
          after="$15"
          subtitle="Beatles"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        >
          <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-1.jpg" width="80" />
        </ListItem>
        <ListItem
          title="Don't Stop Me Now"
          after="$22"
          subtitle="Queen"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        >
          <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-2.jpg" width="80" />
        </ListItem>
        <ListItem
          title="Billie Jean"
          after="$16"
          subtitle="Michael Jackson"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
        >
          <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-3.jpg" width="80" />
        </ListItem>
      </List>

      <BlockTitle>Opposite Side</BlockTitle>
      <List sortable sortableOpposite>
        <ListItem
          title="1 Jenna Smith"
          after="CEO"
        >
          <i class="icon demo-list-icon" slot="media" />
        </ListItem>
        <ListItem
          title="2 John Doe"
          after="Director"
        >
          <i class="icon demo-list-icon" slot="media" />
        </ListItem>
        <ListItem
          title="3 John Doe"
          after="Developer"
        >
          <i class="icon demo-list-icon" slot="media" />
        </ListItem>
        <ListItem
          title="4 Aaron Darling"
          after="Manager"
        >
          <i class="icon demo-list-icon" slot="media" />
        </ListItem>
        <ListItem
          title="5 Calvin Johnson"
          after="Accounter"
        >
          <i class="icon demo-list-icon" slot="media" />
        </ListItem>
        <ListItem
          title="6 John Smith"
          after="SEO"
        >
          <i class="icon demo-list-icon" slot="media" />
        </ListItem>
        <ListItem
          title="7 Chloe"
          after="Manager"
        >
          <i class="icon demo-list-icon" slot="media" />
        </ListItem>
      </List>
    </Page>
  </View>
</App>
<style>
  :global(.demo-list-icon, .icon-f7) {
    background: #ccc;
    display: block;
    position: relative;
  }
  :global(.ios .demo-list-icon, .ios .icon-f7, .ios .icon-vi) {
    width: 29px;
    height: 29px;
    border-radius: 6px;
    box-sizing: border-box;
  }
  :global(.md .demo-list-icon, .md .icon-f7, .md .icon-vi) {
    width: 24px;
    height: 24px;
    border-radius: 4px;
  }
  :global(.aurora .demo-list-icon, .aurora .icon-f7, .aurora .icon-vi) {
    width: 18px;
    height: 18px;
    border-radius: 4px;
  }
</style>
<script>
  import {App, View, Page, Navbar, NavRight, Link, Block, List, ListItem, Icon, BlockTitle} from 'framework7-svelte';
</script>
