import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AxiosPublic from '../../Hook/AxosPublic';
import { FaUserMd } from "react-icons/fa";

const AllDoctor = () => {
  const axiospublic = AxiosPublic();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axiospublic.get('/doctor/alldoctor')
      .then(res => setDoctors(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-20">

      {/* HERO */}
      <div className="text-center max-w-3xl mx-auto px-4 mb-14">

        <FaUserMd className="text-blue-600 text-4xl mx-auto mb-3" />

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Our Expert Doctors
        </h1>

        <p className="text-gray-500 mt-3">
          Meet our highly qualified medical professionals dedicated to providing world-class healthcare services.
        </p>

      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {doctors?.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden"
          >

            {/* TOP GRADIENT HEADER */}
            <div className="h-20 bg-gradient-to-r from-blue-600 to-blue-800"></div>

            {/* PROFILE IMAGE */}
            <div className="flex justify-center -mt-10">
              <img
                src={item?.image}
                alt={item?.name}
                className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5 text-center">

              <h2 className="text-lg font-bold text-gray-800">
                {item?.name}
              </h2>

              {/* CATEGORY */}
              {item?.Category && (
                <span className="inline-block mt-2 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {item?.Category}
                </span>
              )}

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-500 mt-3 line-clamp-3">
                {item?.description?.slice(0, 90)}...
              </p>

              {/* BUTTON */}
              <Link to={`/doctorDetails/${item?._id}`}>
                <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-full transition shadow-md">
                  View Profile
                </button>
              </Link>

            </div>

          </motion.div>
        ))}

      </div>

    </section>
  );
};

export default AllDoctor;
