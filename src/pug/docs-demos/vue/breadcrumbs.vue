<template>
  <f7-app>
    <f7-view main>
      <f7-page>
        <f7-navbar title="Breadcrumbs"></f7-navbar>

        <f7-block-title>Basic</f7-block-title>
        <f7-block strong>
          <f7-breadcrumbs>
            <f7-breadcrumbs-item>
              <f7-link>Home</f7-link>
            </f7-breadcrumbs-item>
            <f7-breadcrumbs-separator />
            <f7-breadcrumbs-item>
              <f7-link>Catalog</f7-link>
            </f7-breadcrumbs-item>
            <f7-breadcrumbs-separator />
            <f7-breadcrumbs-item active>Phones</f7-breadcrumbs-item>
          </f7-breadcrumbs>
        </f7-block>

        <f7-block-title>Scrollable</f7-block-title>
        <f7-block-header
          >Breadcrumbs will be scrollable if they don't fit the screen</f7-block-header
        >
        <f7-block strong>
          <f7-breadcrumbs>
            <f7-breadcrumbs-item>
              <f7-link>Home</f7-link>
            </f7-breadcrumbs-item>
            <f7-breadcrumbs-separator />
            <f7-breadcrumbs-item>
              <f7-link>Catalog</f7-link>
            </f7-breadcrumbs-item>
            <f7-breadcrumbs-separator />
            <f7-breadcrumbs-item>
              <f7-link>Phones</f7-link>
            </f7-breadcrumbs-item>
            <f7-breadcrumbs-separator />
            <f7-breadcrumbs-item>
              <f7-link>Apple</f7-link>
            </f7-breadcrumbs-item>
            <f7-breadcrumbs-separator />
            <f7-breadcrumbs-item active>iPhone 12</f7-breadcrumbs-item>
          </f7-breadcrumbs>
        </f7-block>

        <f7-block-title>Collapsed</f7-block-title>
        <f7-block strong>
          <f7-breadcrumbs>
            <f7-breadcrumbs-item>
              <f7-link>Home</f7-link>
            </f7-breadcrumbs-item>
            <f7-breadcrumbs-separator />
            <f7-breadcrumbs-collapsed class="popover-open" data-popover=".breadcrumbs-popover">
              <f7-popover class="breadcrumbs-popover" style="width: 120px">
                <f7-list>
                  <f7-list-item link title="Catalog" popover-close />
                  <f7-list-item link title="Phones" popover-close />
                  <f7-list-item link title="Apple" popover-close />
                </f7-list>
              </f7-popover>
            </f7-breadcrumbs-collapsed>
            <f7-breadcrumbs-separator />
            <f7-breadcrumbs-item active>iPhone 12</f7-breadcrumbs-item>
          </f7-breadcrumbs>
        </f7-block>

        <f7-block-title>With Icons</f7-block-title>
        <f7-block strong>
          <f7-breadcrumbs>
            <f7-breadcrumbs-item>
              <f7-link icon-ios="f7:house_fill" icon-md="material:home" text="Home" />
            </f7-breadcrumbs-item>
            <f7-breadcrumbs-separator />
            <f7-breadcrumbs-item>
              <f7-link icon-ios="f7:square_list_fill" icon-md="material:list_alt" text="Catalog" />
            </f7-breadcrumbs-item>
            <f7-breadcrumbs-separator />
            <f7-breadcrumbs-item>
              <f7-link
                icon-ios="f7:device_phone_portrait"
                icon-md="material:smartphone"
                text="Phones"
              />
            </f7-breadcrumbs-item>
            <f7-breadcrumbs-separator />
            <f7-breadcrumbs-item>
              <f7-link icon-f7="logo_apple" text="Apple" />
            </f7-breadcrumbs-item>
            <f7-breadcrumbs-separator />
            <f7-breadcrumbs-item active>iPhone 12</f7-breadcrumbs-item>
          </f7-breadcrumbs>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-app>
</template>
