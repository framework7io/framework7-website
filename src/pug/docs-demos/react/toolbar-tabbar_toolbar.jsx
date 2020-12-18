import React, { useState } from 'react';
import { Page, Navbar, Toolbar, Link, BlockTitle, Block, Button } from 'framework7-react';

export default () => {
  const [isBottom, setIsBottom] = useState(true);

  return (
    <Page>
      <Navbar title="Toolbar" backLink="Back"></Navbar>

      <Toolbar position={isBottom ? 'bottom' : 'top'}>
        <Link>Left Link</Link>
        <Link>Right Link</Link>
      </Toolbar>

      <BlockTitle>Toolbar Position</BlockTitle>

      <Block>
        <p>
          Toolbar supports both top and bottom positions. Click the following button to change its
          position.
        </p>
        <p>
          <Button raised onClick={() => setIsBottom(!isBottom)}>
            Toggle Toolbar Position
          </Button>
        </p>
      </Block>

      <Block>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae
          facilis laudantium voluptates obcaecati officia cum, sit libero commodi...
        </p>
      </Block>
    </Page>
  );
};
