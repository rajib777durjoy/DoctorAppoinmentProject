import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hook/useAuth';
import axiosSecure from '../../../Hook/axiosSecure';
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

const Report = () => {
    const { user } = useAuth();
    const AxiosSequre = axiosSecure();
    const [Report, setReport] = useState([]);
    useEffect(() => {
        AxiosSequre.get(`/view_report/${user?.email}`)
            .then(res => {
                console.log('', res.data);
                setReport(res.data);
            })
    }, [user?.email])
    const handleDetailsReport = (id) => {
        console.log('id::', id)
    }
    return (
        <div className="w-[100%] min-h-screen bg-white p-6 md:py-12 font-sans">

            {Report.length === 0 ? (
                <div className="text-gray-500 text-lg">No reports available at the moment.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Report.map((item, ind) => (
                        <motion.div
                            key={ind}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: ind * 0.1 }}
                            className="border border-yellow-300 rounded-xl shadow-md p-6 bg-yellow-50"
                        >
                            <h2 className="text-xl capitalize font-semibold text-yellow-700 mb-2">{item?.name || 'Durjoy'}</h2>
                            <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {item?.email}</p>
                            <p className="text-sm text-gray-600 mb-2"><strong>Date:</strong> {item?.date}</p>
                            <hr className="border-yellow-200 my-3" />
                            <p className="text-gray-700 text-sm h-[180px] my-4 ">{item?.healthInfo?.slice(0, 300)}...</p>
                            <Link to={`/dashboard/reportDetails/${item?._id}`}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="mt-4 px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    View Full Report
                                </motion.button>
                            </Link>

                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Report;