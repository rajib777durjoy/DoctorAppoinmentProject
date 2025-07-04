import React, { useEffect, useState } from 'react';
import { motion } from "motion/react";
import AxiosPublic from '../../Hook/AxosPublic';
import { Link } from 'react-router-dom';

const Category = () => {
    const Axiospublic = AxiosPublic();
    const [category, setCategory] = useState([]);

    useEffect(() => {
        Axiospublic('/category')
            .then(res => {
                setCategory(res.data);
            })
            .catch(error => {
                console.log('error', error);
            });
    }, []);

    const handlebyCategory = (category) => {
        console.log('category:::', category)
    }
    return (
        <div className="max-w-7xl mx-auto my-16 px-4">
            <h1 className="text-4xl font-extrabold text-yellow-600 text-center mb-12">Categories</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {category.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-lg shadow-lg border border-yellow-200 hover:shadow-xl transition-transform hover:scale-[1.03] p-6 flex flex-col justify-between"
                    >
                        <h2 className="text-xl font-semibold text-yellow-700 mb-4 text-center capitalize">{item?.category}</h2>
                        <p className="text-gray-700 text-sm flex-grow text-center mb-6">
                            {/* Placeholder text can be replaced with real category description */}
                            Explore a wide range of expert services in this category tailored for your needs.
                        </p>
                        {/* <Link to={`/categoryDetails/${item?.category}`}><button onClick={()=>handlebyCategory(item?.category)} className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-full shadow-md hover:shadow-lg transition">
                            View More
                        </button></Link> */}
                        <button onClick={() => handlebyCategory(item?.category)} className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-full shadow-md hover:shadow-lg transition">
                            <Link to={`/categoryDetails/${item?.category}`}> View More</Link>

                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Category;
