import React, { useState, useRef } from 'react';
import {
  App,
  View,
  Page,
  Navbar,
  Block,
  Button,
  BlockTitle,
  Actions,
  ActionsGroup,
  ActionsLabel,
  ActionsButton,
  f7,
} from 'framework7-react';

export default () => {
  const [actionGridOpened, setActionGridOpened] = useState(false);
  const actionsToPopover = useRef(null);

  const openActionsPopover = () => {
    if (!actionsToPopover.current) {
      actionsToPopover.current = f7.actions.create({
        buttons: [
          {
            text: 'Do something',
            label: true,
          },
          {
            text: 'Button 1',
            bold: true,
          },
          {
            text: 'Button 2',
          },
          {
            text: 'Cancel',
            color: 'red',
          },
        ],
        // Need to specify popover target
        targetEl: '.button-to-popover',
      });
    }

    // Open
    actionsToPopover.current.open();
  };

  return (
    <App>
      <View main>
        <Page>
          <Navbar title="Action Sheet" />
          <Block strong>
            <p className="row">
              {/* One group, open by "actionsOpen" attribute */}
              <Button className="col" raised actionsOpen="#actions-one-group">
                One group
              </Button>
              {/*  Two groups, open by "actionsOpen" attribute */}
              <Button className="col" raised actionsOpen="#actions-two-groups">
                Two groups
              </Button>
            </p>
            <p>
              {/* Actions Grid, open by changing actionGridOpened state property */}
              <Button raised onClick={() => setActionGridOpened(true)}>
                Action Grid
              </Button>
            </p>
          </Block>

          <BlockTitle>Action Sheet To Popover</BlockTitle>
          <Block strong>
            <p>
              Action Sheet can be automatically converted to Popover (for tablets). This button will
              open Popover on tablets and Action Sheet on phones:
              <Button
                style={{ display: 'inline-block' }}
                className="button-to-popover"
                onClick={openActionsPopover}
              >
                Actions
              </Button>
            </p>
          </Block>

          {/* One Group */}
          <Actions id="actions-one-group">
            <ActionsGroup>
              <ActionsLabel>Do something</ActionsLabel>
              <ActionsButton bold>Button 1</ActionsButton>
              <ActionsButton>Button 2</ActionsButton>
              <ActionsButton color="red">Cancel</ActionsButton>
            </ActionsGroup>
          </Actions>

          {/* Two Groups */}
          <Actions id="actions-two-groups">
            <ActionsGroup>
              <ActionsLabel>Do something</ActionsLabel>
              <ActionsButton bold>Button 1</ActionsButton>
              <ActionsButton>Button 2</ActionsButton>
            </ActionsGroup>
            <ActionsGroup>
              <ActionsButton color="red">Cancel</ActionsButton>
            </ActionsGroup>
          </Actions>

          {/* Grid */}
          <Actions
            grid={true}
            opened={actionGridOpened}
            onActionsClosed={() => setActionGridOpened(false)}
          >
            <ActionsGroup>
              <ActionsButton>
                <img
                  slot="media"
                  src="https://cdn.framework7.io/placeholder/people-96x96-1.jpg"
                  width="48"
                />
                <span>Button 1</span>
              </ActionsButton>
              <ActionsButton>
                <img
                  slot="media"
                  src="https://cdn.framework7.io/placeholder/people-96x96-2.jpg"
                  width="48"
                />
                <span>Button 2</span>
              </ActionsButton>
              <ActionsButton>
                <img
                  slot="media"
                  src="https://cdn.framework7.io/placeholder/people-96x96-3.jpg"
                  width="48"
                />
                <span>Button 3</span>
              </ActionsButton>
            </ActionsGroup>
            <ActionsGroup>
              <ActionsButton>
                <img
                  slot="media"
                  src="https://cdn.framework7.io/placeholder/fashion-96x96-4.jpg"
                  width="48"
                />
                <span>Button 4</span>
              </ActionsButton>
              <ActionsButton>
                <img
                  slot="media"
                  src="https://cdn.framework7.io/placeholder/fashion-96x96-5.jpg"
                  width="48"
                />
                <span>Button 5</span>
              </ActionsButton>
              <ActionsButton>
                <img
                  slot="media"
                  src="https://cdn.framework7.io/placeholder/fashion-96x96-6.jpg"
                  width="48"
                />
                <span>Button 6</span>
              </ActionsButton>
            </ActionsGroup>
          </Actions>
        </Page>
      </View>
    </App>
  );
};
