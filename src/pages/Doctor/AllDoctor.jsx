import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; 
import { Link } from 'react-router-dom';
import AxiosPublic from '../../Hook/AxosPublic';

const AllDoctor = () => {
  const axiospublic = AxiosPublic();
  const [doctors, setdoctor] = useState([]);

  useEffect(() => {
    axiospublic.get('/doctor/alldoctor').then(res => {
      setdoctor(res?.data);
    });
  }, []);

  return (
   <div className="w-full min-h-screen py-16 bg-white">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto mb-12 px-4">
        <h1 className="text-5xl font-extrabold text-yellow-500 text-center">
          Our Expert Doctors
        </h1>
        <p className="text-center text-gray-600 mt-3 max-w-xl mx-auto">
          Meet our qualified medical professionals dedicated to providing you the best healthcare services.
        </p>
      </div>

      {/* Doctor Cards Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {doctors?.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-yellow-300 flex flex-col items-center p-6 transition-transform duration-300 hover:scale-[1.03]"
            >
              {/* Profile Image */}
              <figure className="relative w-32 h-32 mb-4">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="rounded-full w-full h-full object-cover border-4 border-yellow-400"
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
                {item?.description?.slice(0, 90)}...
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
    </div>
  );
};

export default AllDoctor;
