import React from 'react';
import {
  App,
  View,
  Page,
  Navbar,
  BlockTitle,
  Block,
  Radio,
  BlockHeader,
  List,
  ListItem,
} from 'framework7-react';

export default () => (
  <App>
    <View main>
      <Page>
        <Navbar title="Radio"></Navbar>

        <BlockTitle>Inline</BlockTitle>
        <Block strong>
          <p>
            Lorem <Radio name="demo-radio-inline" value="inline-1" /> ipsum dolor sit amet,
            consectetur adipisicing elit. Alias beatae illo nihil aut eius commodi sint eveniet
            aliquid eligendi <Radio name="demo-radio-inline" value="inline-2" defaultChecked /> ad
            delectus impedit tempore nemo, enim vel praesentium consequatur nulla mollitia!
          </p>
        </Block>

        <BlockTitle>Radio Group</BlockTitle>
        <BlockHeader>Icon in the beginning of the list item</BlockHeader>
        <List>
          <ListItem
            radio
            radioIcon="start"
            title="Books"
            value="Books"
            name="demo-radio-start"
            defaultChecked
          ></ListItem>
          <ListItem
            radio
            radioIcon="start"
            title="Movies"
            value="Movies"
            name="demo-radio-start"
          ></ListItem>
          <ListItem
            radio
            radioIcon="start"
            title="Food"
            value="Food"
            name="demo-radio-start"
          ></ListItem>
          <ListItem
            radio
            radioIcon="start"
            title="Drinks"
            value="Drinks"
            name="demo-radio-start"
          ></ListItem>
        </List>

        <BlockHeader>Icon in the end of the list item</BlockHeader>
        <List>
          <ListItem
            radio
            radioIcon="end"
            title="Books"
            value="Books"
            name="demo-radio-end"
            defaultChecked
          ></ListItem>
          <ListItem
            radio
            radioIcon="end"
            title="Movies"
            value="Movies"
            name="demo-radio-end"
          ></ListItem>
          <ListItem
            radio
            radioIcon="end"
            title="Food"
            value="Food"
            name="demo-radio-end"
          ></ListItem>
          <ListItem
            radio
            radioIcon="end"
            title="Drinks"
            value="Drinks"
            name="demo-radio-end"
          ></ListItem>
        </List>

        <BlockTitle>With Media Lists</BlockTitle>
        <List mediaList>
          <ListItem
            radio
            defaultChecked
            name="demo-media-radio"
            value="1"
            title="Facebook"
            after="17:14"
            subtitle="New messages from John Doe"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
          ></ListItem>
          <ListItem
            radio
            name="demo-media-radio"
            value="2"
            title="John Doe (via Twitter)"
            after="17:11"
            subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
          ></ListItem>
          <ListItem
            radio
            name="demo-media-radio"
            value="3"
            title="Facebook"
            after="16:48"
            subtitle="New messages from John Doe"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
          ></ListItem>
          <ListItem
            radio
            name="demo-media-radio"
            value="4"
            title="John Doe (via Twitter)"
            after="15:32"
            subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
          ></ListItem>
        </List>
      </Page>
    </View>
  </App>
);
