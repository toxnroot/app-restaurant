"use client";
import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import './slider.css'

// Import required modules
import { Navigation } from 'swiper/modules';
import CardView from '../card-view/cardView';

export default function Slider() {
  const swiperRef = useRef(null); // استخدمنا useRef للحصول على مرجع للـ Swiper
  useEffect(() => {
    // تأكد من تحديث Swiper عند تحميل الصفحة أو عند العودة إليها
    if (swiperRef.current) {
      swiperRef.current.swiper.update(); // تحديث الـ Swiper
    }
  }, []); // سيعمل فقط مرة واحدة عند التحميل الأول

  return (
    <>
      <Swiper
        ref={swiperRef}  // مرجع الـ Swiper
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className='swp-cus-2'>
          <CardView key="1" id="1" product="كريب شيتوس" price='70' image="crepe.jpeg"/>
        </SwiperSlide>
        <SwiperSlide className='swp-cus-2'>
          <CardView key="2" id="2" product="كريب كازابلانكا" price='85' image="crepe.jpeg"/>
        </SwiperSlide>
        <SwiperSlide className='swp-cus-2'>
          <CardView key="3" id="3" product="كريب مشكل فراخ" price='90' image="crepe.jpeg"/>
        </SwiperSlide>
        <SwiperSlide className='swp-cus-2'>
          <CardView key="4" id="4" product="كريب مشكل " price='90' image={null} ingredients="It seems like I can’t generate any more images right now. Please try again later."/>
        </SwiperSlide>
        <SwiperSlide className='swp-cus-2'>
          <CardView key="5" id="5" product="كريب زنجر " price='90' image={null} ingredients="It seems like I can’t generate any more images right now. Please try again later."/>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
