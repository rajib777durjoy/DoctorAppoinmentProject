import React, { useContext } from 'react';
import { socketContext } from '../SocketContext/SocketProvider';


const useSocket = () => {
    const socket=useContext(socketContext)
    return socket
};

export default useSocket;