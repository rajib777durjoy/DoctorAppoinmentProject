import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from "react-select";
import axiosSecure from '../../Hook/axiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../Hook/useAuth';
import AxiosPublic from '../../Hook/AxosPublic';

const AddDoctor = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const weeken = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [Degree, setDegree] = useState([]);
    const [category, setCategory] = useState([]);
    const [values, setValues] = useState('');
    const options = weeken.map(day => ({ value: day, label: day }));
    const Skills = Degree.map(skill => ({ value: skill.degree, label: skill.degree }));

    const day = selectedOptions.map(i => i.value);
    const skill = selectedSkills.map(i => i.value);

    const axiospublic = AxiosPublic();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const AxiosSecure = axiosSecure();
    const { user } = useAuth();

    useEffect(() => {
        axiospublic.get('/category').then(res => setCategory(res.data));
        axiospublic.get('/degreelist').then(res => setDegree(res.data));
    }, []);

    const onSubmit = (data) => {
        const obj = {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
            fee: data.fee,
            Register: data.registerNo,
            StartTime: data.startTime,
            endTime: data.endTime,
            Category: values,
            description: data.description,
            PatientLimit: parseInt(data.limit),
            status: "pending",
            day,
            skill
        };

        AxiosSecure.post('/doctor/addDoctor', obj).then(res => {
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Request Posted Successfully',
                    timer: 1500,
                    showConfirmButton: false,
                    position: 'top-center',
                });
            }
        });
    };

    return (
        <div className="max-w-7xl mx-auto my-16 px-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-extrabold text-yellow-600 text-center mb-10">Join Our Team</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side */}
                <div className="space-y-6">
                    {/* Name and Image */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                {...register("name")}
                                defaultValue={user?.displayName}
                                readOnly
                                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input
                                type="text"
                                {...register("image")}
                                defaultValue={user?.photoURL}
                                readOnly
                                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            defaultValue={user?.email}
                            readOnly
                            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Fee and Register No */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fee</label>
                            <input
                                type="number"
                                {...register("fee", { required: true })}
                                placeholder="Fee"
                                className="input input-bordered w-full"
                            />
                            {errors.fee && <p className="text-sm text-red-500 mt-1">Fee is required</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Register No</label>
                            <input
                                type="text"
                                {...register("registerNo", { required: true })}
                                placeholder="Registration code"
                                className="input input-bordered w-full"
                            />
                            {errors.registerNo && <p className="text-sm text-red-500 mt-1">Register No is required</p>}
                        </div>
                    </div>

                    {/* Degree Multi-select */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                        <Select
                            isMulti
                            options={Skills}
                            value={selectedSkills}
                            onChange={setSelectedSkills}
                            className="w-full"
                            placeholder="Select degrees"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            value={values}
                            onChange={(e) => setValues(e.target.value)}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            {category.map((item, idx) => (
                                <option key={idx} value={item?.category}>
                                    {item?.category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Right Side */}
                <div className="space-y-6">
                    {/* Start and End Time */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Duty Time</label>
                            <input
                                type="time"
                                {...register("startTime", { required: true })}
                                className="input input-bordered w-full"
                            />
                            {errors.startTime && <p className="text-sm text-red-500 mt-1">Start time is required</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Duty Time</label>
                            <input
                                type="time"
                                {...register("endTime", { required: true })}
                                className="input input-bordered w-full"
                            />
                            {errors.endTime && <p className="text-sm text-red-500 mt-1">End time is required</p>}
                        </div>
                    </div>

                    {/* Select Days */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Days</label>
                        <Select
                            isMulti
                            options={options}
                            value={selectedOptions}
                            onChange={setSelectedOptions}
                            className="w-full"
                            placeholder="Select available days"
                        />
                    </div>

                    {/* Patient Limit */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Patient Limit</label>
                        <input
                            type="number"
                            {...register("limit", { required: true })}
                            placeholder="Number of patients per day"
                            className="input input-bordered w-full"
                        />
                        {errors.limit && <p className="text-sm text-red-500 mt-1">Patient limit is required</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            rows={6}
                            {...register("description", { required: true })}
                            placeholder="Bio"
                            className="textarea textarea-bordered w-full resize-none"
                        />
                        {errors.description && <p className="text-sm text-red-500 mt-1">Description is required</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="btn bg-yellow-400 hover:bg-yellow-500 w-full text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;
