import React from 'react';
import { App, View, Page, Navbar, BlockTitle, Swiper, SwiperSlide, Block } from 'framework7-react';
import './swiper.css';

export default () => (
  <App>
    <View main>
      <Page>
        <Navbar title="Swiper" />
        <BlockTitle>Minimal Layout</BlockTitle>
        <Swiper>
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>

        <BlockTitle>With all controls</BlockTitle>
        <Swiper pagination navigation scrollbar>
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>

        <BlockTitle>With additional parameters</BlockTitle>
        <Swiper navigation speed={500} slidesPerView={3} spaceBetween={20}>
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
        </Swiper>

        <Block />
      </Page>
    </View>
  </App>
);
