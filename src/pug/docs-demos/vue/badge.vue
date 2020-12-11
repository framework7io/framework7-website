<template>
  <f7-app>
    <f7-view main>
      <f7-page>
        <f7-navbar sliding title="Badge">
          <f7-nav-right>
            <f7-link icon-only>
              <f7-icon ios="f7:person_circle_fill" aurora="f7:person_circle_fill" md="material:person">
                <f7-badge color="red">5</f7-badge>
              </f7-icon>
            </f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-toolbar tabbar labels bottom>
          <f7-link tab-link="#tab-1" tab-link-active>
            <f7-icon ios="f7:envelope_fill" aurora="f7:envelope_fill" md="material:email">
              <f7-badge color="green">5</f7-badge>
            </f7-icon>
            <span class="tabbar-label">Inbox</span>
          </f7-link>
          <f7-link tab-link="#tab-2">
            <f7-icon ios="f7:calendar_fill" aurora="f7:calendar_fill" md="material:today">
              <f7-badge color="red">7</f7-badge>
            </f7-icon>
            <span class="tabbar-label">Calendar</span>
          </f7-link>
          <f7-link tab-link="#tab-3">
            <f7-icon ios="f7:cloud_upload_fill" aurora="f7:cloud_upload_fill" md="material:file_upload">
              <f7-badge color="red">1</f7-badge>
            </f7-icon>
            <span class="tabbar-label">Upload</span>
          </f7-link>
        </f7-toolbar>

        <f7-list>
          <f7-list-item title="Foo Bar" badge="0"></f7-list-item>
          <f7-list-item title="Ivan Petrov" badge="CEO" badge-color="blue"></f7-list-item>
          <f7-list-item title="John Doe" badge="5" badge-color="green"></f7-list-item>
          <f7-list-item title="Jane Doe" badge="NEW" badge-color="orange"></f7-list-item>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-app>
</template>
