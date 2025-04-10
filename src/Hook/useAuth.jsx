import React, { useContext } from 'react';
import { Auth } from '../AuthProvider';

const useAuth = () => {
    const Context= useContext(Auth)
    return Context;
};

export default useAuth;