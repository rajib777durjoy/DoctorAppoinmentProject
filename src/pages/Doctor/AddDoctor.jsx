import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from "react-select";
import axiosSecure from '../../Hook/axiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../Hook/useAuth';
import AxiosPublic from '../../Hook/AxosPublic';

const AddDoctor = () => {
  // const [selectedDays, setSelectedDays] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [category, setCategory] = useState([]);
  const [degreeList, setDegreeList] = useState([]);
  const [categoryValue, setCategoryValue] = useState([]);

  const axiospublic = AxiosPublic();
  const AxiosSecure = axiosSecure();
  const { user } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();

  // const daysOptions = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(day => ({ value: day, label: day }));

  const skillsOptions = degreeList.map(d => ({
    value: d.degree,
    label: d.degree
  }));

  // const days = selectedDays.map(d => d.value);
  const skills = selectedSkills.map(s => s.value);

  useEffect(() => {
    axiospublic.get('/category').then(res => setCategory(res.data));
    axiospublic.get('/degreelist').then(res => setDegreeList(res.data));
  }, []);

  const onSubmit = async (data) => {
    const payload = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      fee: data.fee,
      Register: data.registerNo,
      StartTime: data.startTime,
      endTime: data.endTime,
      Category: categoryValue,
      description: data.description,
      // PatientLimit: parseInt(data.limit),
      status: "pending",
      // day: days,
      skill: skills
    };

    const res = await AxiosSecure.post('/doctor/addDoctor', payload);

    if (res.data.insertedId) {
      Swal.fire({
        icon: 'success',
        title: 'Application Submitted',
        text: 'Your request is under review',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-16">

      <div className="max-w-5xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Join as a Doctor
          </h1>
          <p className="text-gray-500 mt-2">
            Fill out your professional details to start practicing with us
          </p>
        </div>

        {/* FORM CARD */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white border border-blue-100 shadow-lg rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
        >

          {/* LEFT */}
          <div className="space-y-5">

            <div className="p-4 bg-blue-50 rounded-xl">
              <label className="text-sm text-gray-600">Name</label>
              <input
                readOnly
                defaultValue={user?.displayName}
                className="w-full bg-transparent font-semibold text-gray-800 outline-none"
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-xl">
              <label className="text-sm text-gray-600">Email</label>
              <input
                readOnly
                defaultValue={user?.email}
                className="w-full bg-transparent font-semibold text-gray-800 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Fee</label>
              <input
                {...register("fee", { required: true })}
                className="input input-bordered w-full mt-1"
              />
              {errors.fee && <p className="text-red-500 text-sm">Required</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Register No</label>
              <input
                {...register("registerNo", { required: true })}
                className="input input-bordered w-full mt-1"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select
                value={categoryValue}
                onChange={(e) => setCategoryValue(e.target.value)}
                className="select select-bordered w-full mt-1"
              >
                <option value="">Select Category</option>
                {category.map((c, i) => (
                  <option key={i} value={c.category}>
                    {c.category}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Start Time</label>
                <input type="time" {...register("startTime", { required: true })}
                  className="input input-bordered w-full mt-1" />
              </div>

              <div>
                <label className="text-sm">End Time</label>
                <input type="time" {...register("endTime", { required: true })}
                  className="input input-bordered w-full mt-1" />
              </div>
            </div>

            {/* <div>
              <label className="text-sm font-medium">Available Days</label>
              <Select
                isMulti
                options={daysOptions}
                value={selectedDays}
                onChange={setSelectedDays}
              />
            </div> */}

            <div>
              <label className="text-sm font-medium">Degrees</label>
              <Select
                isMulti
                options={skillsOptions}
                value={selectedSkills}
                onChange={setSelectedSkills}
              />
            </div>

            {/* <div>
              <label className="text-sm">Patient Limit</label>
              <input
                type="number"
                {...register("limit", { required: true })}
                className="input input-bordered w-full mt-1"
              />
            </div> */}

            <div>
              <label className="text-sm">Description</label>
              <textarea
                rows={4}
                {...register("description", { required: true })}
                className="textarea textarea-bordered w-full mt-1"
              />
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
              Submit Application
            </button>

          </div>

        </form>
      </div>
    </section>
  );
};

export default AddDoctor;
