import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hook/useAuth';
import axiosSecure from '../../../Hook/axiosSecure';

const PaymentDetails = () => {
  const { user } = useAuth();
  const AxiosSecqure = axiosSecure();
  const [PaymentDetails, setPaymentDetails] = useState([]);

  useEffect(() => {
    if (user?.email) {
      AxiosSecqure.get(`/per_doctor/balancelis/${user.email}`)
        .then((res) => {
          console.log('Payment Data:', res.data);
          setPaymentDetails(res.data);
        })
        .catch((error) => {
          console.error('Error fetching payment data:', error);
        });
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <h2 className="text-3xl font-bold text-yellow-600 mb-8 text-center">
        💳 Payment Transaction Details
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-yellow-100 text-yellow-800">
            <tr>
              <th className="px-6 py-3 text-center font-semibold uppercase">#</th>
              <th className="px-6 py-3 text-center font-semibold uppercase">Name</th>
              <th className="px-6 py-3 text-center font-semibold uppercase">Email</th>
              <th className="px-6 py-3 text-center font-semibold uppercase">Payment ID</th>
              <th className="px-6 py-3 text-center font-semibold uppercase">Amount ($)</th>
              <th className="px-6 py-3 text-center font-semibold uppercase">Doctor ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {PaymentDetails?.map((item, index) => (
              <tr key={item._id} className="hover:bg-yellow-50 transition">
                <td className="px-6 py-3 text-center font-medium">{index + 1}</td>
                <td className="px-6 py-3 text-center">{item.appliedName}</td>
                <td className="px-6 py-3 text-center">{item.appliedEmail}</td>
                <td className="px-6 py-3 text-center">{item.paymentIntentId}</td>
                <td className="px-6 py-3 text-center font-semibold text-green-600">
                  ${item.amount}
                </td>
                <td className="px-6 py-3 text-center text-gray-500">{item.doctor_id}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {PaymentDetails.length === 0 && (
          <div className="p-6 text-center text-gray-500 font-medium">
            No payment records found.
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;
