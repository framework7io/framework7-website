<template>
  <f7-app>
    <f7-view main>
      <f7-page>
        <f7-navbar title="Gauge"></f7-navbar>

        <f7-block strong class="text-align-center">
          <f7-gauge
            type="circle"
            :value="gaugeValue"
            :size="250"
            border-color="#2196f3"
            :border-width="10"
            :value-text="`${gaugeValue * 100}%`"
            :value-font-size="41"
            value-text-color="#2196f3"
            label-text="amount of something"
          ></f7-gauge>
          <f7-segmented tag="p" raised>
            <f7-button @click="() => gaugeValue = 0">0%</f7-button>
            <f7-button @click="() => gaugeValue = 0.25">25%</f7-button>
            <f7-button @click="() => gaugeValue = 0.5">50%</f7-button>
            <f7-button @click="() => gaugeValue = 0.75">75%</f7-button>
            <f7-button @click="() => gaugeValue = 1">100%</f7-button>
          </f7-segmented>
        </f7-block>

        <f7-block-title>Circle Gauges</f7-block-title>
        <f7-block strong>
          <f7-row>
            <f7-col class="text-align-center">
              <f7-gauge
                type="circle"
                :value="0.44"
                value-text="44%"
                value-text-color="#ff9800"
                border-color="#ff9800"
              ></f7-gauge>
            </f7-col>
            <f7-col class="text-align-center">
              <f7-gauge
                type="circle"
                :value="0.12"
                value-text="$120"
                value-text-color="#4caf50"
                border-color="#4caf50"
                label-text="of $1000 budget"
                label-text-color="#f44336"
                :label-font-weight="700"
              ></f7-gauge>
            </f7-col>
          </f7-row>
        </f7-block>
        <f7-block-title>Semicircle Gauges</f7-block-title>
        <f7-block strong>
          <f7-row>
            <f7-col class="text-align-center">
              <f7-gauge
                type="semicircle"
                :value="0.3"
                value-text="30%"
                value-text-color="#f44336"
                border-color="#f44336"
              ></f7-gauge>
            </f7-col>
            <f7-col class="text-align-center">
              <f7-gauge
                type="semicircle"
                :value="0.5"
                value-text="30kg"
                value-text-color="#e91e63"
                border-color="#e91e63"
                label-text="of 60kg total"
                label-text-color="#333"
              ></f7-gauge>
            </f7-col>
          </f7-row>
        </f7-block>
        <f7-block-title>Customization</f7-block-title>
        <f7-block strong>
          <f7-row>
            <f7-col class="text-align-center">
              <f7-gauge
                type="circle"
                :value="0.35"
                value-text="35%"
                value-text-color="#4caf50"
                :valueFontSize="51"
                :valueFontWeight="700"
                :border-width="20"
                border-color="#4caf50"
                border-bg-color="#ffeb3b"
                bg-color="#ffeb3b"
              ></f7-gauge>
            </f7-col>
            <f7-col class="text-align-center">
              <f7-gauge
                type="circle"
                :value="0.67"
                value-text="$670"
                value-text-color="#000"
                border-color="#ff9800"
                label-text="of $1000 spent"
                label-text-color="#4caf50"
                :label-font-weight="800"
                :label-font-size="12"
                :border-width="30"
              ></f7-gauge>
            </f7-col>
          </f7-row>
          <br />
          <f7-row>
            <f7-col class="text-align-center">
              <f7-gauge
                type="semicircle"
                :value="0.5"
                value-text="50%"
                value-text-color="#ffeb3b"
                :valueFontSize="41"
                :valueFontWeight="700"
                :border-width="10"
                border-color="#ffeb3b"
                border-bg-color="transparent"
              ></f7-gauge>
            </f7-col>
            <f7-col class="text-align-center">
              <f7-gauge
                type="semicircle"
                :value="0.77"
                border-color="#ff9800"
                label-text="$770 spent so far"
                label-text-color="#ff9800"
                :label-font-weight="800"
                :label-font-size="12"
                :border-width="10"
              ></f7-gauge>
            </f7-col>
          </f7-row>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-app>
</template>

<script>
  export default {
    data() {
      return {
        gaugeValue: 0.5,
      };
    },
  }
</script>
