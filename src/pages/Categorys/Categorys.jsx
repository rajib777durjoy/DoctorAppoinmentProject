import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosPublic from '../../Hook/AxosPublic';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Categorys = () => {
    const { category } = useParams();
    const axiosPublic = AxiosPublic();
    const [categorys, setCategory] = useState([])

    console.log(category)
    useEffect(() => {
        const categoryfun = async () => {
            const res = await axiosPublic.get(`/categroy/query?name=${category}`)
            console.log(res.data)
            setCategory(res.data)
        }
        categoryfun()
    }, [category])


    return (
        <div>
            <div className="w-[90%] mx-auto my-10">
                <h1 className="text-3xl font-bold mb-6 text-yellow-600"> Doctors by Category</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                   {categorys?.map(item=><motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white border border-yellow-200 rounded-xl shadow-sm hover:shadow-md transition duration-300 flex flex-col"
                    >
                        {/* Doctor Image */}
                        <figure className="w-full h-60 overflow-hidden rounded-t-xl">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        </figure>

                        {/* Doctor Info */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-1">
                                    {item.name}
                                </h2>
                                <p className="text-sm text-gray-500 mb-2">{item.email}</p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium text-gray-700">Specialist: </span>
                                    {item.Category}
                                </p>
                                <p className="text-sm text-gray-600 mb-2">
                                    <span className="font-medium text-gray-700">Fee: </span>৳{item.fee}
                                </p>
                                <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                            </div>

                            {/* Skills, Days, Status */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                                    {item.status === 'Inprogres' ? 'Active' : item.status}
                                </span>
                                {item.skill.map((s, i) => (
                                    <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                        {s}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-2 flex flex-wrap gap-1">
                                {item.day.map((day, idx) => (
                                    <span key={idx} className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                                        {day}
                                    </span>
                                ))}
                            </div>

                            {/* View Button */}
                            <div className="mt-4">
                                <Link to={`/doctorDetails/${item._id}`}>
                                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-lg transition">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>) }
                </div>
            </div>
        </div>
    );
};

export default Categorys;