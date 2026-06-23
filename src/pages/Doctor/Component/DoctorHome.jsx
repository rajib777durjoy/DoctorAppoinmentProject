import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import axiosSecure from '../../../Hook/axiosSecure';
import useAuth from '../../../Hook/useAuth';
import { useNavigate } from 'react-router-dom';

const DoctorHome = () => {
  const AxiosSecure = axiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: payment_info = [] } = useQuery({
    queryKey: ['patients', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosSecure(`/pasent_details_info/${user?.email}`);
      return res.data;
    }
  });

  const { data: totalAmountData = {} } = useQuery({
    queryKey: ['doctor_amount', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosSecure(`/single_doctor_amount/${user?.email}`);
      return res.data;
    }
  });

  const { data: docInfo = {} } = useQuery({
    queryKey: ['doctor_info', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosSecure(`/doctor/information/${user?.email}`);
      return res.data;
    }
  });

  const { Category, PatientLimit, skill = [] } = docInfo;

  const data = [
    { name: 'Earnings', value: totalAmountData?.totalAmount || 0 },
    { name: 'Capacity', value: PatientLimit || 0 },
  ];

  const COLORS = ['#2563eb', '#60a5fa'];

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8 bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl p-6 shadow-sm">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold text-blue-700">
              Welcome, Dr. {user?.displayName}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              {Category} • {skill.join(', ')}
            </p>
          </div>

          <button
            onClick={() => navigate('/profile_page')}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-xl shadow-md"
          >
            Manage Profile
          </button>

        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

          <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition border-l-4 border-blue-500">
            <p className="text-gray-500 text-sm">Total Earnings</p>
            <h2 className="text-2xl font-bold text-blue-600 mt-1">
              ৳ {totalAmountData?.totalAmount || 0}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition border-l-4 border-green-500">
            <p className="text-gray-500 text-sm">Patient Limit</p>
            <h2 className="text-2xl font-bold text-green-600 mt-1">
              {PatientLimit || 0}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition border-l-4 border-indigo-500">
            <p className="text-gray-500 text-sm">Total Patients</p>
            <h2 className="text-2xl font-bold text-indigo-600 mt-1">
              {payment_info.length}
            </h2>
          </div>

        </div>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* CHART */}
        <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6 flex flex-col items-center hover:shadow-lg transition">

          <h3 className="text-lg font-semibold text-blue-700 mb-4">
            Earnings vs Capacity
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={data} dataKey="value" outerRadius={90}>
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

        </div>

        {/* TABLE */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-blue-100 p-6">

          <h3 className="text-lg font-semibold text-blue-700 mb-4">
            Recent Patients
          </h3>

          <div className="overflow-x-auto rounded-xl">

            <table className="w-full text-sm">

              <thead className="bg-blue-50 text-blue-700">
                <tr>
                  <th className="p-3 text-left">Patient</th>
                  <th className="p-3 text-left">Appointment</th>
                  <th className="p-3 text-left">Payment</th>
                </tr>
              </thead>

              <tbody>
                {payment_info.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b hover:bg-blue-50 transition"
                  >
                    <td className="p-3 font-medium text-gray-800">
                      {item.appliedName}
                    </td>
                    <td className="p-3 text-gray-600">
                      {item.appointmentDay}
                    </td>
                    <td className="p-3 text-blue-600 font-bold">
                      ৳ {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>

      </div>

    </section>
  );
};

export default DoctorHome;