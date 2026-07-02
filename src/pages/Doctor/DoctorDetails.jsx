import React, { useContext } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import AxiosPublic from '../../Hook/AxosPublic';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaUserMd, FaMoneyBillWave, FaRegClock } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import useAuth from '../../Hook/useAuth';
import axiosSecure from '../../Hook/axiosSecure';
import Swal from 'sweetalert2';

const DoctorDetails = () => {
  const { id } = useParams();
  const axiospublic = AxiosPublic();
  const AxiosSecure = axiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const active = true;

  const { data: doctor = {} } = useQuery({
    queryKey: ['doctor', id],
    queryFn: async () => {
      const res = await axiospublic.get(`/doctor/details/${id}`);
      return res.data;
    },
  });

  const handleDoctorBooking = async (id) => { // doctor id 
    const data = {
      doctor_id: id,
      doctorName: doctor?.name,
      doctorFee: doctor?.fee,
    }
    const res = await AxiosSecure.post(`/doctor_book/${user?.email}`, data)
    if (res.data?.insertedId) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: res.data?.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
    else {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: res.data?.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
  
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8 sm:py-12">

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

        {/* LEFT - DOCTOR PROFILE */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-blue-100 overflow-hidden"
        >
          <img
            src={doctor?.image}
            className="w-full h-56 sm:h-64 md:h-72 object-cover"
            alt="doctor"
          />

          <div className="p-4 sm:p-6">

            <div className="flex items-center gap-2 text-blue-600">
              <FaUserMd />
              <span className="font-semibold">Doctor Profile</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">
              {doctor?.name}
            </h2>

            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              {doctor?.description}
            </p>

            <div className="mt-5 space-y-2 text-sm text-gray-600">

              <p>📌 Registration: <b>{doctor?.Register}</b></p>
              <p>📧 Email: <b className="break-all">{doctor?.email}</b></p>
              <p>🩺 Category: <b>{doctor?.Category}</b></p>

              <div className="flex items-center gap-2">
                <FaMoneyBillWave className="text-blue-600" />
                <span>Fee: <b>${doctor?.fee}</b></span>
              </div>

              <div className="flex items-center gap-2">
                <FaRegClock className="text-blue-600" />
                <span>
                  Time: <b>{doctor?.StartTime} - {doctor?.endTime}</b>
                </span>
              </div>

            </div>

            {active ? (
              <button className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition shadow-md">
                <FiUploadCloud className="text-lg" />
                Upload Necessary Documents
              </button>
            ) : (
              <p className="mt-6 text-red-500 text-center text-sm">
                Doctor is currently not available
              </p>
            )}

          </div>
        </motion.div>

        {/* RIGHT SIDE - DOCUMENTS + SUMMARY */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-6"
        >

          {/* DOCUMENTS */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-blue-100 p-4 sm:p-6">

            <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-4">
              Patient Documents
            </h3>

            <div className="grid sm:grid-cols-2 gap-3 text-sm">

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                📄 Prescription.pdf
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                🧪 Blood_Report.pdf
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                🩻 X-Ray_Image.png
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                📊 Lab_Result.pdf
              </div>

            </div>

          </div>

          {/* BOOKING SUMMARY CARD */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-blue-100 p-5 sm:p-6">

            <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-3">
              Appointment Summary
            </h3>

            <p className="text-sm text-gray-500">
              You can book an appointment with Dr. {doctor?.name}.
              Please ensure all required documents are uploaded before booking.
            </p>
            {active && <button onClick={() => handleDoctorBooking(doctor._id)} className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition shadow-md">
               Booking
            </button> || <p className="mt-6 text-red-500 text-center text-sm">
                Doctor is currently not available
              </p>
            }


          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default DoctorDetails;
