<template>
  <f7-app>
    <f7-view main>
      <f7-page>
        <f7-navbar title="Photo Browser"></f7-navbar>

        <f7-block strong>
          <p>
            Photo Browser could be opened in a three ways - as a Standalone component (Popup
            modification), in Popup, and as separate Page:
          </p>
          <p>
            <f7-photo-browser
              :photos="photos"
              ref="standalone"
              :routable-modals="false"
            ></f7-photo-browser>
            <f7-button fill raised @click="$refs.standalone.open()">Standalone</f7-button>
          </p>
          <p>
            <f7-photo-browser
              :photos="photos"
              type="popup"
              ref="popup"
              :routable-modals="false"
            ></f7-photo-browser>
            <f7-button fill raised @click="$refs.popup.open()">Popup</f7-button>
          </p>
          <p>
            <f7-photo-browser
              :photos="photos"
              type="page"
              back-link-text="Back"
              ref="page"
              :routable-modals="false"
            ></f7-photo-browser>
            <f7-button fill raised @click="$refs.page.open()">Page</f7-button>
          </p>
        </f7-block>

        <f7-block strong>
          <p>
            Photo Browser supports 2 default themes - default Light (like in previous examples) and
            Dark theme. Here is a Dark theme examples:
          </p>
          <p>
            <f7-photo-browser
              :photos="photos"
              theme="dark"
              ref="standaloneDark"
              :routable-modals="false"
            ></f7-photo-browser>
            <f7-button fill raised @click="$refs.standaloneDark.open()">Standalone</f7-button>
          </p>
          <p>
            <f7-photo-browser
              :photos="photos"
              theme="dark"
              type="popup"
              ref="popupDark"
              :routable-modals="false"
            ></f7-photo-browser>
            <f7-button fill raised @click="$refs.popupDark.open()">Popup</f7-button>
          </p>
          <p>
            <f7-photo-browser
              :photos="photos"
              theme="dark"
              type="page"
              back-link-text="Back"
              ref="pageDark"
              :routable-modals="false"
            ></f7-photo-browser>
            <f7-button fill raised @click="$refs.pageDark.open()">Page</f7-button>
          </p>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-app>
</template>

<script>
export default {
  data() {
    return {
      photos: ['https://placekitten.com/800/800', 'https://placekitten.com/1024/1024'],
    };
  },
};
</script>
