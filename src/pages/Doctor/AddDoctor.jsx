import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from "react-select";
import axiosSecure from '../../Hook/axiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../Hook/useAuth';
import AxiosPublic from '../../Hook/AxosPublic';

////   Doctor Category list ////

// General Physician (Primary Care)

// Cardiologist (Heart Specialist)

// Dermatologist (Skin Specialist)

// Neurologist (Brain & Nervous System)

// Orthopedic Surgeon (Bones & Joints)

// Pediatrician (Child Specialist)

// Gynecologist (Women's Health)

// Endocrinologist (Diabetes & Hormones)

// ENT Specialist (Ear, Nose, and Throat)

// Psychiatrist (Mental Health)

// Ophthalmologist (Eye Specialist)

// Dentist (Oral & Dental Health)

// Nephrologist (Kidney Specialist)

// Gastroenterologist (Digestive System)

// Oncologist (Cancer Specialist)

// Pulmonologist (Lung & Respiratory System)

// Rheumatologist (Autoimmune Diseases & Arthritis)

// Urologist (Urinary Tract & Male Reproductive Health)

// Radiologist (Medical Imaging & Diagnosis)

// Anesthesiologist (Pain Management & Surgery Preparation



const AddDoctor = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const weeken = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", 'Friday', "Saterday"];
    const [Degree, setDegree] = useState([])// demo
    const [category, setCategory] = useState([]); // demo
    const [values, setvalues] = useState('')
    // console.log('setdegererf',Degree)
    const options = weeken.map(fruit => ({ value: fruit, label: fruit }))
    const Skills = Degree.map(skill => ({ value: skill.degree, label: skill.degree }))

    const day = selectedOptions.map(i => i.value)
    const skill = selectedSkills.map(i => i.value)
    const axiospublic = AxiosPublic();

    useEffect(() => {
        axiospublic.get('/category')
            .then((res) => {
                // console.log('category',res.data)
                setCategory(res.data)
            })

        axiospublic.get('/degreelist')
            .then((resp) => {
                //    console.log('degreelists',resp.data)
                setDegree(resp.data)
            })
    }, [])
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const AxiosSecure = axiosSecure()
    const { user } = useAuth()
    // console.log(user?.photoURL)
    const onSubmit = (data) => {
        const name = user?.displayName;
        const email = user?.email;
        const fee = data.fee;
        const image = user?.photoURL
        const Register = data.registerNo;
        const StartTime = data.startTime
        const endTime = data.endTime
        const Category = values;
        const PatientLimit = parseInt(data.limit);
        const description = data.description;
        const status = "panding";
        const obj = { name, email, image, fee, Register, StartTime, endTime, Category, description, PatientLimit, status, day, skill };
        console.log('object list:', obj.StartTime,obj.endTime)

        // if (StartTime === endTime) {
        //     return alert('please teke minimum 1 hours gap');
        // }
        if(name && email){
            AxiosSecure.post('/doctor/addDoctor', obj)
            .then(res => {
                console.log("res", res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Request Post Successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        }

    }

    return (
        <div className='w-[100%] border border-white min-h-screen bg-white'>
            <h1 className='text-4xl font-extrabold text-black text-center mt-10'>Join Our Team</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='w-[90%] mx-auto  grid grid-cols-2 gap-6 px-6 rounded-lg  shadow-lg py-10 mt-10 bg-base-300'>
                {/* person details */}
                <div className=''>
                    <div className='flex gap-2'>
                        <div className='w-[40%]'>
                            <label className="fieldset-label">Name</label>
                            <input type="text" {...register("name")} className="input w-[100%] my-2" defaultValue={user?.displayName} readOnly required />
                        </div>
                        <div className='w-[55%]'>
                            <label className="fieldset-label">Image</label>
                            <input type="text" {...register("image")} className="input w-[100%] my-2" defaultValue={user?.photoURL} readOnly required />
                        </div>
                    </div>
                    <label className="fieldset-label">Email</label>
                    <input type="email" {...register("email")} className="input w-[100%] my-2" defaultValue={user?.email} readOnly required />
                    <div className='flex justify-between '>
                        <div className='w-[50%] my-2'>
                            <label className="fieldset-label ">Fee</label>
                            <input type="number" {...register("fee")} className="input w-[100%] my-1" placeholder="Fee" required />
                        </div>
                        <div className='w-[45%] my-2'>
                            <label className="fieldset-label">Register No:</label>
                            <input type="text" {...register("registerNo")} className="input my-1 w-[100%]" placeholder="registation code" required />
                        </div>
                    </div>
                    <label className="fieldset-label my-2">Degree</label>
                    <Select
                        isMulti
                        options={Skills}
                        value={selectedSkills}
                        onChange={setSelectedSkills}
                        className="w-[100%]"
                        required
                    />
                    <label className="fieldset-label my-2">Category</label>
                    <select
                        value={values}
                        onChange={(e) => { setvalues(e.target.value) }}
                        className="p-2 border rounded-md w-full"
                    >
                        <option value="" disabled>Select a category</option>
                        {category.map((item, index) => (
                            <option key={index} value={item?.category}>
                                {item?.category}
                            </option>
                        ))}
                    </select>

                </div>
                {/* time table */}
                <div className=''>
                    <div className='flex justify-between'>
                        <div className='w-[50%]'>
                            <label className="fieldset-label">Start Duty Time</label>
                            <input className='input' {...register("startTime")} type="time" required placeholder='start time' />
                        </div>
                        <div className='w-[45%]'>
                            <label className="fieldset-label">End Duty Time</label>
                            <input className='input' {...register("endTime")} type="time" required placeholder='End time' />
                        </div>
                    </div>

                    <div className='w-[100%] my-3 md:flex items-center justify-between'>
                        <div className='w-[100%] md:w-[50%] '>
                            <label className="fieldset-label">Select Day</label>
                            <Select
                                isMulti
                                options={options}
                                value={selectedOptions}
                                onChange={setSelectedOptions}
                                className="w-[100%]"
                                required
                            />
                        </div>
                        <div className='w-[100%] md:w-[45%] my-2'>
                            <label className="fieldset-label ">Patient limit</label>
                            <input type="number" {...register("limit")} className="input w-[100%] my-1" placeholder="Serial limit" required />
                        </div>
                    </div>
                    <label className="fieldset-label">Description</label>
                    <textarea rows={6} {...register("description")} type="text" required className="bg-base-100 border rounded-md px-2 w-[100%] my-2" placeholder="Bio" />
                </div>
                <div className='w-[30%]  rounded-md '>
                    <button type='submit' className='btn w-[100%] bg-amber-200'>Apply</button>
                </div>
            </form>
        </div>

    );
};

export default AddDoctor;