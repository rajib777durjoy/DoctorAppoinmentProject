import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";
import { FaLongArrowAltRight, FaUserMd, FaHospital, FaShieldAlt } from "react-icons/fa";

const About = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-20">

      <Helmet>
        <title>About | Dr.Meet</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-blue-100">
            <img
              src="/doctor-nurses-special-equipment.jpg"
              alt="Medical Team"
              className="w-full h-[480px] object-cover"
            />
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-6 left-6 bg-white/80 backdrop-blur-md border border-blue-100 shadow-lg px-5 py-4 rounded-2xl flex items-center gap-3">
            <FaShieldAlt className="text-blue-600 text-xl" />
            <p className="text-sm font-semibold text-gray-700">
              Trusted Healthcare Platform
            </p>
          </div>
        </motion.div>

        {/* TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <p className="text-blue-600 font-semibold uppercase tracking-wider">
            About Dr.Meet
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mt-2">
            Modern Healthcare Built on Trust & Care
          </h1>

          <p className="text-gray-600 mt-5 leading-relaxed">
            At <span className="text-blue-600 font-semibold">Dr.Meet</span>,
            we combine advanced medical technology with compassionate care to deliver
            world-class healthcare services. Our goal is to make quality treatment
            accessible, safe, and patient-focused.
          </p>

          {/* FEATURE CARDS */}
          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm border border-blue-100 hover:shadow-md transition">
              <FaUserMd className="text-blue-600 text-xl" />
              <p className="text-gray-700 font-medium">
                Experienced & certified medical professionals
              </p>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm border border-blue-100 hover:shadow-md transition">
              <FaHospital className="text-blue-600 text-xl" />
              <p className="text-gray-700 font-medium">
                Advanced hospital-grade infrastructure
              </p>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm border border-blue-100 hover:shadow-md transition">
              <FaShieldAlt className="text-blue-600 text-xl" />
              <p className="text-gray-700 font-medium">
                Safe, secure & patient-first treatment system
              </p>
            </div>

          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-10 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-full shadow-lg transition"
          >
            Explore More <FaLongArrowAltRight />
          </motion.button>

        </motion.div>
      </div>
    </section>
  );
};

export default About;
