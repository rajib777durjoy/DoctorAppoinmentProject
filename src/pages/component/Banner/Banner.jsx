import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
    buttonText: "Book Appointment",
    buttonLink: "/dashboard/memberHome"
  },
  {
    img: bannerimg2,
    title: "Advanced Medical Technology",
    subtitle: "State-of-the-art tools for accurate diagnosis and treatment.",
    buttonText: "Explore Services",
    buttonLink: "/services"
  },
  {
    img: bannerimg3,
    title: "Expert Healthcare Team",
    subtitle: "Experienced doctors dedicated to your wellbeing.",
    buttonText: "Meet Doctors",
    buttonLink: "/doctors"
  },
  {
    img: bannerimg4,
    title: "Care You Can Trust",
    subtitle: "Providing safe, reliable and patient-first healthcare.",
    buttonText: "Contact Us",
    buttonLink: "/contact"
  },
];

const Banner = () => {
  return (
    <section className="max-w-7xl mx-auto mt-10 px-4">

      <div className="rounded-3xl overflow-hidden shadow-2xl border border-blue-100">

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-[520px]"
        >

          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="relative">

              {/* IMAGE */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-[520px] object-cover"
              />

              {/* BLUE OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/40 to-transparent"></div>

              {/* CONTENT CARD */}
              <div className="absolute inset-0 flex items-center">

                <div className="max-w-xl ml-10 md:ml-20">

                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg">

                    <p className="text-blue-200 uppercase tracking-wider text-sm font-semibold">
                      Dr.Meet Healthcare
                    </p>

                    <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mt-2">
                      {slide.title}
                    </h2>

                    <p className="text-blue-100 mt-4 text-sm md:text-base">
                      {slide.subtitle}
                    </p>

                    <a
                      href={slide.buttonLink}
                      className="inline-block mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
                    >
                      {slide.buttonText}
                    </a>

                  </div>

                </div>

              </div>

            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
