<template>
  <f7-page>
    <f7-navbar title="Toolbar" back-link="Back"></f7-navbar>
    <f7-toolbar :position="isBottom ? 'bottom' : 'top'">
      <f7-link>Left Link</f7-link>
      <f7-link>Right Link</f7-link>
    </f7-toolbar>
    <f7-block-title>Toolbar Position</f7-block-title>
    <f7-block>
      <p>Toolbar supports both top and bottom positions. Click the following button to change its position.</p>
      <p>
        <f7-button raised @click="isBottom = !isBottom">Toggle Toolbar Position</f7-button>
      </p>
    </f7-block>
    <f7-block>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit temporibus sequi iure ad laboriosam accusamus?</p>
      <p>Saepe explicabo voluptas ducimus provident, doloremque quo totam molestias! Suscipit blanditiis eaque exercitationem praesentium reprehenderit, fuga accusamus possimus sed, sint facilis ratione quod, qui dignissimos voluptas! Aliquam rerum consequuntur deleniti.</p>
    </f7-block>
  </f7-page>
</template>
<script>
  export default {
    data() {
      return {
        isBottom: true,
      };
    }
  }
</script>
