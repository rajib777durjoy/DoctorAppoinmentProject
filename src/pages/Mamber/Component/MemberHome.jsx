import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaUserMd, FaCalendarCheck, FaMoneyCheckAlt } from 'react-icons/fa';
import useAuth from '../../../Hook/useAuth';
import axiosSecure from '../../../Hook/axiosSecure';
import { useNavigate } from 'react-router-dom';

const MemberHome = () => {
    const {user}=useAuth();
    const AxiosSequer= axiosSecure();
    const GoBookpage= useNavigate()

 const {data:MyBookingInfo=[]}=useQuery({
    queryKey:['mybooking',user?.email],
    queryFn:async()=>{
        console.log('dashboard email::',user?.email)
        const res= await AxiosSequer.get(`/mybookingInfo/${user?.email}`);
        return res?.data
    }
 })

 const totalAmount= MyBookingInfo.reduce((preview,current)=>{
     let value= parseInt(current.amount)
     return value + value
 },0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Welcome Section */}
        <div className="mb-10 bg-white p-6 rounded-2xl shadow-md border border-blue-100">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            👋 Welcome Back, {user?.displayName}!
          </h1>
          <p className="text-gray-600 text-sm">
            Here's a quick overview of your activity and actions you can take.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border-l-4 border-blue-500">
            <div className="flex items-center gap-4">
              <FaUserMd className="text-blue-500 text-3xl" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Doctors Visited</h3>
                <p className="text-gray-500 text-sm">Total: {MyBookingInfo.length}</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border-l-4 border-blue-500">
            <div className="flex items-center gap-4">
              <FaCalendarCheck className="text-blue-500 text-3xl" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Appointments</h3>
                <p className="text-gray-500 text-sm">
                  Total Appointment: {MyBookingInfo.length}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border-l-4 border-blue-500">
            <div className="flex items-center gap-4">
              <FaMoneyCheckAlt className="text-blue-500 text-3xl" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Total Paid</h3>
                <p className="text-gray-500 text-sm">${totalAmount}</p>
              </div>
            </div>
          </div>

        </div>

        {/* CTA Section */}
        <div className="bg-white p-8 rounded-2xl text-center shadow-md border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            🩺 Book Your Next Appointment
          </h2>
          <p className="text-gray-600 mb-6">
            Find doctors and schedule your visit in just a few clicks.
          </p>

          <button
            onClick={() => GoBookpage('/alldoctor')}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-md"
          >
            Book Appointment
          </button>
        </div>

      </div>
    </div>
  );
};

export default MemberHome;
