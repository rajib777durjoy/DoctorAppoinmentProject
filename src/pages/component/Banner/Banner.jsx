import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../index.css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import bannerimg from '/close-up-medical-team-ready-work.jpg';
import bannerimg2 from '/doctor-nurses-special-equipment.jpg';
import bannerimg3 from '/portrait-hardworking-female-doctors.jpg';
import bannerimg4 from '/team-young-specialist-doctors-standing-corridor-hospital.jpg';
const Banner = () => {

  return (
    <div className='w-[100%] min-h-[500px] mb-2 rounded-md'>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="swiper rounded-md"
      >
        <SwiperSlide className='swiper-slide rounded-md'><img src={bannerimg} alt="" className='swiper-slide img  rounded-md' /></SwiperSlide>
        <SwiperSlide className='swiper-slide rounded-md'><img src={bannerimg2} alt="" className='swiper-slide img rounded-md' /></SwiperSlide>
        <SwiperSlide className='swiper-slide rounded-md'><img src={bannerimg3} alt="" className='swiper-slide img rounded-md' /></SwiperSlide>
        <SwiperSlide className='swiper-slide rounded-md'><img src={bannerimg4} alt="" className='swiper-slide img rounded-md' /></SwiperSlide>

      </Swiper>
    </div>
  );
};

export default Banner;