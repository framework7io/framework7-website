<App>
  <View main>
    <Page pageContent={false}>
      <Navbar title="Subnavbar">
        <Subnavbar>
          <Segmented raised>
            <Button tabLink="#tab1" tabLinkActive>Tab 1</Button>
            <Button tabLink="#tab2">Tab 2</Button>
          </Segmented>
        </Subnavbar>
      </Navbar>
      <Tabs>
        <Tab id="tab1" tabActive class="page-content">
          <Block>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nisi nisi, tincidunt ut eleifend non, sagittis a elit. Sed consequat odio at leo varius viverra. Proin et purus eu justo lacinia efficitur in sed orci. Morbi dignissim accumsan felis, at malesuada lorem aliquet finibus. Duis vitae enim a mauris luctus lobortis ac vel dolor. Aenean id pretium quam. Duis sed sem ullamcorper erat venenatis feugiat sed pretium magna. Suspendisse massa lectus, dictum congue arcu quis, auctor vulputate lectus. Duis vitae finibus purus, nec condimentum dui. Sed ultricies mauris vitae libero mollis lobortis. Duis ut tortor scelerisque, volutpat metus eget, rutrum est. Integer diam ex, condimentum vel orci a, lobortis bibendum urna. Aenean porttitor, eros sit amet ultrices efficitur, libero odio rhoncus justo, quis volutpat lorem arcu eu eros. Mauris gravida euismod diam, eget finibus quam ornare non. Nam metus massa, porttitor id tempor et, pharetra id felis.</p>

            <p>In sed augue non metus volutpat ultricies in quis nisi. Donec sed placerat risus. Donec nec est turpis. Ut egestas ipsum eget lectus imperdiet dictum. Praesent congue dui nec turpis semper, pellentesque ullamcorper enim sodales. Quisque porttitor porta nibh, sit amet lacinia dui imperdiet et. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras a enim eget elit cursus ullamcorper fringilla eu mi. Integer commodo est elit, eu mattis quam ultrices non. Fusce in sagittis elit. Curabitur in consequat est. Nulla mi lorem, tincidunt eget dapibus id, ultrices vel sem. Etiam fringilla cursus odio, nec cursus nisi commodo quis. Nullam nec neque vel turpis eleifend condimentum sed quis felis. Integer ut diam nibh.</p>
          </Block>
        </Tab>
        <Tab id="tab2" class="page-content">
          <Block>
            <p>Donec iaculis posuere massa sed dignissim. Praesent id nibh nec massa mollis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis elementum arcu nec condimentum eleifend. Aenean eget sapien ut diam egestas porttitor. Praesent quis diam fermentum, laoreet est consectetur, posuere enim. Morbi neque leo, vehicula at sapien ut, fringilla mollis enim. Cras sed libero mi. Etiam at vestibulum urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In pharetra ut risus eu vehicula. Vestibulum interdum libero vestibulum nunc tempus vulputate. Etiam dolor lacus, porttitor pulvinar magna id, dictum hendrerit tortor.</p>
            <p>Curabitur egestas, mi id mattis aliquam, lectus neque facilisis sem, in fringilla leo ante in nibh. Proin porta tincidunt dolor, vel fringilla lorem cursus ac. Suspendisse feugiat congue metus, sed mattis magna imperdiet sed. Donec a nunc quis urna bibendum feugiat. Nulla rhoncus lorem et orci condimentum molestie. Fusce fringilla arcu nec purus posuere malesuada. Praesent nec ipsum ex. Praesent sed diam non nisl imperdiet molestie.</p>
          </Block>
        </Tab>
      </Tabs>
    </Page>
  </View>
</App>
<script>
  import {App, View, Page, Navbar, Subnavbar, Segmented, Button, Tabs, Tab, Block} from 'framework7-svelte';
</script>
