import React, { useEffect, useState } from 'react';
import axiosSecure from '../../../Hook/axiosSecure';
import useAuth from '../../../Hook/useAuth';

const MemberPaymentList = () => {
  const AxiosSecure = axiosSecure();
  const { user } = useAuth();
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    if (user?.email) {
      AxiosSecure.get(`/member_payment_list/${user.email}`).then((res) => {
        setPaymentData(res?.data || []);
      });
    }
  }, [AxiosSecure, user?.email]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-600 mb-6 text-center">
          💳 Payment History
        </h1>

        {paymentData.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">No payments found.</div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
            <table className="min-w-full table-auto">
              <thead className="bg-yellow-100 text-yellow-800 text-sm uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4 text-left">#</th>
                  <th className="px-6 py-4 text-left">Payment ID</th>
                  <th className="px-6 py-4 text-left">Doctor Name</th>
                  <th className="px-6 py-4 text-left">Amount</th>
                  <th className="px-6 py-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
                {paymentData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-yellow-50 transition duration-200 ease-in-out"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 break-all">{item?.paymentIntentId}</td>
                    <td className="px-6 py-4">{item?.Doctor_info?.name}</td>
                    <td className="px-6 py-4 font-medium text-green-600">${item?.amount}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                        Paid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberPaymentList;
