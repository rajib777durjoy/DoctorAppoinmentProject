import React, { useEffect, useState } from 'react';
import axiosSecure from '../../../Hook/axiosSecure';
import useAuth from '../../../Hook/useAuth';
import { FaMoneyBillWave } from "react-icons/fa";

const DcBalance = () => {
  const AxiosSecure = axiosSecure();
  const { user } = useAuth();
  const [balanceData, setBalanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    AxiosSecure.get(`/detailsBalance/${user.email}`)
      .then(res => setBalanceData(res.data))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const totalIncome = balanceData.reduce(
    (sum, item) => sum + (item?.pasentList?.amount || 0),
    0
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 p-6">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-8">

        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaMoneyBillWave className="text-blue-600" />
          My Earnings
        </h1>

        <p className="text-gray-500 mt-1">
          Track all your consultation payments and income history
        </p>

        {/* SUMMARY CARD */}
        <div className="mt-5 bg-white border border-blue-100 shadow-sm rounded-2xl p-5">
          <p className="text-gray-500 text-sm">Total Earnings</p>
          <h2 className="text-3xl font-extrabold text-blue-600">
            ${totalIncome}
          </h2>
        </div>

      </div>

      {/* TABLE */}
      <div className="max-w-5xl mx-auto bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">

        {loading ? (
          <p className="p-6 text-gray-500">Loading earnings...</p>
        ) : balanceData.length === 0 ? (
          <p className="p-6 text-gray-500">No earnings found</p>
        ) : (

          <div className="overflow-x-auto">

            <table className="table w-full">

              <thead className="bg-blue-50 text-blue-700">
                <tr>
                  <th>#</th>
                  <th>Payment ID</th>
                  <th>Patient Name</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>

                {balanceData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50 transition"
                  >
                    <td>{index + 1}</td>
                    <td className="font-mono text-xs">
                      {item?.pasentList?.paymentIntentId}
                    </td>
                    <td className="font-medium">
                      {item?.pasentList?.appliedName}
                    </td>
                    <td className="text-blue-600 font-bold">
                      ${item?.pasentList?.amount}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </section>
  );
};

export default DcBalance;