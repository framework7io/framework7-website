<template>
  <f7-app>
    <f7-view main>
      <f7-page>
        <f7-navbar title="Menu"></f7-navbar>

        <f7-block-title>Plain Links</f7-block-title>
        <f7-menu>
          <f7-menu-item href="#" text="Item 1"></f7-menu-item>
          <f7-menu-item href="#" text="Item 2"></f7-menu-item>
          <f7-menu-item href="#" icon-f7="pencil"></f7-menu-item>
          <f7-menu-item href="#" icon-f7="square_arrow_up"></f7-menu-item>
        </f7-menu>

        <f7-block-title>Dropdowns</f7-block-title>
        <f7-menu>
          <f7-menu-item text="Left" dropdown>
            <f7-menu-dropdown left>
              <f7-menu-dropdown-item href="#" text="Menu Item 1"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 2"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 3"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 4"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item divider></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 5"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 6"></f7-menu-dropdown-item>
            </f7-menu-dropdown>
          </f7-menu-item>

          <f7-menu-item text="Center" dropdown>
            <f7-menu-dropdown center content-height="200px">
              <f7-menu-dropdown-item href="#" text="Menu Item 1"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 2"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 3"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 4"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item divider></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 5"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 6"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 7"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item divider></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 8"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 9"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 10"></f7-menu-dropdown-item>
            </f7-menu-dropdown>
          </f7-menu-item>

          <f7-menu-item text="Right" dropdown>
            <f7-menu-dropdown right>
              <f7-menu-dropdown-item href="#" text="Menu Item 1"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 2"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 3"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 4"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item divider></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 5"></f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#" text="Menu Item 6"></f7-menu-dropdown-item>
            </f7-menu-dropdown>
          </f7-menu-item>

          <f7-menu-item style="margin-left: auto" icon-f7="square_arrow_up" dropdown>
            <f7-menu-dropdown right>
              <f7-menu-dropdown-item href="#">
                <span>Share on Facebook</span>
                <f7-icon class="margin-left" f7="logo_facebook"></f7-icon>
              </f7-menu-dropdown-item>
              <f7-menu-dropdown-item href="#">
                <span>Share on Twitter</span>
                <f7-icon class="margin-left" f7="logo_twitter"></f7-icon>
              </f7-menu-dropdown-item>
            </f7-menu-dropdown>
          </f7-menu-item>

          <f7-menu-item href="#" icon-f7="pencil"></f7-menu-item>
        </f7-menu>

      </f7-page>
    </f7-view>
  </f7-app>
</template>
