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
    // <div className='w-[100%] border grid grid-cols-2'>

    //     <form onSubmit={handleSubmit} className='w-[70%] mx-auto'>
    //         <fieldset className="fieldset">
    //             <legend className="fieldset-legend">Add Category</legend>
    //             <input type="text" name='category' onChange={(e)=>setValue(e.target.value)} className="input w-[100%] rounded-md border-2 border-amber-200" placeholder="Type here" />
    //             <textarea name="description" onChange={(e)=>{setDescrption(e.target.value)}} rows={5} placeholder='Bio' className='border-2 rounded-xl p-2 border-amber-200' id=""></textarea>
    //         </fieldset>
    //         <div>
    //             <button type='submit' disabled={value.length < 5 || description.length < 10} className='btn bg-amber-200 rounded-md'>Add Category</button>
    //         </div>
    //     </form>
    //     <form onSubmit={handleSubmit2} className='w-[70%] mx-auto'>
    //         <fieldset className="fieldset">
    //             <legend className="fieldset-legend">Add Degree</legend>
    //             <input type="text" name='degree' onChange={(e)=>setdegreeValue(e.target.value)} className="input rounded-md border-2 w-[100%] border-amber-200" placeholder="Type here" />
    //             <textarea name="details" onChange={(e)=>{setdegreeDetails(e.target.value)}} rows={5} placeholder='Bio'className='border-2 rounded-xl p-2 border-amber-200' id=""></textarea>
    //         </fieldset>
    //         <div>
    //             <button type='submit' disabled={degreeValue.length < 5 || degreeDetails.length < 10} className='btn bg-amber-200 rounded-md'>Add Degree</button>
    //         </div>
    //     </form>
    // </div>
    <div className="w-full min-h-screen bg-white px-6 py-10">
      <h1 className="text-3xl font-bold text-yellow-700 text-center mb-10">Manage Doctor Categories & Degrees</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Add Category Form */}
        <form onSubmit={handleSubmit} className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 shadow-sm w-full">
          <fieldset className="border border-yellow-300 p-4 rounded-md">
            <legend className="text-lg font-semibold text-yellow-700 px-2">Add Category</legend>

            <div className="mt-4 space-y-4">
              <input
                type="text"
                name="category"
                onChange={(e) => setValue(e.target.value)}
                className="input w-full rounded-md border-2 border-yellow-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Category Name"
              />

              <textarea
                name="description"
                onChange={(e) => setDescrption(e.target.value)}
                rows={5}
                placeholder="Category Description"
                className="w-full border-2 rounded-xl p-3 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>
            </div>
          </fieldset>

          <div className="mt-6 text-right">
            <button
              type="submit"
              disabled={value.length < 5 || description.length < 10}
              className={`px-6 py-2 rounded-md font-semibold text-white ${value.length < 5 || description.length < 10
                  ? 'bg-yellow-300 cursor-not-allowed'
                  : 'bg-yellow-500 hover:bg-yellow-600'
                } transition-all duration-300`}
            >
              Add Category
            </button>
          </div>
        </form>

        {/* Add Degree Form */}
        <form onSubmit={handleSubmit2} className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 shadow-sm w-full">
          <fieldset className="border border-yellow-300 p-4 rounded-md">
            <legend className="text-lg font-semibold text-yellow-700 px-2">Add Degree</legend>

            <div className="mt-4 space-y-4">
              <input
                type="text"
                name="degree"
                onChange={(e) => setdegreeValue(e.target.value)}
                className="input w-full rounded-md border-2 border-yellow-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Degree Name"
              />

              <textarea
                name="details"
                onChange={(e) => setdegreeDetails(e.target.value)}
                rows={5}
                placeholder="Degree Details"
                className="w-full border-2 rounded-xl p-3 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>
            </div>
          </fieldset>

          <div className="mt-6 text-right">
            <button
              type="submit"
              disabled={degreeValue.length < 5 || degreeDetails.length < 10}
              className={`px-6 py-2 rounded-md font-semibold text-white ${degreeValue.length < 5 || degreeDetails.length < 10
                  ? 'bg-yellow-300 cursor-not-allowed'
                  : 'bg-yellow-500 hover:bg-yellow-600'
                } transition-all duration-300`}
            >
              Add Degree
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default AddCategory;