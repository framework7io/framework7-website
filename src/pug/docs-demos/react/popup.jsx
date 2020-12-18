import React, { useState, useRef } from 'react';
import {
  App,
  View,
  Page,
  Navbar,
  Block,
  Button,
  Popup,
  NavRight,
  Link,
  BlockTitle,
  f7,
} from 'framework7-react';

export default () => {
  const [popupOpened, setPopupOpened] = useState(false);
  const popup = useRef(null);

  const createPopup = () => {
    // Create popup
    if (!popup.current) {
      popup.current = f7.popup.create({
        content: `
          <div className="popup">
            <div className="page">
              <div className="navbar">
                <div className="navbar-bg"></div>
                <div className="navbar-inner">
                  <div className="title">Dynamic Popup</div>
                  <div className="right"><a href="#" className="link popup-close">Close</a></div>
                </div>
              </div>
              <div className="page-content">
                <div className="block">
                  <p>This popup was created dynamically</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
                </div>
              </div>
            </div>
          </div>
        `.trim(),
      });
    }
    // Open it
    popup.current.open();
  };

  return (
    <App>
      <View main>
        <Page>
          <Navbar title="Popup"></Navbar>
          <Block>
            <p>
              Popup is a modal window with any HTML content that pops up over App's main content.
              Popup as all other overlays is part of so called "Temporary Views".
            </p>
            <p>
              <Button fill popupOpen=".demo-popup">
                Open Popup
              </Button>
            </p>
            <p>
              <Button fill onClick={() => setPopupOpened(true)}>
                Open Via Prop Change
              </Button>
            </p>
            <p>
              <Button fill onClick={createPopup}>
                Create Dynamic Popup
              </Button>
            </p>
            <p>
              <Button fill popupOpen=".demo-popup-swipe">
                Swipe To Close
              </Button>
            </p>
            <p>
              <Button fill popupOpen=".demo-popup-swipe-handler">
                With Swipe Handler
              </Button>
            </p>
            <p>
              <Button fill popupOpen=".demo-popup-push">
                Popup Push
              </Button>
            </p>
          </Block>
          <Popup
            className="demo-popup"
            opened={popupOpened}
            onPopupClosed={() => setPopupOpened(false)}
          >
            <Page>
              <Navbar title="Popup Title">
                <NavRight>
                  <Link popupClose>Close</Link>
                </NavRight>
              </Navbar>
              <Block>
                <p>
                  Here comes popup. You can put here anything, even independent view with its own
                  navigation. Also not, that by default popup looks a bit different on iPhone/iPod
                  and iPad, on iPhone it is fullscreen.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus
                  mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a,
                  egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie
                  arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus
                  malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris
                  ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet
                  aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum
                  pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.
                </p>
                <p>
                  Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit
                  nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel,
                  feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante.
                  Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate
                  eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor
                  sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa
                  quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida
                  adipiscing libero.
                </p>
              </Block>
            </Page>
          </Popup>

          <Popup className="demo-popup-swipe" swipeToClose>
            <Page>
              <Navbar title="Swipe To Close">
                <NavRight>
                  <Link popupClose>Close</Link>
                </NavRight>
              </Navbar>

              <div
                style={{ height: '100%' }}
                className="display-flex justify-content-center align-items-center"
              >
                <p>Swipe me up or down</p>
              </div>
            </Page>
          </Popup>

          <Popup className="demo-popup-swipe-handler" swipeToClose swipeHandler=".swipe-handler">
            <Page>
              <BlockTitle large>Hello!</BlockTitle>
              <Block strong>
                <p className="swipe-handler">
                  <b>Swipe works only on this paragraph</b>
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus
                  mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a,
                  egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie
                  arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus
                  malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris
                  ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet
                  aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum
                  pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.
                </p>
                <p>
                  Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit
                  nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel,
                  feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante.
                  Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate
                  eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor
                  sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa
                  quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida
                  adipiscing libero.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus
                  mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a,
                  egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie
                  arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus
                  malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris
                  ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet
                  aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum
                  pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.
                </p>
                <p>
                  Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit
                  nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel,
                  feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante.
                  Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate
                  eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor
                  sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa
                  quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida
                  adipiscing libero.
                </p>
              </Block>
            </Page>
          </Popup>

          <Popup className="demo-popup-push" push>
            <Page>
              <Navbar title="Popup Push">
                <NavRight>
                  <Link popupClose>Close</Link>
                </NavRight>
              </Navbar>
              <Block strong>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus
                  mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a,
                  egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie
                  arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus
                  malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris
                  ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet
                  aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum
                  pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.
                </p>
                <p>
                  Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit
                  nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel,
                  feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante.
                  Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate
                  eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor
                  sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa
                  quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida
                  adipiscing libero.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus
                  mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a,
                  egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie
                  arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus
                  malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris
                  ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet
                  aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum
                  pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.
                </p>
                <p>
                  Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit
                  nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel,
                  feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante.
                  Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate
                  eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor
                  sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa
                  quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida
                  adipiscing libero.
                </p>
              </Block>
            </Page>
          </Popup>
        </Page>
      </View>
    </App>
  );
};
