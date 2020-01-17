
<App>
  <Appbar>
    <div class="left">
      <Button small panelToggle="left" class="display-flex" iconF7="bars" />
      <Button small class="display-flex margin-left-half" iconF7="reply_fill" />
      <Button small class="display-flex margin-left-half" iconF7="forward_fill" />
    </div>
    <div class="right">
      <Searchbar
        inline
        customSearch
        disableButton={false}
      />
    </div>
  </Appbar>
  <View main>
    <Page>
      <Navbar title="Appbar" />
      <Block strong>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed sagittis dui. Fusce nulla massa, scelerisque vitae auctor in, luctus in ipsum. Sed eu lectus vel magna malesuada lacinia. Ut at vestibulum sem. In semper, arcu pulvinar volutpat fermentum, felis magna fringilla felis, nec volutpat nisi nunc quis ante. Fusce elementum egestas tortor ut porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis id commodo elit. Sed massa dui, laoreet a orci sed, egestas vehicula tellus. Nulla pulvinar ornare justo sed finibus. Aliquam hendrerit dui at nulla eleifend, quis feugiat enim aliquam. Nulla facilisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      </Block>
    </Page>
  </View>
</App>

<script>
  import {App, Appbar, Button, Searchbar, View, Page, Navbar, Block} from 'framework7-svelte';
</script>
