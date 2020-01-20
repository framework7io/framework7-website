<App>
  <View main>
    <Page>
      <Navbar title="Photo Browser" />
      <Block strong>
        <p>Photo Browser is a standalone and highly configurable component that allows to open window with photo viewer and navigation elements with the following features:</p>
        <ul>
          <li>Swiper between photos</li>
          <li>Multi-gestures support for zooming</li>
          <li>Toggle zoom by double tap on photo</li>
          <li>Single click on photo to toggle Exposition mode</li>
        </ul>
      </Block>
      {#if mounted}
      <Block strong>
        <p>Photo Browser could be opened in a three ways - as a Standalone component (Popup modification), in Popup, and as separate Page:</p>
        <Row>
          <Col>
            <PhotoBrowser photos={photos} bind:this={standalone} />
            <Button fill raised onClick={() => standalone.open()}>Standalone</Button>
          </Col>
          <Col>
            <PhotoBrowser photos={photos} type="popup" bind:this={popup} />
            <Button fill raised onClick={() => popup.open()}>Popup</Button>
          </Col>
          <Col>
            <PhotoBrowser photos={photos} type="page" pageBackLinkText="Back" bind:this={page} />
            <Button fill raised onClick={() => page.open()}>Page</Button>
          </Col>
        </Row>
      </Block>
      <Block strong>
        <p>Photo Browser suppots 2 default themes - default Light (like in previous examples) and Dark theme. Here is a Dark theme examples:</p>
        <Row>
          <Col>
            <PhotoBrowser photos={photos} theme="dark" bind:this={standaloneDark} />
            <Button fill raised onClick={() => standaloneDark.open()}>Standalone</Button>
          </Col>
          <Col>
            <PhotoBrowser photos={photos} theme="dark" type="popup" bind:this={popupDark} />
            <Button fill raised onClick={() => popupDark.open()}>Popup</Button>
          </Col>
          <Col>
            <PhotoBrowser photos={photos} theme="dark" type="page" pageBackLinkText="Back" bind:this={pageDark} />
            <Button fill raised onClick={() => pageDark.open()}>Page</Button>
          </Col>
        </Row>
      </Block>
      {/if}
    </Page>
  </View>
</App>

<script>
  import {f7ready, App, View, Page, Navbar, Block, Row, Col, PhotoBrowser, Button} from 'framework7-svelte';

  let mounted;

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

  f7ready(() => {
    setTimeout(() => {
      mounted = true;
    }, 100);
  });

</script>
