import React, { useEffect, useState } from 'react';
import AxiosPublic from '../../Hook/AxosPublic';
import { motion } from "motion/react";
import { Link } from 'react-router-dom';

const Doctors = () => {
  const [doctor, setdoctor] = useState([]);
  const axiospublic = AxiosPublic();

  useEffect(() => {
    axiospublic.get('/doctorlist')
      .then(res => {
        setdoctor(res.data);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-16 px-4">
      <h1 className="text-4xl font-extrabold text-yellow-600 text-center mb-12">Our Expert Doctors</h1>
      
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {doctor?.map((item, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-yellow-300 flex flex-col items-center p-6 transition-transform duration-300 hover:scale-105"
    >
      {/* Profile Image */}
      <figure className="relative w-32 h-32 mb-4">
        <img
          src={item?.image}
          alt={item?.name}
          className="rounded-full w-full h-full object-fill border-4 border-yellow-400"
        />
        <span className="absolute bottom-0 right-0 bg-green-500 border-white border-2 w-4 h-4 rounded-full"></span>
      </figure>

      {/* Name */}
      <h2 className="text-xl font-bold text-gray-800 text-center mb-1">{item?.name}</h2>

      {/* Specialization or Category */}
      {item?.Category && (
        <p className="text-sm text-yellow-600 font-medium bg-yellow-100 px-3 py-1 rounded-full mb-2">
          {item?.Category}
        </p>
      )}

      {/* Short Description */}
      <p className="text-gray-600 text-sm text-center mb-4 line-clamp-3 h-[72px]">
        {item?.description?.slice(0, 100)}...
      </p>

      {/* Action Button */}
      <Link to={`/doctorDetails/${item?._id}`} className="w-full">
        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-full transition duration-200 shadow-sm hover:shadow-lg">
          View Profile
        </button>
      </Link>
    </motion.div>
  ))}
</div>

    </div>
  );
};

export default Doctors;
