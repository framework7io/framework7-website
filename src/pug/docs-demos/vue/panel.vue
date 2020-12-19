<template>
  <f7-app>
    <!-- Left resizable Panel with Reveal effect -->
    <f7-panel left reveal resizable>
      <f7-view>
        <f7-page>
          <f7-block>Left panel content</f7-block>
        </f7-page>
      </f7-view>
    </f7-panel>

    <!-- Right resizable Panel with Cover effect and dark layout theme -->
    <f7-panel right resizable theme-dark>
      <f7-view>
        <f7-page>
          <f7-block>Right panel content</f7-block>
        </f7-page>
      </f7-view>
    </f7-panel>

    <f7-view main>
      <f7-page>
        <f7-navbar title="Panel"></f7-navbar>

        <f7-panel id="panel-nested" theme-dark left cover container-el="#panel-page">
          <f7-page>
            <f7-block strong>
              <p>This is page-nested Panel.</p>
              <p>
                <f7-link panel-close>Close me</f7-link>
              </p>
            </f7-block>
          </f7-page>
        </f7-panel>

        <f7-block>
          <f7-row tag="p">
            <f7-col tag="span">
              <f7-button raised fill panel-open="left"> Open left panel </f7-button>
            </f7-col>
            <f7-col tag="span">
              <f7-button raised fill panel-open="right"> Open right panel </f7-button>
            </f7-col>
          </f7-row>
          <f7-row tag="p">
            <f7-col tag="span">
              <f7-button raised fill panel-open="#panel-nested"> Open nested panel </f7-button>
            </f7-col>
          </f7-row>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-app>
</template>
<style>
/* Limit resizable panel width */
.panel {
  min-width: 100px;
  max-width: 90vw;
}
</style>
