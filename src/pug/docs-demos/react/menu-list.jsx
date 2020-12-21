import React, { useState } from 'react';
import { App, View, Page, Navbar, List, ListItem, Icon } from 'framework7-react';

export default () => {
  const [selected, setSelected] = useState('home');
  const [selectedMedia, setSelectedMedia] = useState('home');
  return (
    <App>
      <View main>
        <Page>
          <Navbar title="Menu List" />

          <List menuList>
            <ListItem
              link
              title="Home"
              selected={selected === 'home'}
              onClick={() => setSelected('home')}
            >
              <Icon md="material:home" aurora="f7:house_fill" ios="f7:house_fill" slot="media" />
            </ListItem>
            <ListItem
              link
              title="Profile"
              selected={selected === 'profile'}
              onClick={() => setSelected('profile')}
            >
              <Icon
                md="material:person"
                aurora="f7:person_fill"
                ios="f7:person_fill"
                slot="media"
              />
            </ListItem>
            <ListItem
              link
              title="Settings"
              selected={selected === 'settings'}
              onClick={() => setSelected('settings')}
            >
              <Icon
                md="material:settings"
                aurora="f7:gear_alt_fill"
                ios="f7:gear_alt_fill"
                slot="media"
              />
            </ListItem>
          </List>

          <List menuList mediaList>
            <ListItem
              link
              title="Home"
              subtitle="Home subtitle"
              selected={selectedMedia === 'home'}
              onClick={() => setSelectedMedia('home')}
            >
              <Icon md="material:home" aurora="f7:house_fill" ios="f7:house_fill" slot="media" />
            </ListItem>
            <ListItem
              link
              title="Profile"
              subtitle="Profile subtitle"
              selected={selectedMedia === 'profile'}
              onClick={() => setSelectedMedia('profile')}
            >
              <Icon
                md="material:person"
                aurora="f7:person_fill"
                ios="f7:person_fill"
                slot="media"
              />
            </ListItem>
            <ListItem
              link
              title="Settings"
              subtitle="Settings subtitle"
              selected={selectedMedia === 'settings'}
              onClick={() => setSelectedMedia('settings')}
            >
              <Icon
                md="material:settings"
                aurora="f7:gear_alt_fill"
                ios="f7:gear_alt_fill"
                slot="media"
              />
            </ListItem>
          </List>
        </Page>
      </View>
    </App>
  );
};
