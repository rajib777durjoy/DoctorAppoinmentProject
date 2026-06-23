import React, { useEffect, useState } from 'react';
import axiosSecure from '../../../Hook/axiosSecure';
import useAuth from '../../../Hook/useAuth';
import {
  FaStethoscope,
  FaEnvelope,
  FaRegCalendarAlt,
  FaMoneyCheckAlt,
} from 'react-icons/fa';

const Myappoinment = () => {
  const AxiosSecure = axiosSecure();
  const { user } = useAuth();
  const [appoinmentData, setAppoinmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    AxiosSecure(`/doctor/appointment_List/${user?.email}`)
      .then(res => setAppoinmentData(res.data))
      .finally(() => setLoading(false));
  }, [user?.email]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-12 px-4">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-10">

        <h1 className="text-4xl font-extrabold text-gray-800">
          My Appointments
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all your patient consultations in one place
        </p>

      </div>

      {/* EMPTY / LOADING */}
      {loading ? (
        <p className="text-center text-gray-500">Loading appointments...</p>
      ) : appoinmentData.length === 0 ? (
        <p className="text-center text-gray-500">
          No appointments found
        </p>
      ) : (

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {appoinmentData.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
            >

              {/* TOP HEADER BAR */}
              <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>

              <div className="p-6">

                {/* DOCTOR NAME */}
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <FaStethoscope className="text-blue-600" />
                  {item?.Doctor_info?.name}
                </h2>

                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <FaEnvelope className="text-blue-500" />
                  {item?.Doctor_info?.email}
                </p>

                {/* INFO GRID */}
                <div className="mt-5 space-y-3 text-sm">

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Fee</span>
                    <span className="font-semibold text-blue-600 flex items-center gap-1">
                      <FaMoneyCheckAlt />
                      ${item?.amount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium flex items-center gap-1">
                      <FaRegCalendarAlt />
                      {item?.appointmentDay}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Register No</span>
                    <span className="font-medium">
                      {item?.Doctor_info?.Register}
                    </span>
                  </div>

                </div>

                {/* ACTION */}
                <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition">
                  👨‍⚕️ Join Consultation
                </button>

              </div>

            </div>
          ))}

        </div>

      )}

    </section>
  );
};

export default Myappoinment;