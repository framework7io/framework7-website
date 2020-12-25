import React, { useRef } from 'react';
import { App, View, Page, Navbar, Block, Row, Col, PhotoBrowser, Button } from 'framework7-react';

export default () => {
  const standalone = useRef(null);
  const popup = useRef(null);
  const page = useRef(null);
  const standaloneDark = useRef(null);
  const popupDark = useRef(null);
  const pageDark = useRef(null);

  const photos = ['https://placekitten.com/800/800', 'https://placekitten.com/1024/1024'];

  return (
    <App>
      <View main>
        <Page>
          <Navbar title="Photo Browser"></Navbar>

          <Block strong>
            <p>
              Photo Browser could be opened in a three ways - as a Standalone component (Popup
              modification), in Popup, and as separate Page:
            </p>

            <p>
              <PhotoBrowser photos={photos} ref={standalone} />
              <Button fill raised onClick={() => standalone.current.open()}>
                Standalone
              </Button>
            </p>
            <p>
              <PhotoBrowser photos={photos} type="popup" ref={popup} />
              <Button fill raised onClick={() => popup.current.open()}>
                Popup
              </Button>
            </p>
            <p>
              <PhotoBrowser photos={photos} type="page" pageBackLinkText="Back" ref={page} />
              <Button fill raised onClick={() => page.current.open()}>
                Page
              </Button>
            </p>
          </Block>
          <Block strong>
            <p>
              Photo Browser supports 2 default themes - default Light (like in previous examples)
              and Dark theme. Here is a Dark theme examples:
            </p>

            <p>
              <PhotoBrowser photos={photos} theme="dark" ref={standaloneDark} />
              <Button fill raised onClick={() => standaloneDark.current.open()}>
                Standalone
              </Button>
            </p>
            <p>
              <PhotoBrowser photos={photos} theme="dark" type="popup" ref={popupDark} />
              <Button fill raised onClick={() => popupDark.current.open()}>
                Popup
              </Button>
            </p>
            <p>
              <PhotoBrowser
                photos={photos}
                theme="dark"
                type="page"
                pageBackLinkText="Back"
                ref={pageDark}
              />
              <Button fill raised onClick={() => pageDark.current.open()}>
                Page
              </Button>
            </p>
          </Block>
        </Page>
      </View>
    </App>
  );
};
