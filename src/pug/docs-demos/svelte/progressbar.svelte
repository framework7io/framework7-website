<App>
  <View main>
    <Page>
      <Navbar title="Progress Bar"></Navbar>
      <Block>
        <p>In addition to <a href="/preloader/">Preloader</a>, Framework7 also comes with fancy animated determinate and infinite/indeterminate progress bars to indicate some activity.</p>
      </Block>
      <BlockTitle>Determinate Progress Bar</BlockTitle>
      <Block strong>
        <p>When progress bar is determinate it indicates how long an operation will take when the percentage complete is detectable.</p>
        <p>Inline determinate progress bar:</p>
        <div>
          <p><Progressbar progress={10} id="demo-inline-progressbar"></Progressbar></p>
          <Segmented raised>
            <Button onClick={()=>{setInlineProgress(10)}}>10%</Button>
            <Button onClick={()=>{setInlineProgress(30)}}>30%</Button>
            <Button onClick={()=>{setInlineProgress(50)}}>50%</Button>
            <Button onClick={()=>{setInlineProgress(100)}}>100%</Button>
          </Segmented>
        </div>
        <div>
          <p>Inline determinate load & hide:</p>
          <p id="demo-determinate-container"></p>
          <p>
            <Button raised onClick={()=>{showDeterminate(true)}}>Start Loading</Button>
          </p>
        </div>
        <div>
          <p>Overlay with determinate progress bar on top of the app:</p>
          <p>
            <Button raised onClick={()=>{showDeterminate(false)}}>Start Loading</Button>
          </p>
        </div>
      </Block>
      <BlockTitle>Infinite Progress Bar</BlockTitle>
      <Block strong>
        <p>When progress bar is infinite/indeterminate it requests that the user wait while something finishes when it’s not necessary to indicate how long it will take.</p>
        <p>Inline infinite progress bar</p>
        <p>
          <Progressbar infinite></Progressbar>
        </p>
        <p>Multi-color infinite progress bar</p>
        <p>
          <Progressbar infinite color="multi"></Progressbar>
        </p>
        <div>
          <p>Overlay with infinite progress bar on top of the app</p>
          <p id="demo-infinite-container"></p>
          <p>
            <Button raised onClick={()=>{showInfinite(false)}}>Start Loading</Button>
          </p>
        </div>
        <div>
          <p>Overlay with infinite multi-color progress bar on top of the app</p>
          <p>
            <Button raised onClick={()=>{showInfinite(true)}}>Start Loading</Button>
          </p>
        </div>
      </Block>
      <BlockTitle>Colors</BlockTitle>
      <List simpleList>
        <ListItem>
          <Progressbar color="blue" progress={10}></Progressbar>
        </ListItem>
        <ListItem>
          <Progressbar color="red" progress={20}></Progressbar>
        </ListItem>
        <ListItem>
          <Progressbar color="pink" progress={30}></Progressbar>
        </ListItem>
        <ListItem>
          <Progressbar color="green" progress={80}></Progressbar>
        </ListItem>
        <ListItem>
          <Progressbar color="yellow" progress={90}></Progressbar>
        </ListItem>
        <ListItem>
          <Progressbar color="orange" progress={100}></Progressbar>
        </ListItem>
      </List>
    </Page>
  </View>
</App>
<script>
  import {f7, App, View, Page, Navbar, Block, BlockTitle, Progressbar, Segmented, Button, List, ListItem} from 'framework7-svelte';

  let determinateLoading = false;
  let infiniteLoading = false;

  function setInlineProgress(value) {
    f7.progressbar.set('#demo-inline-progressbar', value);
  }
  function showDeterminate(inline) {
    if (determinateLoading) return;
    determinateLoading = true;
    let progressBarEl;
    if (inline) {
      progressBarEl = f7.progressbar.show('#demo-determinate-container', 0);
    } else {
      progressBarEl = f7.progressbar.show(0, f7.theme === 'md' ? 'yellow' : 'blue');
    }
    let progress = 0;
    function simulateLoading() {
      setTimeout(() => {
        const progressBefore = progress;
        progress += Math.random() * 20;
        f7.progressbar.set(progressBarEl, progress);
        if (progressBefore < 100) {
          simulateLoading(); // keep "loading"
        } else {
          determinateLoading = false;
          f7.progressbar.hide(progressBarEl); // hide
        }
      }, Math.random() * 200 + 200);
    }
    simulateLoading();
  }
  function showInfinite(multiColor) {
    if (infiniteLoading) return;
    infiniteLoading = true;
    if (multiColor) {
      f7.progressbar.show('multi');
    } else {
      f7.progressbar.show(f7.theme === 'md' ? 'yellow' : 'blue');
    }
    setTimeout(() => {
      infiniteLoading = false;
      f7.progressbar.hide();
    }, 3000);
  }
</script>
