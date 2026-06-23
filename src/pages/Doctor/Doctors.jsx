import React, { useEffect, useState } from 'react';
import AxiosPublic from '../../Hook/AxosPublic';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { FaUserMd, FaStethoscope } from "react-icons/fa";

const Doctors = () => {
  const [doctor, setDoctor] = useState([]);
  const axiospublic = AxiosPublic();

  useEffect(() => {
    axiospublic.get('/doctorlist')
      .then(res => setDoctor(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-20">

      {/* HEADER */}
      <div className="text-center mb-14 px-4">
        <FaUserMd className="text-blue-600 text-4xl mx-auto mb-3" />

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Our Expert Doctors
        </h1>

        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Meet our experienced medical professionals dedicated to providing the best healthcare service.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {doctor?.map((item, index) => (
          <motion.div
            key={item._id || index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden"
          >

            {/* TOP GRADIENT */}
            <div className="h-20 bg-gradient-to-r from-blue-500 to-blue-700"></div>

            {/* IMAGE */}
            <div className="flex justify-center -mt-10">
              <div className="relative">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                />

                {/* online status */}
                <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-5 text-center">

              <h2 className="text-lg font-bold text-gray-800">
                {item?.name}
              </h2>

              {/* SPECIALIZATION */}
              {item?.Category && (
                <div className="flex items-center justify-center gap-1 mt-2">
                  <FaStethoscope className="text-blue-500 text-sm" />
                  <span className="text-sm text-blue-600 font-medium">
                    {item?.Category}
                  </span>
                </div>
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

export default Doctors;
