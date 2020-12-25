<App>
  <View main>
    <Page>
      <Navbar title="Photo Browser" />

      <Block strong>
        <p>Photo Browser could be opened in a three ways - as a Standalone component (Popup modification), in Popup, and as separate Page:</p>

        <p>
          <PhotoBrowser photos={photos} bind:this={standalone} />
          <Button fill raised onClick={() => standalone.open()}>Standalone</Button>
        </p>
        <p>
          <PhotoBrowser photos={photos} type="popup" bind:this={popup} />
          <Button fill raised onClick={() => popup.open()}>Popup</Button>
        </p>
        <p>
          <PhotoBrowser photos={photos} type="page" pageBackLinkText="Back" bind:this={page} />
          <Button fill raised onClick={() => page.open()}>Page</Button>
        </p>

      </Block>
      <Block strong>
        <p>Photo Browser supports 2 default themes - default Light (like in previous examples) and Dark theme. Here is a Dark theme examples:</p>

        <p>
          <PhotoBrowser photos={photos} theme="dark" bind:this={standaloneDark} />
          <Button fill raised onClick={() => standaloneDark.open()}>Standalone</Button>
        </p>
        <p>
          <PhotoBrowser photos={photos} theme="dark" type="popup" bind:this={popupDark} />
          <Button fill raised onClick={() => popupDark.open()}>Popup</Button>
        </p>
        <p>
          <PhotoBrowser photos={photos} theme="dark" type="page" pageBackLinkText="Back" bind:this={pageDark} />
          <Button fill raised onClick={() => pageDark.open()}>Page</Button>
        </p>

      </Block>
    </Page>
  </View>
</App>

<script>
  import {App, View, Page, Navbar, Block, Row, Col, PhotoBrowser, Button} from 'framework7-svelte';

  let standalone;
  let popup;
  let page;

  let standaloneDark;
  let popupDark;
  let pageDark;

  let photos = [
    'https://placekitten.com/800/800',
    'https://placekitten.com/1024/1024',
  ];

</script>
