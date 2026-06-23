import React, { useEffect, useState } from 'react';
import axiosSecure from '../../../Hook/axiosSecure';
import useAuth from '../../../Hook/useAuth';
import { FaUsers } from 'react-icons/fa';
import { FaHandHoldingDollar, FaUserDoctor } from "react-icons/fa6";

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AdminHome = () => {
    const AxiosSecqure = axiosSecure();
    const [datas, setData] = useState([]);
    const [totalDoctor, setTotalDoctor] = useState(0);
    const [totalUser, setTotaluser] = useState(0);
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [doctor_list, setDoctor_list] = useState([]);
    const [doctorDetails, setDoctorDetails] = useState({});
    const { user } = useAuth();

    useEffect(() => {
        AxiosSecqure.get(`/totalPayment/totalDoctor/${user?.email}`)
            .then(res => {
                setData(res.data[0]["totalPayment"]);
                setTotalDoctor(res.data[1]);
                setTotaluser(res.data[2]);
                setDoctor_list(res.data[3]);

                if (res?.data) {
                    AxiosSecqure.get(`/per_doctor/balancelis/${user?.email}`)
                        .then(ress => {
                            setPaymentDetails(ress.data);
                        });
                }
            });
    }, [user]);

    const data = [
        { name: 'Doctors', value: totalDoctor },
        { name: 'Users', value: totalUser },
    ];

    const COLORS = ['#2563eb', '#60a5fa'];

    const dataT = paymentDetails.map(item => ({
        name: item?.appliedName,
        uv: Number(item?.amount)
    }));

    const handleMoreDetails = async (id) => {
        const res = await AxiosSecqure.get(`/doctor/pacentDetails/${id}`);
        setDoctorDetails(res.data);
        document.getElementById('my_modal_5').showModal();
    };

    const { name, email, image, Register, fee, Category, description } = doctorDetails || {};

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">

            {/* TOP STATS */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 border-l-4 border-blue-500 flex items-center gap-4">
                    <FaUsers className="text-4xl text-blue-500" />
                    <div>
                        <p className="text-gray-500 text-sm">Total Users</p>
                        <h2 className="text-2xl font-bold text-blue-600">{totalUser}</h2>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 border-l-4 border-indigo-500 flex items-center gap-4">
                    <FaUserDoctor className="text-4xl text-indigo-500" />
                    <div>
                        <p className="text-gray-500 text-sm">Total Doctors</p>
                        <h2 className="text-2xl font-bold text-indigo-600">{totalDoctor}</h2>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 border-l-4 border-emerald-500 flex items-center gap-4">
                    <FaHandHoldingDollar className="text-4xl text-emerald-500" />
                    <div>
                        <p className="text-gray-500 text-sm">Total Balance</p>
                        <h2 className="text-2xl font-bold text-emerald-600">{datas}</h2>
                    </div>
                </div>

            </div>

            {/* CHARTS */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

                {/* PIE */}
                <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">Users vs Doctors</h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={data} dataKey="value" outerRadius={100}>
                                {data.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* AREA */}
                <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">Payments Overview</h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={dataT}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#2563eb" fill="#93c5fd" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

            </div>

            {/* TABLE */}
            <div className="max-w-7xl mx-auto mt-10 bg-white rounded-2xl shadow border border-blue-100 p-6">

                <h3 className="text-lg font-semibold text-blue-700 mb-4">Doctors List</h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">

                        <thead className="bg-blue-50 text-blue-700">
                            <tr>
                                <th className="p-3 text-left">#</th>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Category</th>
                                <th className="p-3 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {doctor_list?.map((item, index) => (
                                <tr key={index} className="border-b hover:bg-blue-50 transition">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3 font-medium">{item.name}</td>
                                    <td className="p-3 text-gray-600">{item.email}</td>
                                    <td className="p-3">{item.Category}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleMoreDetails(item?._id)}
                                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs"
                                        >
                                            More
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

            {/* MODAL */}
            <dialog id="my_modal_5" className="modal">
                <div className="modal-box max-w-4xl bg-white rounded-2xl p-6">

                    <form method="dialog">
                        <button className="btn btn-sm btn-circle absolute right-3 top-3">✕</button>
                    </form>

                    <div className="grid md:grid-cols-2 gap-6 items-center">

                        <div className="flex justify-center">
                            <img
                                src={image}
                                className="w-52 h-52 rounded-full object-cover border-4 border-blue-400"
                            />
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-blue-700">{name}</h2>
                            <p className="text-gray-600">{Category}</p>

                            <div className="mt-4 text-sm space-y-2">
                                <p><b>Email:</b> {email}</p>
                                <p><b>Fee:</b> ${fee}</p>
                                <p><b>Register:</b> {Register}</p>
                            </div>

                            <p className="mt-4 text-gray-600 text-sm border-t pt-3">
                                {description}
                            </p>
                        </div>

                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default AdminHome;