import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosPublic from '../../Hook/AxosPublic';
import { motion } from "motion/react";
const DoctorDetails = () => {
    const { id } = useParams()
    const axiospublic = AxiosPublic()
    const [doctors, setdoctor] = useState()
    console.log('id', id)
    useEffect(() => {
        axiospublic.get(`/doctor/details/${id}`)
            .then(res => {

                setdoctor(res?.data)
            })
    }, [])
    console.log(doctors)

    // _id
    // 67efcb85d4b839e12801a73e
    // name
    // "durjoy chando"
    // email
    // "durjoy2001chando@gmail.com"
    // image
    // "https://i.ibb.co/Z115VHZk/IMG-20220630-200229.jpg"
    // fee
    // "1000"
    // Register
    // "545353"
    // StartTime
    // "18:06"
    // endTime
    // "21:30"
    // Category
    // "Pediatrician"
    // description
    // "Treatment for dropped head syndrome (DHS) depends on the underlying ca…"

    // day
    // Array (3)

    // skill
    // Array (1)
    // PresentLimit
    // "50"
    // status
    // "panding"
    // role
    // "member"
    return (
        <div className='w-[100%] my-10 min-h-[500px]'>
            <div className='w-[50%] mx-auto my-10 '>
                <h1 className='text-4xl text-center font-bold'>Doctor Details</h1>
            </div>
            <div className='w-[90%] mx-auto flex justify-between'>
                <div className='w-[78%] px-4 py-10 shadow-md border rounded-md'>
                    <div className='w-[100%] grid md:grid-cols-2 gap-4'>
                        <div className=''>
                            <img src={doctors?.image} className='w-[90%] mx-auto rounded-md' alt="" />
                            <div className='w-[90%] mx-auto'>
                                <h2 className='text-xl text-center font-bold my-2 w-[100%] '>Description</h2>
                                <p>{doctors?.description}</p>
                            </div>

                        </div>
                        <div className='px-2 '>
                            <div className='flex '>
                                <h2>Dr.{doctors?.name}</h2>
                                <h2>Register:{doctors?.Register}</h2>
                            </div>
                            <h2>Email:{doctors?.email}</h2>
                            <h3>Category:{doctors?.Category}</h3>
                            <h3>Experience:{doctors?.experience}</h3>
                            <h3>Fee:{doctors?.fee}</h3>
                            <h3>Present Limit:{doctors?.PatientLimit}</h3>
                            <h1>StartTime:({doctors?.StartTime}) to EndTime:({doctors?.endTime})</h1>
                            <h2 className='text-center font-bold my-4 text-xl'>Slots</h2>
                            <hr />
                            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 my-2'>
                                {doctors?.day?.map(item => (
                                    <button className='btn mx-2'>{item}</button>
                                ))}
                            </div>
                            <h3 className='text-center font-bold my-4 text-xl'>Degree</h3>
                            <hr />
                            <div className='grid grid-cols-3 gap-4 my-2'>
                                {doctors?.skill?.map(item => (
                                    <button className='btn mx-2'>{item}</button>
                                ))}
                            </div>
                            <div className='w-[25%]  ms-auto mt-10'>
                                <button onClick={()=>document.getElementById('my_modal_5').showModal()} className='btn w-[100%] rounded-lg bg-amber-300 hover:bg-base-300'>Apoinment</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='w-[20%] border rounded-md'>

                </div>
            </div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default DoctorDetails;