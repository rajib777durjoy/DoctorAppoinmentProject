import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AxiosPublic from '../../Hook/AxosPublic';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

const DoctorDetails = () => {
  const { id } = useParams();
  const axiospublic = AxiosPublic();
  const [AppoimentDay, setAppoimentDay] = useState([]);
  const [ActiveBtn,SetActiveBtn]=useState('')

  const { data: doctors = {}, isLoading } = useQuery({
    queryKey: [id, 'doctorlist'],
    queryFn: async () => {
      const res = await axiospublic.get(`/doctor/details/${id}`);
      return res.data;
    },
  });

  // Generate time slots function (keep as is)
  function generateTimeSlots(startTime, endTime, slotMinutes = 30) {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const slots = [];
    let current = new Date();
    current.setHours(startHour, startMinute, 0, 0);
    const end = new Date();
    end.setHours(endHour, endMinute, 0, 0);

    while (current < end) {
      const slotStart = new Date(current);
      current.setMinutes(current.getMinutes() + slotMinutes);
      const slotEnd = new Date(current);

      slots.push({
        from: slotStart.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
        to: slotEnd.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      });
    }
    return slots;
  }

  const slots = generateTimeSlots(doctors?.StartTime ?? "10:00", doctors?.endTime ?? "13:00");

  console.log(slots[0])

  return (
    <div className="max-w-7xl mx-auto my-16 px-4">
      <h1 className="text-4xl font-extrabold text-yellow-600 text-center mb-10">Doctor Details</h1>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Section - Image + Description */}
        <div className="md:w-1/2 rounded-lg shadow-lg overflow-hidden border border-yellow-300">
          <img
            src={doctors?.image}
            alt={`Dr. ${doctors?.name}`}
            className="w-full h-96 object-cover"
          />
          <div className="p-6 bg-yellow-50">
            <h2 className="text-xl font-semibold text-yellow-700 mb-3 text-center">Description</h2>
            <p className="text-gray-700 leading-relaxed">{doctors?.description}</p>
          </div>
        </div>

        {/* Right Section - Info + Time Slots + Button */}
        <div className="md:w-1/2 flex flex-col bg-white border border-yellow-300 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-yellow-600 mb-3">Dr. {doctors?.name}</h2>

          <div className="mb-6 space-y-2 text-gray-700">
            <p><span className="font-semibold">Registration No:</span> {doctors?.Register}</p>
            <p><span className="font-semibold">Email:</span> {doctors?.email}</p>
            <p><span className="font-semibold">Category:</span> {doctors?.Category}</p>
            <p><span className="font-semibold">Consultation Fee:</span> <span className="text-yellow-600 font-bold">${doctors?.fee}</span></p>
            <p><span className="font-semibold">Patient Limit Per Day:</span> {doctors?.PatientLimit}</p>
            <p><span className="font-semibold">Working Hours:</span> {doctors?.StartTime} - {doctors?.endTime}</p>
          </div>

          <hr className="border-yellow-300 mb-6" />

          <h3 className="text-xl font-semibold text-yellow-600 mb-4">Available Appointment Slots</h3>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {slots.map((slot, idx) => (
              <button
                key={idx}
                onClick={()=> {
                  setAppoimentDay([`${slot.from} - ${slot.to}`, doctors?.fee, id])
                 
                  SetActiveBtn(`${slot.to}`)
                  console.log("AppoimentDay",ActiveBtn)
                }}
                className={`${ActiveBtn == slot.to ? 'bg-yellow-300' :'bg-yellow-100'} py-2 px-4 rounded-lg border border-yellow-400 text-yellow-700 font-semibold  hover:text-black transition`}
              >
                {slot.from} - {slot.to}
              </button>
            ))}
          </div>

          <Link to={`/payment/${AppoimentDay}`}>
            <button
              disabled={AppoimentDay.length === 0}
              className={`w-full py-3 rounded-lg font-bold transition ${
                AppoimentDay.length === 0
                  ? 'bg-yellow-200 text-yellow-500 cursor-not-allowed'
                  : 'bg-yellow-400 hover:bg-yellow-500 text-white'
              }`}
            >
              Book Appointment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
