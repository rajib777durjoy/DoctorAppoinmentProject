import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AxiosPublic from '../../Hook/AxosPublic';
import { motion } from "motion/react";
import { useQuery } from '@tanstack/react-query';

const DoctorDetails = () => {
    const { id } = useParams()
    const axiospublic = AxiosPublic()
    const [AppoimentDay,setAppoimentDay]=useState([]);
    
    useEffect(() => {
        axiospublic.get(`/doctor/details/${id}`)
            .then(res => {
                setdoctor(res?.data)
            })
       
    }, [id])
    const {data:doctors=[],refetch,isPending}=useQuery({
     queryKey:[id,'doctorlist'],
     queryFn:async()=>{
       const res = await axiospublic.get(`/doctor/details/${id}`)
       return res.data
     }
    })
    
  

   
    return (
        <div className='w-[100%] my-10 min-h-[500px]'>
            <div className='w-[50%] mx-auto my-10 '>
                <h1 className='text-4xl text-center font-bold'>Doctor Details</h1>
            </div>
            <div className='w-[90%] mx-auto flex justify-between'>
                <div className='w-[78%] md:w-[100%] px-4 py-10 shadow-md border rounded-md'>
                    <div className='w-[100%] grid md:grid-cols-2 gap-4'>
                        <div className=''>
                            <img src={doctors?.image} className='w-[90%] h-[500px] object-fill mx-auto rounded-md' alt="" />
                            <div className='w-[90%] mx-auto'>
                                <h2 className='text-xl text-center font-bold my-2 w-[100%] '>Description</h2>
                                <p>{doctors?.description}</p>
                            </div>

                        </div>
                        <div className='px-2 '>
                            <div className='flex '>
                                <h2 className='capitalize'>Dr.{doctors?.name}</h2>,
                                <h2 className='ms-2'>Register:{doctors?.Register}</h2>
                            </div>
                            <h2>Email:{doctors?.email}</h2>
                            <h3>Category:{doctors?.Category}</h3>
                            <h3>Fee:{doctors?.fee}</h3>
                            <h3>Per Day:{doctors?.PatientLimit}(Patients)</h3>
                            <h1>StartTime:({doctors?.StartTime}) to EndTime:({doctors?.endTime})</h1>
                            <h2 className='text-center font-bold my-4 text-xl'></h2>
                            <hr />
                            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 my-2'>
                                {doctors?.day?.map(item => (
                                    <button className='btn mx-2'>{item}</button>
                                ))}
                            </div>
                            <h3 className='text-center font-bold my-4 text-xl'></h3>
                            <hr />
                            <div className='grid grid-cols-3 gap-4 my-2'>
                                {doctors?.skill?.map(item => (
                                    <button  className='btn mx-2'>{item}</button>
                                ))}
                            </div>
                            <div className='w-[25%]  ms-auto mt-10'>
                                <button onClick={()=>{
                                    document.getElementById('my_modal_5').showModal()
                                    
                                    }} className='btn w-[100%] rounded-lg bg-amber-300 hover:bg-base-300'>Apoinment</button>
                            </div>
                        </div>
                    </div>

                </div>
                {/* not use in this line */}
                {/* <div className='w-[20%] border rounded-md border-amber-300'>
                    {
                        categorys.map((item,index)=>(
                            <div key={index} className='w-[80%] mx-auto my-4 ' ><button onClick={()=>setSearchValue(item?.category)} className='btn hover:bg-amber-300 w-[100%] mx-auto'>{item.category}</button></div>
                        ))
                    }
                </div> */}
            </div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                  {/* To-do....  hare i implement is payment system method 
                    default value like doctior visit/Fee show  */}
                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 my-2'>
                                {doctors?.day?.map(item =>(
                                    <button onClick={()=>setAppoimentDay([item,doctors?.fee,id])} className='btn mx-2'>{item}</button>
                                ))}
                            </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <Link to={`/payment/${AppoimentDay}`}><button className="btn">Book</button></Link>
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default DoctorDetails;