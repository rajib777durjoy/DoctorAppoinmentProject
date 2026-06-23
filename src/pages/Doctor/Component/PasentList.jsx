import React, { useEffect, useState } from 'react';
import axiosSecure from '../../../Hook/axiosSecure';
import useAuth from '../../../Hook/useAuth';

const PasentList = () => {
  const AxiosSecure = axiosSecure();
  const { user } = useAuth();
  const [pasentList, setPasentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    AxiosSecure.get(`/listfopasent/${user?.email}`)
      .then(res => setPasentList(res.data))
      .finally(() => setLoading(false));
  }, [user?.email]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Patient Records
        </h1>
        <p className="text-gray-500 text-sm">
          All registered patients under your consultations
        </p>
      </div>

      {/* TABLE CONTAINER */}
      <div className="max-w-6xl mx-auto bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">

        {loading ? (
          <p className="p-6 text-gray-500">Loading patients...</p>
        ) : pasentList.length === 0 ? (
          <p className="p-6 text-gray-500">No patients found</p>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              {/* HEADER */}
              <thead className="bg-blue-50 text-blue-700">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Patient Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Appointment</th>
                  <th className="p-3 text-left">Payment ID</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {pasentList.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-blue-50 transition"
                  >
                    <td className="p-3 font-medium">{index + 1}</td>

                    <td className="p-3 font-semibold text-gray-800">
                      {item?.pasentList?.appliedName}
                    </td>

                    <td className="p-3 text-gray-600">
                      {item?.pasentList?.appliedEmail}
                    </td>

                    <td className="p-3 text-gray-700">
                      {item?.pasentList?.appointmentDay}
                    </td>

                    <td className="p-3 text-xs font-mono text-blue-600">
                      {item?.pasentList?.paymentIntentId}
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

export default PasentList;