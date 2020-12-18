import React, { useState } from 'react';
import {
  f7,
  Page,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter,
  Navbar,
  Block,
  ListItem,
  Button,
  LoginScreen,
} from 'framework7-react';

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginScreenOpened, setLoginScreenOpened] = useState(false);

  const signIn = () => {
    f7.dialog.alert(`Username: ${username}<br>Password: ${password}`, () => {
      f7.loginScreen.close();
    });
  };

  return (
    <Page>
      <Navbar title="Login Screen"></Navbar>
      <Block>
        <p>
          Framework7 comes with ready to use Login Screen layout. It could be used inside of page or
          inside of popup (Embedded) or as a standalone overlay:
        </p>
      </Block>

      <List>
        <ListItem link="/login-screen-page/" title="As Separate Page"></ListItem>
      </List>

      <Block>
        <Button raised large fill loginScreenOpen=".demo-login-screen">
          As Overlay
        </Button>
      </Block>

      <Block>
        <Button
          raised
          large
          fill
          onClick={() => {
            setLoginScreenOpened(true);
          }}
        >
          Open Via Prop Change
        </Button>
      </Block>

      <LoginScreen
        className="demo-login-screen"
        opened={loginScreenOpened}
        onLoginScreenClosed={() => {
          setLoginScreenOpened(false);
        }}
      >
        <Page loginScreen>
          <LoginScreenTitle>Framework7</LoginScreenTitle>
          <List form>
            <ListInput
              label="Username"
              type="text"
              placeholder="Your username"
              value={username}
              onInput={(e) => {
                setUsername(e.target.value);
              }}
            />
            <ListInput
              label="Password"
              type="password"
              placeholder="Your password"
              value={password}
              onInput={(e) => {
                setPassword(e.target.value);
              }}
            />
          </List>
          <List>
            <ListButton onClick={signIn}>Sign In</ListButton>
            <BlockFooter>
              Some text about login information.
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </BlockFooter>
          </List>
        </Page>
      </LoginScreen>
    </Page>
  );
};
