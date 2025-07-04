import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../index.css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import bannerimg from '/close-up-medical-team-ready-work.jpg';
import bannerimg2 from '/doctor-nurses-special-equipment.jpg';
import bannerimg3 from '/portrait-hardworking-female-doctors.jpg';
import bannerimg4 from '/team-young-specialist-doctors-standing-corridor-hospital.jpg';

const slides = [
  {
    img: bannerimg,
    title: "Committed to Your Health",
    subtitle: "Expert medical care with compassion and excellence.",
    buttonText: "Book an Appointment",
    buttonLink: "/appointment"
  },
  {
    img: bannerimg2,
    title: "Advanced Medical Equipment",
    subtitle: "State-of-the-art technology for accurate diagnosis.",
    buttonText: "Learn More",
    buttonLink: "/services"
  },
  {
    img: bannerimg3,
    title: "Dedicated Healthcare Professionals",
    subtitle: "Caring hands you can trust in every step.",
    buttonText: "Meet Our Team",
    buttonLink: "/doctors"
  },
  {
    img: bannerimg4,
    title: "Your Health, Our Priority",
    subtitle: "Providing quality care in a comfortable environment.",
    buttonText: "Contact Us",
    buttonLink: "/contact"
  },
];

const Banner = () => {
  return (
    <div className="w-full min-h-[500px] rounded-lg overflow-hidden shadow-lg relative max-w-7xl mx-auto mt-8">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[500px]"
      >
        {slides.map(({ img, title, subtitle, buttonText, buttonLink }, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src={img}
              alt={title}
              className="object-cover w-full h-[500px] brightness-75 transition-transform duration-700 hover:scale-105"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

            {/* Text content */}
            <div className="absolute bottom-16 left-10 max-w-lg text-white">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-lg">{title}</h2>
              <p className="text-sm md:text-lg mb-5 drop-shadow-md">{subtitle}</p>
              <a
                href={buttonLink}
                className="inline-block bg-amber-400 hover:bg-amber-500 text-black font-semibold px-6 py-3 rounded-md shadow-md transition"
              >
                {buttonText}
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
