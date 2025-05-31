
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import AxiosPublic from "../../Hook/AxosPublic";
import React, { useEffect, useState } from 'react';
// {
//     "_id": "67efcb85d4b839e12801a73e",
//     "name": "durjoy chando",
//     "email": "durjoy2001chando@gmail.com",
//     "image": "https://i.ibb.co/Z115VHZk/IMG-20220630-200229.jpg",
//     "fee": "1000",
//     "Register": "545353",
//     "StartTime": "18:06",
//     "endTime": "21:30",
//     "Category": "Pediatrician",
//     "description": "Treatment for dropped head syndrome (DHS) depends on the underlying cause. DHS is a condition where the neck muscles become weak, causing the head to droop forward. Common causes include neuromuscular diseases, cervical spine disorders, or Parkinson’s disease. Here are the main treatment options:",
//     "day": [
//         "Friday",
//         "Saterday",
//         "Sunday"
//     ],
//     "skill": [
//         "MBBS"
//     ],
//     "status": "done",
//     "PatientLimit": "50",
//     "role": "doctor"
// }
const AllDoctor = () => {
    const axiospublic = AxiosPublic()
    const [doctors, setdoctor] = useState([]);
    useEffect(() => {
        axiospublic.get('/doctor/alldoctor')
            .then(res => {
                console.log('responst doctor', res?.data)
                setdoctor(res?.data)

            })
    }, [])
    return (
        <div className='w-[100%] my-10 min-h-[500px]'>
            <div className='w-[50%] mx-auto my-10 py-5 '>
                <h1 className='text-4xl text-center font-bold'>Doctor Fetures</h1>
            </div>
            <div className="w-[90%] mx-auto flex justify-baseline">
                <div className='w-[75%]  border border-red-500 mx-auto min-h-screen grid md:grid-cols-3  gap-3  '>
                    {
                        doctors?.map(item => <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="card hover:bg-slate-300 h-[300px] shadow-md shadow-amber-300 hover:shadow-md hover:shadow-gray-400">
                            <figure className="px-10 pt-10">
                                <img
                                    src={item?.image}
                                    alt=""
                                    className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h1 className="capitalize text-start w-[90%] mx-auto">{item?.name}</h1>
                                <h2 className="text-start w-[90%] mx-auto">Email:{item?.email}</h2>
                                <h2 className="text-start w-[90%] mx-auto">Category:{item?.Category}</h2>
                                <div className="card-actions">
                                    <Link to={`/doctorDetails/${item?._id}`} ><button className="btn bg-amber-300">Details</button></Link>
                                </div>
                            </div>
                        </motion.div>)
                    }

                </div>
                <div className="border-2 border-red-600 w-[20%] h-[600px] ">
                    <h1 className="text-center text-xl font-semibold">Suggest </h1>
                </div>
            </div>

        </div>
    );
};

export default AllDoctor;