<App>
  <View main>
    <Page>
      <Navbar title="Skeleton Elements" />

      <BlockTitle>Skeleton List</BlockTitle>
      <List mediaList class="skeleton-text">
        <ListItem
          title="Title"
          subtitle="Subtitle"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
        >
          <span slot="media">
            <SkeletonBlock style="width: 40px; height: 40px; border-radius: 50%" />
          </span>
        </ListItem>
        <ListItem
          title="Title"
          subtitle="Subtitle"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
        >
          <span slot="media">
            <SkeletonBlock style="width: 40px; height: 40px; border-radius: 50%" />
          </span>
        </ListItem>
      </List>

      <BlockTitle>Skeleton Card</BlockTitle>
      <Card
        class="skeleton-text"
        title="Card Header"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit."
        footer="Card Footer"
      ></Card>

      <BlockTitle>Loading Effects</BlockTitle>
      <Block strong>
        <Row tag="p">
          <Button fill small round class="col" onClick={() => load('fade')}>Fade</Button>
          <Button fill small round class="col" onClick={() => load('wave')}>Wave</Button>
          <Button fill small round class="col" onClick={() => load('pulse')}>Pulse</Button>
        </Row>
      </Block>
      {#if loading}
        <List mediaList v-if="loading">
          {#each [1,2,3] as n, index (index)}
            <ListItem
              class={`skeleton-text skeleton-effect-${effect}`}
              title="Full Name"
              subtitle="Position"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis. Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
            >
              <span slot="media">
                <SkeletonBlock style="width: 40px; height: 40px; border-radius: 50%" />
              </span>
            </ListItem>
          {/each}
        </List>
      {:else}
        <List mediaList>
          <ListItem
            title="John Doe"
            subtitle="CEO"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis. Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
          >
            <img src="https://placeimg.com/80/80/people/1" style="width: 40px; height: 40px; border-radius: 50%" slot="media" />
          </ListItem>
          <ListItem
            title="Jane Doe"
            subtitle="Marketing"
            text="Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis. Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
          >
            <img src="https://placeimg.com/80/80/people/2" style="width: 40px; height: 40px; border-radius: 50%" slot="media" />
          </ListItem>
          <ListItem
            title="Kate Johnson"
            subtitle="Admin"
            text="Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
          >
            <img src="https://placeimg.com/80/80/people/3" style="width: 40px; height: 40px; border-radius: 50%" slot="media" />
          </ListItem>
        </List>
      {/if}
    </Page>
  </View>
</App>
<script>
  import {App, View, Page, Navbar, BlockTitle, List, ListItem, SkeletonBlock, Card, Block, Row, Button} from 'framework7-svelte';

  let loading = false;
  let effect = null;

  function load(newEffect) {
    if (loading) return;

    effect = newEffect;
    loading = true;
    setTimeout(() => {
      loading = false;
    }, 3000);
  }
</script>
