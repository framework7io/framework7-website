<template>
  <f7-app>
    <f7-view main>
      <f7-page class="grid-demo">
        <f7-navbar title="Grid / Layout"></f7-navbar>
        <f7-block>
          <p>Columns within a row are automatically set to have equal width. Otherwise you can define your column with pourcentage of screen you want.</p>
        </f7-block>
        <f7-block-title>Columns with gap</f7-block-title>
        <f7-block>
          <f7-row>
            <f7-col>50% (.col)</f7-col>
            <f7-col>50% (.col)</f7-col>
          </f7-row>
          <f7-row>
            <f7-col>25% (.col)</f7-col>
            <f7-col>25% (.col)</f7-col>
            <f7-col>25% (.col)</f7-col>
            <f7-col>25% (.col)</f7-col>
          </f7-row>
          <f7-row>
            <f7-col>33% (.col)</f7-col>
            <f7-col>33% (.col)</f7-col>
            <f7-col>33% (.col)</f7-col>
          </f7-row>
          <f7-row>
            <f7-col>20% (.col)</f7-col>
            <f7-col>20% (.col)</f7-col>
            <f7-col>20% (.col)</f7-col>
            <f7-col>20% (.col)</f7-col>
            <f7-col>20% (.col)</f7-col>
          </f7-row>
          <f7-row>
            <f7-col width="33">33% (.col-33)</f7-col>
            <f7-col width="66">66% (.col-66)</f7-col>
          </f7-row>
          <f7-row>
            <f7-col width="25">25% (.col-25)</f7-col>
            <f7-col width="25">25% (.col-25)</f7-col>
            <f7-col width="50">50% (.col-50)</f7-col>
          </f7-row>
          <f7-row>
            <f7-col width="75">75% (.col-75)</f7-col>
            <f7-col width="25">25% (.col-25)</f7-col>
          </f7-row>
          <f7-row>
            <f7-col width="80">80% (.col-80)</f7-col>
            <f7-col width="20">20% (.col-20)</f7-col>
          </f7-row>
        </f7-block>
        <f7-block-title>No gap between columns</f7-block-title>
        <f7-block>
          <f7-row no-gap>
            <f7-col>50% (.col)</f7-col>
            <f7-col>50% (.col)</f7-col>
          </f7-row>
          <f7-row no-gap>
            <f7-col>25% (.col)</f7-col>
            <f7-col>25% (.col)</f7-col>
            <f7-col>25% (.col)</f7-col>
            <f7-col>25% (.col)</f7-col>
          </f7-row>
          <f7-row no-gap>
            <f7-col>33% (.col)</f7-col>
            <f7-col>33% (.col)</f7-col>
            <f7-col>33% (.col)</f7-col>
          </f7-row>
          <f7-row no-gap>
            <f7-col>20% (.col)</f7-col>
            <f7-col>20% (.col)</f7-col>
            <f7-col>20% (.col)</f7-col>
            <f7-col>20% (.col)</f7-col>
            <f7-col>20% (.col)</f7-col>
          </f7-row>
          <f7-row no-gap>
            <f7-col width="33">33% (.col-33)</f7-col>
            <f7-col width="66">66% (.col-66)</f7-col>
          </f7-row>
          <f7-row no-gap>
            <f7-col width="25">25% (.col-25)</f7-col>
            <f7-col width="25">25% (.col-25)</f7-col>
            <f7-col width="50">50% (.col-50)</f7-col>
          </f7-row>
          <f7-row no-gap>
            <f7-col width="75">75% (.col-75)</f7-col>
            <f7-col width="25">25% (.col-25)</f7-col>
          </f7-row>
          <f7-row no-gap>
            <f7-col width="80">80% (.col-80)</f7-col>
            <f7-col width="20">20% (.col-20)</f7-col>
          </f7-row>
        </f7-block>

        <f7-block-title>Nested</f7-block-title>
        <f7-block>
          <f7-row>
            <f7-col>50% (.col)
              <f7-row>
                <f7-col>50% (.col)</f7-col>
                <f7-col>50% (.col)</f7-col>
              </f7-row>
            </f7-col>
            <f7-col>50% (.col)
              <f7-row>
                <f7-col width="33">33% (.col-33)</f7-col>
                <f7-col width="66">66% (.col-66)</f7-col>
              </f7-row>
            </f7-col>
          </f7-row>
        </f7-block>

        <f7-block-title>Responsive Grid</f7-block-title>
        <f7-block>
          <p>Grid cells have different size on Phone/Tablet</p>
          <f7-row>
            <f7-col width="100" medium="50">.col-100.medium-50</f7-col>
            <f7-col width="100" medium="50">.col-100.medium-50</f7-col>
          </f7-row>
          <f7-row>
            <f7-col width="50" medium="25">.col-50.medium-25</f7-col>
            <f7-col width="50" medium="25">.col-50.medium-25</f7-col>
            <f7-col width="50" medium="25">.col-50.medium-25</f7-col>
            <f7-col width="50" medium="25">.col-50.medium-25</f7-col>
          </f7-row>
          <f7-row>
            <f7-col width="100" medium="40">.col-100.medium-40</f7-col>
            <f7-col width="50" medium="60">.col-50.medium-60</f7-col>
            <f7-col width="50" medium="66">.col-50.medium-66</f7-col>
            <f7-col width="100" medium="33">.col-100.medium-33</f7-col>
          </f7-row>
        </f7-block>

        <f7-block-title>Resizable Cols</f7-block-title>
        <f7-block class="grid-resizable-demo">
          <f7-row>
            <f7-col resizable style="min-width: 20px">1</f7-col>
            <f7-col resizable style="min-width: 20px">2</f7-col>
            <f7-col resizable style="min-width: 20px">3</f7-col>
          </f7-row>
        </f7-block>

        <f7-block-title>Resizable Fixed Col</f7-block-title>
        <f7-block-header>2nd column has fixed size</f7-block-header>
        <f7-block class="grid-resizable-demo">
          <f7-row>
            <f7-col resizable style="min-width: 20px">1</f7-col>
            <f7-col resizable resizable-fixed style="min-width: 20px">2</f7-col>
            <f7-col resizable style="min-width: 20px">3</f7-col>
          </f7-row>
        </f7-block>

        <f7-block-title>Resizable Grid</f7-block-title>
        <f7-block class="grid-resizable-demo">
          <f7-row class="align-items-stretch" style="height: 300px">
            <f7-col resizable class="demo-col-center-content" style="min-width: 50px">Left</f7-col>
            <f7-col resizable class="display-flex flex-direction-column" style="padding: 0px; border: none; min-width: 50px; background-color: transparent">
              <f7-row resizable style="height: 50%; min-height: 50px">
                <f7-col class="demo-col-center-content" style="height: 100%">Center Top</f7-col>
              </f7-row>
              <f7-row resizable style="height: 50%; min-height: 50px">
                <f7-col class="demo-col-center-content" style="height: 100%">Center Bottom</f7-col>
              </f7-row>
            </f7-col>
            <f7-col resizable class="demo-col-center-content" style="min-width: 50px">Right</f7-col>
          </f7-row>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-app>
</template>
<style>
  .grid-demo div[class*="col"] {
    background: #fff;
    text-align: center;
    color: #000;
    border: 1px solid #ddd;
    padding: 5px;
    margin-bottom: 16px;
    font-size: 12px;
  }
  .grid-resizable-demo {
    --f7-grid-row-gap: 16px;
  }
  .grid-resizable-demo div[class*="col"] {
    margin-bottom: 0;
  }
  .grid-resizable-demo .demo-col-center-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
