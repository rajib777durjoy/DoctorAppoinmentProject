import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AxiosPublic from '../../Hook/AxosPublic';
import { motion } from 'framer-motion';

const Categorys = () => {
  const { category } = useParams();
  const axiosPublic = AxiosPublic();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await axiosPublic.get(`/categroy/query?name=${category}`);
      setDoctors(res.data);
    };
    fetchDoctors();
  }, [category]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-14 px-4">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">
          {category} Specialists
        </h1>
        <p className="text-gray-500 mt-2">
          Find and book the best doctors in this category
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {doctors?.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden hover:-translate-y-1"
          >

            {/* IMAGE */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />

              {/* STATUS BADGE */}
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                  item.status === 'done'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {item.status === 'done' ? 'Available' : 'Pending'}
                </span>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-5">

              <h2 className="text-xl font-bold text-gray-800">
                Dr. {item.name}
              </h2>

              <p className="text-sm text-gray-500">{item.email}</p>

              <div className="mt-2 text-sm text-gray-600">
                <p>
                  <span className="font-semibold">Specialist:</span> {item.Category}
                </p>
                <p>
                  <span className="font-semibold">Fee:</span> ৳{item.fee}
                </p>
              </div>

              {/* SKILLS */}
              <div className="flex flex-wrap gap-2 mt-3">
                {item.skill?.map((s, i) => (
                  <span
                    key={i}
                    className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* DAYS */}
              <div className="flex flex-wrap gap-2 mt-2">
                {item.day?.map((d, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* BUTTON */}
              <Link to={`/doctorDetails/${item._id}`}>
                <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
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

export default Categorys;