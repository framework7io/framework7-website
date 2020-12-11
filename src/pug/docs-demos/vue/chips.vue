<template>
  <f7-app>
    <f7-view main>
      <f7-page>
        <f7-navbar title="Chips"></f7-navbar>

        <f7-block-title>Chips With Text</f7-block-title>
        <f7-block strong>
          <f7-chip text="Example Chip"></f7-chip>
          <f7-chip text="Another Chip"></f7-chip>
          <f7-chip text="One More Chip"></f7-chip>
          <f7-chip text="Fourth Chip"></f7-chip>
          <f7-chip text="Last One"></f7-chip>
        </f7-block>

        <f7-block-title>Outline Chips</f7-block-title>
        <f7-block strong>
          <f7-chip outline text="Example Chip"></f7-chip>
          <f7-chip outline text="Another Chip"></f7-chip>
          <f7-chip outline text="One More Chip"></f7-chip>
          <f7-chip outline text="Fourth Chip"></f7-chip>
          <f7-chip outline text="Last One"></f7-chip>
        </f7-block>

        <f7-block-title>Icon Chips</f7-block-title>
        <f7-block strong>
          <f7-chip text="Add Contact" media-bg-color="blue">
            <template #media>
              <f7-icon ios="f7:plus_circle" aurora="f7:plus_circle" md="material:add_circle"></f7-icon>
            </template>
          </f7-chip>
          <f7-chip text="London" media-bg-color="green">
            <template #media>
              <f7-icon ios="f7:compass" aurora="f7:compass" md="material:location_on"></f7-icon>
            </template>
          </f7-chip>
          <f7-chip text="John Doe" media-bg-color="red">
            <template #media>
              <f7-icon ios="f7:person" aurora="f7:person" md="material:person"></f7-icon>
            </template>
          </f7-chip>
        </f7-block>

        <f7-block-title>Contact Chips</f7-block-title>
        <f7-block strong>
          <f7-chip text="Jane Doe">
            <template #media>
              <img src="https://cdn.framework7.io/placeholder/people-100x100-9.jpg"/>
            </template>
          </f7-chip>
          <f7-chip text="John Doe">
            <template #media>
              <img src="https://cdn.framework7.io/placeholder/people-100x100-3.jpg"/>
            </template>
          </f7-chip>
          <f7-chip text="Adam Smith">
            <template #media>
              <img src="https://cdn.framework7.io/placeholder/people-100x100-7.jpg"/>
            </template>
          </f7-chip>
          <f7-chip text="Jennifer" media-bg-color="pink" media="J"></f7-chip>
          <f7-chip text="Chris" media-bg-color="yellow" media-text-color="black" media="C"></f7-chip>
          <f7-chip text="Kate" media-bg-color="red" media="K"></f7-chip>
        </f7-block>

        <f7-block-title>Deletable Chips / Tags</f7-block-title>
        <f7-block strong>
          <f7-chip text="Example Chip" deleteable @click="deleteChip"></f7-chip>
          <f7-chip text="Chris" media="C" media-bg-color="orange" text-color="black" deleteable @click="deleteChip"></f7-chip>
          <f7-chip text="Jane Doe" deleteable @click="deleteChip">
            <template #media>
              <img src="https://cdn.framework7.io/placeholder/people-100x100-9.jpg"/>
            </template>
          </f7-chip>
          <f7-chip text="One More Chip" deleteable @click="deleteChip"></f7-chip>
          <f7-chip text="Jennifer" media-bg-color="pink" media="J" deleteable @click="deleteChip"></f7-chip>
          <f7-chip text="Adam Smith" deleteable @click="deleteChip">
            <template #media>
              <img src="https://cdn.framework7.io/placeholder/people-100x100-7.jpg"/>
            </template>
          </f7-chip>
        </f7-block>

        <f7-block-title>Color Chips</f7-block-title>
        <f7-block strong>
          <f7-chip text="Red Chip" color="red"></f7-chip>
          <f7-chip text="Green Chip" color="green"></f7-chip>
          <f7-chip text="Blue Chip" color="blue"></f7-chip>
          <f7-chip text="Orange Chip" color="orange"></f7-chip>
          <f7-chip text="Pink Chip" color="pink"></f7-chip>
          <f7-chip outline text="Red Chip" color="red"></f7-chip>
          <f7-chip outline text="Green Chip" color="green"></f7-chip>
          <f7-chip outline text="Blue Chip" color="blue"></f7-chip>
          <f7-chip outline text="Orange Chip" color="orange"></f7-chip>
          <f7-chip outline text="Pink Chip" color="pink"></f7-chip>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-app>
</template>

<script>
import { f7 } from 'framework7-vue';

export default {
  methods: {
    deleteChip(e) {
      const target = e.target;
      f7.dialog.confirm('Do you want to delete this tiny demo Chip?', () => {
        f7.$(target).parents('.chip').remove();
      });
    },
  },
}
</script>
