import React, { useEffect, useState } from 'react';
import axiosSecure from '../../../Hook/axiosSecure';
import useAuth from '../../../Hook/useAuth';

const AppointmentList = () => {
    const AxiosSecure = axiosSecure()
    const [appoinmentData, setAppoinmentData] = useState([])
    const { user } = useAuth()
    useEffect(() => {
        AxiosSecure.get(`/appointmentlist/${user?.email}`)
            .then(res => {
                console.log('appointment lists:', res.data);
                setAppoinmentData(res.data)
            })
    }, [])
    return (
        <div className='w-[100%] grid grid-cols-3 gap-2'>
            {
                appoinmentData.map(item => <div className="card bg-base-100 card-xs shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">{item?.Doctor_info?.name}</h2>
                         <h2>{item?.Doctor_info?.email}</h2>
                         <div className='w-[100%] grid grid-cols-3 gap-2'>
                            <span className=''>Doctor_Fee:{item?.amount}</span>
                            <span className=''>Appoinment_Date:{item?.appointmentDay}</span>
                            <span className=''>Register_No:{item?.Doctor_info?.Register}</span>
                         </div>
                    
                        <div className="justify-end card-actions">
                            <button className="btn bg-amber-300">Meet Now</button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default AppointmentList;