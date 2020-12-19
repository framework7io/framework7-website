<template>
  <f7-app>
    <f7-view main>
      <f7-page>
        <f7-navbar title="Buttons"></f7-navbar>

        <f7-block-title>Usual Buttons</f7-block-title>
        <f7-block strong>
          <f7-row>
            <f7-col>
              <f7-button>Button</f7-button>
            </f7-col>
            <f7-col>
              <f7-button>Button</f7-button>
            </f7-col>
            <f7-col>
              <f7-button round>Round</f7-button>
            </f7-col>
          </f7-row>
        </f7-block>

        <f7-block-title>Fill Buttons</f7-block-title>
        <f7-block strong>
          <f7-row>
            <f7-col>
              <f7-button fill>Button</f7-button>
            </f7-col>
            <f7-col>
              <f7-button fill>Button</f7-button>
            </f7-col>
            <f7-col>
              <f7-button fill round>Round</f7-button>
            </f7-col>
          </f7-row>
        </f7-block>

        <f7-block-title>Outline Buttons</f7-block-title>
        <f7-block strong>
          <f7-row>
            <f7-col>
              <f7-button outline>Button</f7-button>
            </f7-col>
            <f7-col>
              <f7-button outline>Button</f7-button>
            </f7-col>
            <f7-col>
              <f7-button outline round>Round</f7-button>
            </f7-col>
          </f7-row>
        </f7-block>

        <f7-block-title>Raised Buttons</f7-block-title>
        <f7-block strong>
          <f7-row tag="p">
            <f7-col tag="span">
              <f7-button raised>Button</f7-button>
            </f7-col>
            <f7-col tag="span">
              <f7-button raised fill>Fill</f7-button>
            </f7-col>
            <f7-col tag="span">
              <f7-button raised outline>Outline</f7-button>
            </f7-col>
          </f7-row>
          <f7-row tag="p">
            <f7-col tag="span">
              <f7-button raised round>Round</f7-button>
            </f7-col>
            <f7-col tag="span">
              <f7-button raised fill round>Fill</f7-button>
            </f7-col>
            <f7-col tag="span">
              <f7-button raised outline round>Outline</f7-button>
            </f7-col>
          </f7-row>
        </f7-block>

        <f7-block-title>Segmented</f7-block-title>
        <f7-block strong>
          <f7-segmented raised tag="p">
            <f7-button>Button</f7-button>
            <f7-button>Button</f7-button>
            <f7-button active>Active</f7-button>
          </f7-segmented>
          <f7-segmented strong tag="p">
            <f7-button>Button</f7-button>
            <f7-button>Button</f7-button>
            <f7-button active>Active</f7-button>
          </f7-segmented>
          <f7-segmented tag="p">
            <f7-button outline>Outline</f7-button>
            <f7-button outline>Outline</f7-button>
            <f7-button outline active>Active</f7-button>
          </f7-segmented>
          <f7-segmented raised round tag="p">
            <f7-button round>Button</f7-button>
            <f7-button round>Button</f7-button>
            <f7-button round active>Active</f7-button>
          </f7-segmented>
          <f7-segmented round tag="p">
            <f7-button round outline>Outline</f7-button>
            <f7-button round outline>Outline</f7-button>
            <f7-button round outline active>Active</f7-button>
          </f7-segmented>
        </f7-block>

        <f7-block-title>Large Buttons</f7-block-title>
        <f7-block strong>
          <f7-row tag="p">
            <f7-col tag="span">
              <f7-button large>Button</f7-button>
            </f7-col>
            <f7-col tag="span">
              <f7-button large fill>Fill</f7-button>
            </f7-col>
          </f7-row>
          <f7-row tag="p">
            <f7-col tag="span">
              <f7-button large raised>Raised</f7-button>
            </f7-col>
            <f7-col tag="span">
              <f7-button large raised fill>Raised Fill</f7-button>
            </f7-col>
          </f7-row>
        </f7-block>

        <f7-block-title>Small Buttons</f7-block-title>
        <f7-block strong>
          <f7-row tag="p">
            <f7-col tag="span">
              <f7-button large small>Button</f7-button>
            </f7-col>
            <f7-col tag="span">
              <f7-button large small outline>Outline</f7-button>
            </f7-col>
            <f7-col tag="span">
              <f7-button large small fill>Fill</f7-button>
            </f7-col>
          </f7-row>
          <f7-row tag="p">
            <f7-col tag="span">
              <f7-button large small round>Button</f7-button>
            </f7-col>
            <f7-col tag="span">
              <f7-button large small outline round>Outline</f7-button>
            </f7-col>
            <f7-col tag="span">
              <f7-button large small fill round>Fill</f7-button>
            </f7-col>
          </f7-row>
        </f7-block>

        <f7-block-title>Preloader Button</f7-block-title>
        <f7-block strong>
          <f7-button fill preloader :loading="isLoading" @click="load"> Load </f7-button>
        </f7-block>

        <f7-block-title>Color Buttons</f7-block-title>
        <f7-block strong>
          <f7-row>
            <f7-col>
              <f7-button color="red">Red</f7-button>
            </f7-col>
            <f7-col>
              <f7-button color="green">Green</f7-button>
            </f7-col>
            <f7-col>
              <f7-button color="blue">Blue</f7-button>
            </f7-col>
          </f7-row>
        </f7-block>

        <f7-block-title>Color Fill Buttons</f7-block-title>
        <f7-block strong>
          <f7-row>
            <f7-col>
              <f7-button fill color="red">Red</f7-button>
            </f7-col>
            <f7-col>
              <f7-button fill color="green">Green</f7-button>
            </f7-col>
            <f7-col>
              <f7-button fill color="blue">Blue</f7-button>
            </f7-col>
          </f7-row>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-app>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const isLoading = ref(false);
    const load = () => {
      if (isLoading.value) return;
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
      }, 4000);
    };

    return {
      isLoading,
      load,
    };
  },
};
</script>
