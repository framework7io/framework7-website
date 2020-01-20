<App>
  <Panel resizable left reveal>
    <View>
      <Page>
        <Block>Left panel content</Block>
      </Page>
    </View>
  </Panel>
  <Panel resizable right themeDark>
    <View>
      <Page>
        <Block>Right panel content</Block>
      </Page>
    </View>
  </Panel>
  <View main>
    <Page>
      <Navbar title="Panel"></Navbar>

      <Block class="row">
        <Col>
          <Button raised fill panelOpen="left">Open left panel</Button>
        </Col>
        <Col>
          <Button raised fill panelOpen="right">Open right panel</Button>
        </Col>
      </Block>
    </Page>
  </View>
</App>
<style>
  /* Limit resizable panel width */
  :global(.panel) {
    min-width: 100px;
    max-width: 90vw;
  }
</style>
<script>
  import {App, Panel, View, Page, Block, Navbar, Col, Button} from 'framework7-svelte';
</script>
