import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion"; // Make sure it's 'framer-motion'
import { FaLongArrowAltRight } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full min-h-[600px] bg-white py-16">
      <Helmet>
        <title>Dr.Meet | About</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="rounded-lg overflow-hidden shadow-md"
        >
          <img
            src="/doctor-nurses-special-equipment.jpg"
            alt="Medical Team"
            className="w-full h-[450px] object-cover rounded-md"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-gray-700"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-500 mb-4">
            About Us
          </h1>
          <h2 className="text-lg font-semibold mb-4">
            Expert Treatment – Your Health, Our Priority!
          </h2>
          <p className="leading-relaxed text-base mb-6">
            At <span className="font-semibold text-yellow-600">Dr.Meet</span>, we are committed to providing top-quality healthcare with a patient-first approach. Our expert team of doctors and medical professionals offer a wide range of treatments tailored to meet your specific health needs.
            Whether you need routine check-ups, specialized care, or advanced medical procedures, we ensure that you receive the best possible treatment in a comfortable and caring environment.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-full shadow-md transition duration-300"
          >
            Read More <FaLongArrowAltRight className="text-lg" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
