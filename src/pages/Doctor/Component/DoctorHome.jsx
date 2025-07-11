
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import axiosSecure from '../../../Hook/axiosSecure';
import useAuth from '../../../Hook/useAuth';
import { useNavigate } from 'react-router-dom';

const DoctorHome = () => {
  // Example static data
  const AxiosSecure= axiosSecure()
  const NavigateProfile =useNavigate()
  const {user}=useAuth()
  console.log(user?.email)
  const {data:payment_info=[]}=useQuery({
    queryKey:['pasent',user],
    queryFn:async()=>{
      const res = await AxiosSecure(`/pasent_details_info/${user?.email}`);
      return res.data;
    }
  })
const { data: totalAmountData = {}, isLoading: isAmountLoading } = useQuery({
  queryKey: ['doctor_amount', user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const res = await AxiosSecure(`/single_doctor_amount/${user?.email}`);
    return res.data;
  }
});
  console.log('totalBalance::',totalAmountData)

  const {data:DocInfo=[]}=useQuery({
    queryKey:['user',user?.email],
    queryFn:async()=>{
    const res = await AxiosSecure(`/doctor/information/${user?.email}`)
    return res.data;

    }
  })

//  console.log('doctorInformation:::',DocInfo)
const {Category,pasents,PatientLimit,skill,role}=DocInfo;



  const data = [
    { name: 'Group A', value:totalAmountData.totalAmount},
    { name: 'Group B', value:PatientLimit },
  ];
  const COLORS = ['#0088FE', '#00C49F'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
console.log(payment_info);

// {
//     "_id": "682f3308c250423233c5520c",
//     "name": "Rahul Biswas",
//     "email": "rahul7773@gmail.com",
//     "image": "https://res.cloudinary.com/dwmkakht7/image/upload/v1751627983/wbz1690yj3bz2ogokoiv.jpg",
//     "fee": "500",
//     "Register": "343534525345",
//     "StartTime": "10:18",
//     "endTime": "17:00",
//     "Category": "cardiyology",
//     "description": "I am profession a MBBS",
//     "PatientLimit": 30,
//     "status": "done",
//     "day": [
//         "Sunday",
//         "Monday",
//         "Tueday"
//     ],
//     "skill": [
//         "MBBS"
//     ],
//     "role": "doctor",
//     "pasents": 1
// }


  return (<>
    
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Doctor Overview Dashboard</h2>
        <p className="text-sm text-gray-500">Summary of doctor performance and patient statistics</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="bg-white shadow-lg rounded-2xl p-4 col-span-1 flex flex-col items-center justify-center">
          <h3 className="text-xl font-medium text-gray-700 mb-4">Patient Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) =>(
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Doctor Info & Stats */}
        <div className="bg-white shadow-lg rounded-2xl p-6 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-2xl font-semibold text-gray-800">{user?.displayName} <span className='text-green-600 text-xs capitalize'>{role}</span></h4>
              <p className="text-sm text-gray-500">{Category} | {skill?.map(item=>(<div>{item}</div>))}</p>
            </div>
            <button onClick={()=>NavigateProfile('/profile_page')} className="bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded-xl">
              Manage Profile
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Payment</p>
              <h3 className="text-2xl font-bold text-blue-700">{totalAmountData?.totalAmount}</h3>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500"> Patients limit</p>
              <h3 className="text-2xl font-bold text-green-700">{PatientLimit}</h3>
            </div>
          </div>

          {/* Table */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Recent Patient Payments</h4>
            <div className="overflow-auto rounded-lg shadow-md">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-200 text-gray-600 text-sm">
                  <tr>
                    <th className="py-2 px-4 text-left">Patient Name</th>
                    <th className="py-2 px-4 text-left">Appointment Day</th>
                    <th className="py-2 px-4 text-left">Payment</th>
                    <th className="py-2 px-4 text-left">video</th>
                  </tr>
                </thead>
                <tbody>
                  {payment_info.map((item, index) => (
                <tr key={index} className="border-b text-sm">
                  <td className="py-2 px-4">{item.appliedName}</td>
                  <td className="py-2 px-4">{item.appointmentDay}</td>
                  <td className="py-2 px-4 text-green-700 font-medium">৳ {item.amount}</td>
                  <td>video</td>
                </tr>
              ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>
  );
};

export default DoctorHome;
