import React, { useState } from 'react';
import useAuth from '../../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../Hook/axiosSecure';
import Swal from 'sweetalert2';

const AppliedList = () => {
  const { user } = useAuth();
  const AxiosSecure = axiosSecure();
  const [value, setValue] = useState([]);

  const { data: list = [], isPending, refetch } = useQuery({
    queryKey: ['applid', user?.email],
    queryFn: async () => {
      const res = await AxiosSecure(`/applidlist`);
      console.log('applidlist', res.data);
      return res.data;
    },
  });

  const handleClick = async (e, applid_id) => {
    setValue(e.target.value);
    if (e.target.value) {
      const response = await AxiosSecure.patch(`/status/Update/${applid_id}`, {
        status: e.target.value,
      });
      if (response.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: `Status updated to "${e.target.value}" successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const handleMoreDetails = (id) => {
    console.log('More details ID:', id);
    // Optional: Open modal or navigate to details page
  };

  if (isPending) {
    return (
      <div className="text-2xl text-yellow-500 font-semibold text-center mt-20">
        🔄 Loading Applied List...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <h2 className="text-3xl font-bold text-yellow-600 mb-8 text-center">
        📋 Applicant List Overview
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-yellow-100 text-yellow-800">
            <tr>
              <th className="px-6 py-4 text-center font-semibold uppercase">#</th>
              <th className="px-6 py-4 text-center font-semibold uppercase">Name</th>
              <th className="px-6 py-4 text-center font-semibold uppercase">Email</th>
              <th className="px-6 py-4 text-center font-semibold uppercase">Category</th>
              <th className="px-6 py-4 text-center font-semibold uppercase">Status</th>
              <th className="px-6 py-4 text-center font-semibold uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {list?.map((item, index) => (
              <tr key={item._id} className="hover:bg-yellow-50 transition">
                <td className="px-6 py-3 text-center font-medium">{index + 1}</td>
                <td className="px-6 py-3 text-center">{item.name}</td>
                <td className="px-6 py-3 text-center">{item.email}</td>
                <td className="px-6 py-3 text-center">{item.Category}</td>
                <td className="px-6 py-3 text-center">
                  <select
                    onChange={(e) => handleClick(e, item._id)}
                    defaultValue={item.status}
                    disabled={item.status === 'done'}
                    className={`px-3 py-1 rounded-md border text-sm outline-none shadow-sm ${
                      item.status === 'done'
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : 'bg-yellow-50 text-gray-800'
                    }`}
                  >
                    <option value="panding">Pending</option>
                    <option value="Inprogres">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </td>
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={() => handleMoreDetails(item._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg text-xs font-semibold shadow-md transition"
                  >
                    🔍 More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {list.length === 0 && (
          <div className="text-center py-6 text-gray-500 font-medium">
            No applicants found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedList;
