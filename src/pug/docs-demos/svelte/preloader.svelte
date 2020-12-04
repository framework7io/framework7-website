<App>
  <View main>
    <Page>
      <Navbar title="Preloader" />

      <Block>
        <p>How about an activity indicator? Framework7 has a nice one. The F7 Preloader is made with SVG and animated with CSS so it can be easily resized.</p>
      </Block>

      <BlockTitle>Default</BlockTitle>
      <Block strong class="row demo-preloaders align-items-stretch text-align-center">
        <Col>
          <Preloader></Preloader>
        </Col>
        <Col style="background: #000">
          <Preloader color="white"></Preloader>
        </Col>
        <Col>
          <Preloader size={42}></Preloader>
        </Col>
        <Col style="background: #000">
          <Preloader size={42} color="white"></Preloader>
        </Col>
      </Block>

      <BlockTitle>Color Preloaders</BlockTitle>
      <Block strong class="row text-align-center">
        <Col>
          <Preloader color="red"></Preloader>
        </Col>
        <Col>
          <Preloader color="green"></Preloader>
        </Col>
        <Col>
          <Preloader color="orange"></Preloader>
        </Col>
        <Col>
          <Preloader color="blue"></Preloader>
        </Col>
      </Block>

      <BlockTitle>Multi-color</BlockTitle>
      <Block strong class="text-align-center">
        <Preloader color="multi"></Preloader>
      </Block>

      <BlockTitle>Preloader Modals</BlockTitle>
      <Block strong>
        <p>With <b>f7.preloader.show()</b> you can show small overlay with preloader indicator.</p>
        <p>
          <Button fill onClick={openIndicator}>Open Small Indicator</Button>
        </p>
        <p>With <b>f7.dialog.preloader()</b> you can show dialog modal with preloader indicator.</p>
        <p>
          <Button fill onClick={openDialog}>Open Dialog Preloader</Button>
        </p>
        <p>With <b>f7.dialog.preloader('My text...')</b> you can show dialog preloader modal with custom title.</p>
        <p>
          <Button fill onClick={openCustomDialog}>Open Dialog Preloader</Button>
        </p>
      </Block>
    </Page>
  </View>
</App>

<style>
  :global(.demo-preloaders .col) {
    line-height: 42px;
  }
</style>

<script>
  import {f7, App, View, Page, Navbar, Block, BlockTitle, Col, Preloader, Button} from 'framework7-svelte';

  function openIndicator() {
    f7.preloader.show();
    setTimeout(() => {
      f7.preloader.hide();
    }, 2000);
  }
  function openDialog() {
    f7.dialog.preloader();
    setTimeout(() => {
      f7.dialog.close();
    }, 2000);
  }
  function openCustomDialog() {
    f7.dialog.preloader('My text...');
    setTimeout(() => {
      f7.dialog.close();
    }, 2000);
  }
</script>
