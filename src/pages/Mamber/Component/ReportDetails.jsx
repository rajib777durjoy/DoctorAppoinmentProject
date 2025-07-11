import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosSecure from '../../../Hook/axiosSecure';
import { motion } from 'framer-motion';

const ReportDetails = () => {
  const { id } = useParams();
  const [ReportData, setReportData] = useState({});
  const AxiosSequer = axiosSecure();

  useEffect(() => {
    AxiosSequer.get(`/report_Details/${id}`)
      .then(res => {
        setReportData(res.data);
      });
  }, [id]);

  const { name, email, data, healthInfo } = ReportData || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md border border-yellow-300"
    >
      <h1 className="text-3xl font-bold text-yellow-600 text-center mb-6">Health Report Details</h1>

      {/* User Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-700 font-semibold">Patient Name:</p>
          <p className="text-yellow-700">{name}</p>
        </div>
        <div>
          <p className="text-gray-700 font-semibold">Email:</p>
          <p className="text-yellow-700">{email}</p>
        </div>
        <div>
          <p className="text-gray-700 font-semibold">Report Date:</p>
          <p className="text-yellow-700">{data}</p>
        </div>
      </div>

      {/* Health Info */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-yellow-600 mb-2">Health Information</h2>
        {healthInfo}
      </div>

      {/* Footer / Action */}
      {/* <div className="text-center mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Download PDF
        </motion.button>
      </div> */}
    </motion.div>
  );
};

export default ReportDetails;
