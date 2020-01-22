<Page pageContent={false}>
  <Navbar title="Tabbar Scrollable" backLink="Back">
    <NavRight>
      <Link iconIos="f7:arrow_up_arrow_down_circle_fill" iconAurora="f7:arrow_up_arrow_down_circle_fill" iconMd="material:compare_arrows" onClick={() => isBottom = !isBottom}></Link>
    </NavRight>
  </Navbar>

  <Toolbar tabbar scrollable position={isBottom ? 'bottom' : 'top'}>
    {#each tabs as tab, index (index)}
      <Link
        tabLink={`#tab-${tab}`}
        tabLinkActive={index === 0}
      >Tab {tab}</Link>
    {/each}
  </Toolbar>

  <Tabs>
    {#each tabs as tab, index (index)}
      <Tab
        id={`tab-${tab}`}
        class="page-content"
        tabActive={index === 0}
      >
        <Block>
          <p><b>Tab {tab} content</b></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit temporibus sequi iure ad laboriosam accusamus?</p>
          <p>Saepe explicabo voluptas ducimus provident, doloremque quo totam molestias! Suscipit blanditiis eaque exercitationem praesentium reprehenderit, fuga accusamus possimus sed, sint facilis ratione quod, qui dignissimos voluptas! Aliquam rerum consequuntur deleniti.</p>
          <p>Totam reprehenderit amet commodi ipsum nam provident doloremque possimus odio itaque, est animi culpa modi consequatur reiciendis corporis libero laudantium sed eveniet unde delectus a maiores nihil dolores? Natus, perferendis.</p>
          <p>Atque quis totam repellendus omnis alias magnam corrupti, possimus aspernatur perspiciatis quae provident consequatur minima doloremque blanditiis nihil maxime ducimus earum autem. Magni animi blanditiis similique iusto, repellat sed quisquam!</p>
          <p>Suscipit, facere quasi atque totam. Repudiandae facilis at optio atque, rem nam, natus ratione cum enim voluptatem suscipit veniam! Repellat, est debitis. Modi nam mollitia explicabo, unde aliquid impedit! Adipisci!</p>
          <p>Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste fugiat iusto dolorem autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro accusantium, officiis veniam nostrum cum cumque impedit.</p>
          <p>Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad praesentium rerum libero consectetur temporibus cupiditate atque aspernatur, eaque provident eligendi quaerat ea soluta doloremque. Iure fugit, minima facere.</p>
        </Block>
      </Tab>
    {/each}
  </Tabs>
</Page>
<script>
  import { Page, Navbar, Toolbar, Link, BlockTitle, Block, NavRight, Tabs, Tab } from 'framework7-svelte';

  const tabs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  let isBottom = true;
</script>
