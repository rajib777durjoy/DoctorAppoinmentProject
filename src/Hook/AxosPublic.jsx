import axios from 'axios';
import React from 'react';

const AxiosPublic = () => {
    const instance = axios.create({
        baseURL:`${import.meta.env.VITE_DEPLOY_LINK}`,
      }); 
      return instance;
};

export default AxiosPublic;