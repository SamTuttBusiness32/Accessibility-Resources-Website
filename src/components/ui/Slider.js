import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const Slider = ({ children, ...props }) => (
  <Swiper threshold={5} {...props}>
    {children.length ? (
      <>
        {children.map((child, id) => (
          <SwiperSlide key={id}>{child}</SwiperSlide>
        ))}
      </>
    ) : (
      <>
        <SwiperSlide>{children}</SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </>
    )}
  </Swiper>
);
