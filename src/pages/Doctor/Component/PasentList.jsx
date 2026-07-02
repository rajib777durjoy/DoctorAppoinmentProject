import React, { useEffect, useState } from "react";
import axiosSecure from "../../../Hook/axiosSecure";
import useAuth from "../../../Hook/useAuth";

const PatientList = () => {
  const AxiosSecure = axiosSecure();
  const { user } = useAuth();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    AxiosSecure.get(`/listfopasent/${user.email}`)
      .then((res) => {
        setPatients(res.data);
      })
      .finally(() => setLoading(false));
  }, [user?.email]);

  return (
    <section className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg mb-8">
          <h1 className="text-3xl font-bold">Patient List</h1>
          <p className="text-blue-100 mt-2">
            All patients who booked appointments with you.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Top */}
          <div className="flex justify-between items-center border-b px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Patients
            </h2>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
              {patients.length}
            </span>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="py-20 text-center">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : patients.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No Patient Found
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="table w-full">

                <thead className="bg-blue-50">
                  <tr className="text-blue-700">
                    <th>#</th>
                    <th>Patient</th>
                    <th>Email</th>
                    <th>Doctor</th>
                    <th>Fee</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {patients.map((patient, index) => (
                    <tr
                      key={patient._id}
                      className="hover:bg-blue-50 transition"
                    >
                      <td className="font-semibold">{index + 1}</td>

                      <td>
                        <div className="font-bold text-gray-700">
                          {patient.patientName}
                        </div>
                      </td>

                      <td>{patient.patientEmail}</td>

                      <td>{patient.doctorName}</td>

                      <td className="font-semibold text-green-600">
                        ৳ {patient.doctorFee}
                      </td>

                      <td>
                        <span
                          className={`badge text-white ${
                            patient.status === "approved"
                              ? "badge-success"
                              : patient.status === "pending"
                              ? "badge-warning"
                              : "badge-error"
                          }`}
                        >
                          {patient.status}
                        </span>
                      </td>

                      <td>
                        {new Date(patient.bookingDate).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PatientList;