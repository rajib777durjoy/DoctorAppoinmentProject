import React, { useEffect, useState } from 'react';
import axiosSecure from '../../../Hook/axiosSecure';
import useAuth from '../../../Hook/useAuth';
import {
  FaStethoscope,
  FaEnvelope,
  FaRegCalendarAlt,
  FaMoneyBillWave,
  FaIdCard
} from 'react-icons/fa';

const AppointmentList = () => {
  const AxiosSecure = axiosSecure();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user?.email) {
      AxiosSecure.get(`/appointmentlist/${user.email}`).then((res) => {
        setAppointments(res.data);
      });
    }
  }, [user?.email]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">
          My Appointments
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your booked consultations easily
        </p>
      </div>

      {/* EMPTY STATE */}
      {appointments.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No appointments found
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {appointments.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1 p-6 flex flex-col justify-between"
            >

              {/* TOP SECTION */}
              <div>

                <div className="flex items-center justify-between mb-3">

                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <FaStethoscope className="text-blue-600" />
                    Dr. {item?.Doctor_info?.name}
                  </h2>

                  <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    Confirmed
                  </span>

                </div>

                <p className="text-sm text-gray-500 flex items-center gap-2 mb-4">
                  <FaEnvelope className="text-blue-500" />
                  {item?.Doctor_info?.email}
                </p>

                <div className="space-y-2 text-sm text-gray-600">

                  <div className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-blue-500" />
                    <span>
                      <strong>Fee:</strong> ৳{item?.amount}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaRegCalendarAlt className="text-blue-500" />
                    <span>
                      <strong>Date:</strong> {item?.appointmentDay}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaIdCard className="text-blue-500" />
                    <span>
                      <strong>Reg No:</strong> {item?.Doctor_info?.Register}
                    </span>
                  </div>

                </div>
              </div>

              {/* ACTION */}
              <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition">
                👨‍⚕️ Join Consultation
              </button>

            </div>
          ))}

        </div>
      )}

    </section>
  );
};

export default AppointmentList;
