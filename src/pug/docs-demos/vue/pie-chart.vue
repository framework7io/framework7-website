<template>
  <f7-app>
    <f7-view main>
      <f7-page>
        <f7-navbar title="Pie Chart" />
        <f7-block-title>Simple Pie Chart</f7-block-title>
        <f7-block strong>
          <f7-pie-chart
            :datasets="[
              {
                value: 100,
                color: '#f00',
              },
              {
                value: 200,
                color: '#0f0',
              },
              {
                value: 300,
                color: '#00f',
              },
            ]"
          />
        </f7-block>

        <f7-block-title>With Tooltip</f7-block-title>
        <f7-block strong>
          <f7-pie-chart
            tooltip
            :datasets="[
              {
                label: 'JavaScript',
                value: 150,
                color: '#ff0',
              },
              {
                label: 'Vue.js',
                value: 150,
                color: '#0f0',
              },
              {
                label: 'TypeScript',
                value: 400,
                color: '#00f',
              },
            ]"
          />
        </f7-block>

        <f7-block-title>Custom Format Tooltip</f7-block-title>
        <f7-block strong>
          <f7-pie-chart
            tooltip
            :datasets="[
              {
                label: 'JavaScript',
                value: 1000,
                color: '#ff0',
              },
              {
                label: 'Vue.js',
                value: 100,
                color: '#0f0',
              },
              {
                label: 'TypeScript',
                value: 200,
                color: '#00f',
              },
            ]"
            :format-tooltip="
              ({ color, value, label }) =>
                `You have <span style='color: ${color}'>${value} points</span> for ${label}`
            "
          />
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-app>
</template>
