import React from 'react';
import useAuth from '../Hook/useAuth';
import { Navigate } from 'react-router-dom';

const Protect = ({children}) => {
    const {user,loading}=useAuth()
    if(loading){
        return <div className='text-2xl text-red-400 text-center'>Loading ...</div>
    }
    if(!user){
     return <Navigate to='/login'></Navigate>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default Protect;