import axios from 'axios';
import React from 'react';

const AxiosPublic = () => {
    const instance = axios.create({
        baseURL:`${import.meta.env.VITE_Server_link}`,
        // baseURL:'http://localhost:4500',
        withCredentials:true
      }); 
      return instance;
};

export default AxiosPublic;