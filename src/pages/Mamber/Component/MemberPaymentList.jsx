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
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700">
            💳 Payment History
          </h1>
          <p className="text-gray-600 mt-2">
            All your medical payments in one place
          </p>
        </div>

        {/* EMPTY STATE */}
        {paymentData.length === 0 ? (
          <div className="text-center text-gray-500 text-lg bg-white p-10 rounded-2xl border border-blue-100 shadow">
            No payments found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-blue-100">

            <table className="min-w-full">

              {/* TABLE HEAD */}
              <thead className="bg-blue-100 text-blue-800 text-sm uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4 text-left">#</th>
                  <th className="px-6 py-4 text-left">Payment ID</th>
                  <th className="px-6 py-4 text-left">Doctor Name</th>
                  <th className="px-6 py-4 text-left">Amount</th>
                  <th className="px-6 py-4 text-left">Status</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody className="text-gray-700 text-sm divide-y divide-blue-50">

                {paymentData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50 transition"
                  >

                    {/* index */}
                    <td className="px-6 py-4 font-medium text-gray-600">
                      {index + 1}
                    </td>

                    {/* payment id */}
                    <td className="px-6 py-4 break-all text-xs text-gray-500">
                      {item?.paymentIntentId}
                    </td>

                    {/* doctor */}
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {item?.Doctor_info?.name}
                    </td>

                    {/* amount */}
                    <td className="px-6 py-4 font-bold text-blue-600">
                      ৳ {item?.amount}
                    </td>

                    {/* status */}
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
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
