"use client";
import React, { useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function AutoBanner() {
  useEffect(() => {
    // إعادة تحديث Swiper عند العودة للصفحة
    const handleResize = () => {
      const swipers = document.querySelectorAll('.my-swp');
      swipers.forEach(swiper => {
        if (swiper.swiper) swiper.swiper.update();
      });
    };

    // استدعاء handleResize عند تحميل الصفحة
    handleResize();

    // إضافة مستمع للتحديث عند تغيير الأبعاد
    window.addEventListener('resize', handleResize);
    
    // إزالة المستمع عند إلغاء التثبيت
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
<>
  <Swiper
    className="my-swp"
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 4500,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    navigation={{
      prevEl: '.custom-prev', // تعريف الزر السابق
      nextEl: '.custom-next', // تعريف الزر التالي
    }}
    modules={[Autoplay, Pagination, Navigation]}
  >
    <SwiperSlide className="my-custom-swp">
      <img className="swp-img" src="banner1.jpg" alt="Banner 1" />
    </SwiperSlide>
    <SwiperSlide className="my-custom-swp">
      <img className="swp-img" src="banner2.jpg" alt="Banner 2" />
    </SwiperSlide>
    <SwiperSlide className="my-custom-swp">
      <img className="swp-img" src="banner3.jpg" alt="Banner 3" />
    </SwiperSlide>
  </Swiper>

  {/* أزرار التنقل المخصصة */}
  <div className="custom-prev">←</div>
  <div className="custom-next">→</div>
</>

  );
}
