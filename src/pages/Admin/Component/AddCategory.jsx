import React, { useState } from 'react';
import axiosSecure from '../../../Hook/axiosSecure';
import Swal from 'sweetalert2';


const AddCategory = () => {
  const AxioSecure = axiosSecure();
  const [value, setValue] = useState('')
  const [degreeValue, setdegreeValue] = useState('');
  const [degreeDetails, setdegreeDetails] = useState('')
  const [description, setDescrption] = useState('')
  console.log('values fdshfdsf', value)
  const handleSubmit = (e) => {
    e.preventDefault()
    const category = e.target.category.value;
    console.log(category.legend)
    if (category) {
      const data = {
        category: category
      }
      AxioSecure.post(`/addCategory`, data)
        .then(res => {
          console.log('add category value is here:', res)
          if (res.data?.insertedId) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
    }


  }
  const handleSubmit2 = (e) => {
    e.preventDefault()
    const degreeS = e.target.degree.value;
    if (degreeS) {
      const data = {
        degree: degreeS
      }
      AxioSecure.post(`/addDegree`, data)
        .then(res => {
          console.log('add degree value is here:', res)
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
    }


  }
  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 md:p-8">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700">
          Manage Doctor Categories & Degrees
        </h1>

        <p className="text-gray-500 mt-2">
          Add new doctor specialties and educational qualifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Category Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl border border-blue-100 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
              🩺
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-700">
                Add Category
              </h2>

              <p className="text-gray-500 text-sm">
                Create a new doctor category.
              </p>
            </div>
          </div>

          <div className="space-y-5">

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Category Name
              </label>

              <input
                type="text"
                name="category"
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. Cardiologist"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          <button
            type="submit"
            className={`w-full mt-8 py-3 rounded-xl font-semibold transition-all duration-300 bg-blue-700 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-300"
        }
        `}
          >
            Add Category
          </button>
        </form>

        {/* Degree Card */}

        <form
          onSubmit={handleSubmit2}
          className="bg-white rounded-3xl shadow-xl border border-blue-100 p-8"
        >
          <div className="flex items-center gap-3 mb-6">

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
              🎓
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-700">
                Add Degree
              </h2>

              <p className="text-gray-500 text-sm">
                Add doctor's educational qualification.
              </p>
            </div>

          </div>

          <div className="space-y-5">

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Degree Name
              </label>

              <input
                type="text"
                name="degree"
                onChange={(e) => setdegreeValue(e.target.value)}
                placeholder="e.g. MBBS"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          <button
            type="submit"
            className={`w-full mt-8 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300 bg-blue-700  hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-300"
        }

        `}
          >
            Add Degree
          </button>

        </form>

      </div>

    </div>

  );
};

export default AddCategory;