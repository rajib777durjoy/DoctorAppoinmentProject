import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import axiosSecure from '../../Hook/axiosSecure';
import Admin from '../../pages/Admin/Admin';
import Mambers from '../../pages/Mamber/Component/Mambers';
import Doctor from '../../pages/Doctor/Doctor';

const Dashboard = () => {
    const {user}=useAuth()
    const AxiosSecure= axiosSecure()
    const {data:userVerify=[],isPending}=useQuery({
     queryKey:[user?.email],
     queryFn:async()=>{
        const res= await AxiosSecure(`/userverify/${user?.email}`,)
        console.log('res',res.data)
        return res.data;
     }
    })
    if(isPending){
        return <div className='text-2xl text-center text-red-500'>Loading ....</div>
    }
    const admin = userVerify?.user === 'admin';
    const doctor = userVerify?.user === 'doctor';
    const member = userVerify?.user === 'member';
    console.log('userverify:',userVerify)
    return (
        <div className='w-[100%]'>
           <h1 className='h-[70px] border sticky top-0 z-40 bg-amber-300'></h1>
           <div className='w-[100%]  flex'>
               <div className='w-[10%] h-[700px] border fixed top-[70px] z-40'>
                 {
                   member && <Mambers></Mambers>
                 }
                 {
                    admin && <Admin></Admin>
                 }
                 {
                  doctor && <Doctor></Doctor>
                 }
               </div>
               <div className='w-[90%] min-h-screen ms-[10%]'>
                <Outlet></Outlet>
               </div>
           </div>
        </div>
    );
};

export default Dashboard;