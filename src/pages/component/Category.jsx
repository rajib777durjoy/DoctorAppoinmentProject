import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import AxiosPublic from '../../Hook/AxosPublic';
import { Link } from 'react-router-dom';
import { FaLayerGroup } from "react-icons/fa";

const Category = () => {
  const Axiospublic = AxiosPublic();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    Axiospublic('/category')
      .then(res => setCategory(res.data))
      .catch(err => console.log(err));
  }, []);

  const handlebyCategory = (cat) => {
    console.log('category:::', cat);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-20">

      {/* HEADER */}
      <div className="text-center mb-14 px-4">
        <div className="flex justify-center mb-3">
          <FaLayerGroup className="text-blue-600 text-4xl" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Explore Categories
        </h1>

        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Find specialized healthcare services organized by category. Choose what suits your needs best.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {category?.map((item, index) => (
          <motion.div
            key={item._id || index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-xl transition p-6 flex flex-col justify-between"
          >

            {/* ICON CIRCLE */}
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition">
              <FaLayerGroup className="text-blue-600 group-hover:text-white transition" />
            </div>

            {/* TITLE */}
            <h2 className="text-lg font-bold text-center capitalize text-gray-800">
              {item?.category}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-500 text-center mt-3 flex-grow">
              Explore professional healthcare services in this category tailored for your needs.
            </p>

            {/* BUTTON */}
            <Link
              to={`/categoryDetails/${item?.category}`}
              onClick={() => handlebyCategory(item?.category)}
              className="mt-6 block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-full transition shadow-md"
            >
              View Details
            </Link>

          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default Category;
