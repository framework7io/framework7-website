import React, { useState } from 'react';
import { Page, Navbar, Toolbar, Link, Block, NavRight, Tabs, Tab } from 'framework7-react';

export default () => {
  const [isBottom, setIsBottom] = useState(true);
  const tabs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <Page pageContent={false}>
      <Navbar title="Tabbar Scrollable" backLink="Back">
        <NavRight>
          <Link
            iconIos="f7:arrow_up_arrow_down_circle_fill"
            iconAurora="f7:arrow_up_arrow_down_circle_fill"
            iconMd="material:compare_arrows"
            onClick={() => setIsBottom(!isBottom)}
          ></Link>
        </NavRight>
      </Navbar>

      <Toolbar tabbar scrollable position={isBottom ? 'bottom' : 'top'}>
        {tabs.map((tab, index) => (
          <Link key={tab} tabLink={`#tab-${tab}`} tabLinkActive={index === 0}>
            Tab {tab}
          </Link>
        ))}
      </Toolbar>

      <Tabs>
        {tabs.map((tab, index) => (
          <Tab key={tab} id={`tab-${tab}`} className="page-content" tabActive={index === 0}>
            <Block>
              <p>
                <b>Tab {tab} content</b>
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae
                facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione
                illo suscipit temporibus sequi iure ad laboriosam accusamus?
              </p>
              <p>
                Saepe explicabo voluptas ducimus provident, doloremque quo totam molestias! Suscipit
                blanditiis eaque exercitationem praesentium reprehenderit, fuga accusamus possimus
                sed, sint facilis ratione quod, qui dignissimos voluptas! Aliquam rerum consequuntur
                deleniti.
              </p>
              <p>
                Totam reprehenderit amet commodi ipsum nam provident doloremque possimus odio
                itaque, est animi culpa modi consequatur reiciendis corporis libero laudantium sed
                eveniet unde delectus a maiores nihil dolores? Natus, perferendis.
              </p>
              <p>
                Atque quis totam repellendus omnis alias magnam corrupti, possimus aspernatur
                perspiciatis quae provident consequatur minima doloremque blanditiis nihil maxime
                ducimus earum autem. Magni animi blanditiis similique iusto, repellat sed quisquam!
              </p>
              <p>
                Suscipit, facere quasi atque totam. Repudiandae facilis at optio atque, rem nam,
                natus ratione cum enim voluptatem suscipit veniam! Repellat, est debitis. Modi nam
                mollitia explicabo, unde aliquid impedit! Adipisci!
              </p>
              <p>
                Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste
                fugiat iusto dolorem autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro
                accusantium, officiis veniam nostrum cum cumque impedit.
              </p>
              <p>
                Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad
                praesentium rerum libero consectetur temporibus cupiditate atque aspernatur, eaque
                provident eligendi quaerat ea soluta doloremque. Iure fugit, minima facere.
              </p>
            </Block>
          </Tab>
        ))}
      </Tabs>
    </Page>
  );
};
