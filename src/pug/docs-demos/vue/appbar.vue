<template>
  <f7-app>
    <f7-appbar>
      <div class="left">
        <f7-button small panel-toggle="left" class="display-flex" icon-f7="bars"></f7-button>
        <f7-button small class="display-flex margin-left-half" icon-f7="square_list"></f7-button>
        <f7-button
          small
          class="display-flex margin-left-half"
          icon-f7="arrowshape_turn_up_left_fill"
        ></f7-button>
      </div>
      <div class="right">
        <f7-searchbar inline custom-search :disable-button="false"></f7-searchbar>
      </div>
    </f7-appbar>
    <f7-panel left>
      <f7-block>
        <p>Panel left content</p>
      </f7-block>
    </f7-panel>
    <f7-view main>
      <f7-page>
        <f7-navbar title="Appbar"></f7-navbar>
        <f7-block strong>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed sagittis dui.
            Fusce nulla massa, scelerisque vitae auctor in, luctus in ipsum. Sed eu lectus vel magna
            malesuada lacinia. Ut at vestibulum sem. In semper, arcu pulvinar volutpat fermentum,
            felis magna fringilla felis, nec volutpat nisi nunc quis ante. Fusce elementum egestas
            tortor ut porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia Curae; Duis id commodo elit. Sed massa dui, laoreet a orci sed, egestas
            vehicula tellus. Nulla pulvinar ornare justo sed finibus. Aliquam hendrerit dui at nulla
            eleifend, quis feugiat enim aliquam. Nulla facilisi. Orci varius natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus.
          </p>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-app>
</template>
