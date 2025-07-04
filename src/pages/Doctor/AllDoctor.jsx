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
      {/* Heading */}
      <div className="max-w-5xl mx-auto mb-12 px-4">
        <h1 className="text-5xl font-extrabold text-yellow-500 text-center">
          Our Expert Doctors
        </h1>
        <p className="text-center text-gray-600 mt-3 max-w-xl mx-auto">
          Meet our qualified medical professionals dedicated to providing you the best healthcare services.
        </p>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-10">
        {/* Doctors Grid */}
        <div className="md:flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {doctors?.map(item => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col"
            >
              <figure className="overflow-hidden rounded-t-xl h-48">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </figure>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-1 text-yellow-600">{item?.name}</h2>
                <p className="text-gray-700 mb-1"><span className="font-semibold">Email:</span> {item?.email}</p>
                <p className="text-gray-700 mb-4"><span className="font-semibold">Category:</span> {item?.Category}</p>
                <div className="mt-auto">
                  <Link to={`/doctorDetails/${item?._id}`}>
                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-lg font-semibold shadow-md transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar Suggest Section */}
        {/* <aside className="hidden md:block w-80 border border-yellow-300 rounded-xl p-6 shadow-md bg-yellow-50">
          <h3 className="text-xl font-bold text-yellow-600 mb-4 text-center">Suggestions</h3>
          <ul className="space-y-3 text-gray-700">
            <li>📌 Check doctor ratings and reviews</li>
            <li>📌 Book appointments online</li>
            <li>📌 Consult specialists in your area</li>
            <li>📌 Read health tips and articles</li>
            <li>📌 Access your medical records securely</li>
          </ul>
        </aside> */}
      </div>
    </div>
  );
};

export default AllDoctor;
