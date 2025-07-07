
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
      if(!user?.email){
        return ;
      }
        const res= await AxiosSequer.get(`/mybookingInfo/${user?.email}`);
        console.log(res.data)
        return res.data
    }
 })
 console.log(MyBookingInfo.length)
 const totalAmount= MyBookingInfo.reduce((preview,current)=>{
     let value= parseInt(current.amount)
     return value + value
 },0)
 console.log('totalAmount:::',totalAmount)
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-yellow-600 mb-2">👋 Welcome Back, Member!</h1>
          <p className="text-gray-600 text-sm">Here's a quick overview of your activity and actions you can take.</p>
        </div>

        {/* Dashboard Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border border-yellow-200 p-6 rounded-xl shadow hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <FaUserMd className="text-yellow-500 text-3xl" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Doctors Visited</h3>
                <p className="text-gray-500 text-sm">Total: {MyBookingInfo.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-yellow-200 p-6 rounded-xl shadow hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <FaCalendarCheck className="text-yellow-500 text-3xl" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Appointments</h3>
                <p className="text-gray-500 text-sm">Total Appointment:{MyBookingInfo.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-yellow-200 p-6 rounded-xl shadow hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <FaMoneyCheckAlt className="text-yellow-500 text-3xl" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Total Paid</h3>
                <p className="text-gray-500 text-sm">${totalAmount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-yellow-100 p-6 rounded-lg text-center border border-yellow-300">
          <h2 className="text-2xl font-bold text-yellow-700 mb-2">🩺 Need to book a new appointment?</h2>
          <p className="text-gray-700 mb-4">Browse our doctor list and schedule your next visit in minutes.</p>
          <button onClick={()=>GoBookpage('/alldoctor')} className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberHome;
