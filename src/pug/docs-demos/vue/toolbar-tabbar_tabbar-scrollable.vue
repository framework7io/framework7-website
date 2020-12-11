<template>
  <f7-page :page-content="false">
    <f7-navbar title="Tabbar Scrollable" back-link="Back">
      <f7-nav-right>
        <f7-link icon-ios="f7:arrow_up_arrow_down_circle_fill" icon-aurora="f7:arrow_up_arrow_down_circle_fill" icon-md="material:compare_arrows" @click="isBottom = !isBottom"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-toolbar tabbar scrollable :position="isBottom ? 'bottom' : 'top'">
      <f7-link
        v-for="(tab, index) in tabs"
        :key="tab"
        :tab-link="`#tab-${tab}`"
        :tab-link-active="index === 0"
        >Tab {{tab}}</f7-link>
    </f7-toolbar>
    <f7-tabs>
      <f7-tab
        v-for="(tab, index) in tabs"
        :key="tab"
        :id="`tab-${tab}`"
        class="page-content"
        :tab-active="index === 0"
      >
        <f7-block>
          <p><b>Tab {{tab}} content</b></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque corrupti, quos asperiores unde aspernatur illum odio, eveniet. Fugiat magnam perspiciatis ex dignissimos, rerum modi ea nesciunt praesentium iusto optio rem?</p>
          <p>Illo debitis et recusandae, ipsum nisi nostrum vero delectus quasi. Quasi, consequatur! Corrupti, explicabo maxime incidunt fugit sint dicta saepe officiis sed expedita, minima porro! Ipsa dolores quia, delectus labore!</p>
          <p>At similique minima placeat magni molestias sunt deleniti repudiandae voluptatibus magnam quam esse reprehenderit dolor enim qui sed alias, laboriosam quaerat laborum iure repellat praesentium pariatur dolorum possimus veniam! Consectetur.</p>
          <p>Sunt, sed, magnam! Qui, suscipit. Beatae cum ullam necessitatibus eligendi, culpa rem excepturi consequatur quidem totam eum voluptates nihil, enim pariatur incidunt corporis sed facere magni earum tenetur rerum ea.</p>
          <p>Veniam nulla quis molestias voluptatem inventore consectetur iusto voluptatibus perferendis quisquam, cupiditate voluptates, tenetur vero magnam nisi animi praesentium atque adipisci optio quod aliquid vel delectus ad? Dicta deleniti, recusandae.</p>
        </f7-block>
      </f7-tab>
    </f7-tabs>
  </f7-page>
</template>
<script>

  export default {
    data() {
      return {
        tabs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        isBottom: true,
      };
    }
  }
</script>
