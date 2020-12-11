<template>
  <f7-app>
    <f7-view main>
      <f7-page>
        <f7-navbar title="Preloader"></f7-navbar>

        <f7-block-title>Default</f7-block-title>
        <f7-block strong class="row demo-preloaders align-items-stretch text-align-center">
          <f7-col>
            <f7-preloader></f7-preloader>
          </f7-col>
          <f7-col style="background: #000">
            <f7-preloader color="white"></f7-preloader>
          </f7-col>
          <f7-col>
            <f7-preloader :size="42"></f7-preloader>
          </f7-col>
          <f7-col style="background: #000">
            <f7-preloader :size="42" color="white"></f7-preloader>
          </f7-col>
        </f7-block>

        <f7-block-title>Color Preloaders</f7-block-title>
        <f7-block strong class="row text-align-center">
          <f7-col>
            <f7-preloader color="red"></f7-preloader>
          </f7-col>
          <f7-col>
            <f7-preloader color="green"></f7-preloader>
          </f7-col>
          <f7-col>
            <f7-preloader color="orange"></f7-preloader>
          </f7-col>
          <f7-col>
            <f7-preloader color="blue"></f7-preloader>
          </f7-col>
        </f7-block>

        <f7-block-title>Multi-color</f7-block-title>
        <f7-block strong class="text-align-center">
          <f7-preloader color="multi"></f7-preloader>
        </f7-block>

        <f7-block-title>Preloader Modals</f7-block-title>
        <f7-block strong>
          <p>With <b>app.preloader.show()</b> you can show small overlay with preloader indicator.</p>
          <p>
            <a class="button button-fill" @click="openIndicator">Open Small Indicator</a>
          </p>
          <p>With <b>app.dialog.preloader()</b> you can show dialog modal with preloader indicator.</p>
          <p>
            <a class="button button-fill" @click="openDialog">Open Dialog Preloader</a>
          </p>
          <p>With <b>app.dialog.preloader('My text...')</b> you can show dialog preloader modal with custom title.</p>
          <p>
            <a class="button button-fill" @click="openCustomDialog">Open Dialog Preloader</a>
          </p>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-app>
</template>

<style>
  .demo-preloaders .col {
    line-height: 42px;
  }
</style>

<script>
  import { f7 } from 'framework7-vue';

  export default {
    methods: {
      openIndicator() {
        const self = this;
        f7.preloader.show();
        setTimeout(() => {
          f7.preloader.hide();
        }, 2000);
      },
      openDialog() {
        const self = this;
        f7.dialog.preloader();
        setTimeout(() => {
          f7.dialog.close();
        }, 2000);
      },
      openCustomDialog() {
        const self = this;
        f7.dialog.preloader('My text...');
        setTimeout(() => {
          f7.dialog.close();
        }, 2000);
      },
    },
  }
</script>
