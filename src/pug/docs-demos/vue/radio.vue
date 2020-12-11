<template>
  <f7-app>
    <f7-view main>
      <f7-page>
        <f7-navbar title="Radio"></f7-navbar>

        <f7-block-title>Inline</f7-block-title>
        <f7-block strong>
          <p>Lorem <f7-radio name="demo-radio-inline"></f7-radio> ipsum dolor sit amet, consectetur adipisicing elit. Alias beatae illo nihil aut eius commodi sint eveniet aliquid eligendi <f7-radio name="demo-radio-inline" checked></f7-radio> ad delectus impedit tempore nemo, enim vel praesentium consequatur nulla mollitia!</p>
        </f7-block>

        <f7-block-title>Radio Group</f7-block-title>
        <f7-block-header>Icon in the beginning of the list item</f7-block-header>
        <f7-list>
          <f7-list-item radio radio-icon="start" title="Books" name="demo-radio-start" checked></f7-list-item>
          <f7-list-item radio radio-icon="start" title="Movies" name="demo-radio-start"></f7-list-item>
          <f7-list-item radio radio-icon="start" title="Food" name="demo-radio-start"></f7-list-item>
          <f7-list-item radio radio-icon="start" title="Drinks" name="demo-radio-start"></f7-list-item>
        </f7-list>

        <f7-block-header>Icon in the end of the list item</f7-block-header>
        <f7-list>
          <f7-list-item radio radio-icon="end" title="Books" name="demo-radio-end" checked></f7-list-item>
          <f7-list-item radio radio-icon="end" title="Movies" name="demo-radio-end"></f7-list-item>
          <f7-list-item radio radio-icon="end" title="Food" name="demo-radio-end"></f7-list-item>
          <f7-list-item radio radio-icon="end" title="Drinks" name="demo-radio-end"></f7-list-item>
        </f7-list>

        <f7-block-title>With Media Lists</f7-block-title>
          <f7-list media-list>
            <f7-list-item
              radio
              checked
              name="demo-media-radio"
              value="1"
              title="Facebook"
              after="17:14"
              subtitle="New messages from John Doe"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
            ></f7-list-item>
            <f7-list-item
              radio
              name="demo-media-radio"
              value="2"
              title="John Doe (via Twitter)"
              after="17:11"
              subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
            ></f7-list-item>
            <f7-list-item
              radio
              name="demo-media-radio"
              value="3"
              title="Facebook"
              after="16:48"
              subtitle="New messages from John Doe"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
            ></f7-list-item>
            <f7-list-item
              radio
              name="demo-media-radio"
              value="4"
              title="John Doe (via Twitter)"
              after="15:32"
              subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
            ></f7-list-item>
          </f7-list>
      </f7-page>
    </f7-view>
  </f7-app>
</template>
