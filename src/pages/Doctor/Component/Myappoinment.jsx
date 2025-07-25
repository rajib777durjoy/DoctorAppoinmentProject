import React, { useEffect, useState } from 'react';
import axiosSecure from '../../../Hook/axiosSecure';
import useAuth from '../../../Hook/useAuth';
import {
    FaStethoscope,
    FaEnvelope,
    FaRegCalendarAlt,
    FaMoneyCheckAlt,
    FaClipboardList,
} from 'react-icons/fa';
const Myappoinment = () => {
    const AxiosSecure = axiosSecure();
    const [appoinmentData, setAppoinmentData] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user?.email) {
            AxiosSecure.get(`/doctor/appointment_List/${user?.email}`).then((res) => {
                setAppoinmentData(res.data);
            });
        }
    }, [AxiosSecure, user?.email]);
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <h1 className="text-3xl font-bold text-center text-amber-600 mb-8">
                🗓️ My Appointments
            </h1>

            {appoinmentData.length === 0 ? (
                <div className="text-center text-gray-500 text-lg">No appointments found.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {appoinmentData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md border border-yellow-300 hover:shadow-xl p-6 flex flex-col justify-between transition-transform hover:scale-[1.02]"
                        >
                            <div>
                                <h2 className="text-xl font-semibold capitalize text-yellow-600 mb-1 flex items-center gap-2">
                                    <FaStethoscope className="text-yellow-500 " /> {item?.Doctor_info?.name}
                                </h2>
                                <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                                    <FaEnvelope className="text-yellow-500" /> {item?.Doctor_info?.email}
                                </p>

                                <div className="space-y-2 text-sm text-gray-700 mt-4">
                                    <div className="flex items-center gap-2">
                                        <FaMoneyCheckAlt className="text-yellow-600" />
                                        <span><strong>Doctor Fee:</strong> ${item?.amount}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaRegCalendarAlt className="text-yellow-600" />
                                        <span><strong>Date:</strong> {item?.appointmentDay}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaClipboardList className="text-yellow-600" />
                                        <span><strong>Register No:</strong> {item?.Doctor_info?.Register}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-full shadow-md transition">
                                    👨‍⚕️ Meet Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Myappoinment;