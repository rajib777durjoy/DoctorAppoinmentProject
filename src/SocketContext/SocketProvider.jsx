import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const socketContext= createContext(null);

const SocketProvider = ({children}) => {
    const [socket,setSocket]=useState(null)
    useEffect(()=>{
    const connectSocket=io("http://localhost:4500", {
      withCredentials: true, // Allow cookies if needed
      // auth: { token: "YOUR_JWT_TOKEN" }, // Send token if needed
      transports: ["websocket"], // Force WebSocket for faster connection
    });
    setSocket(connectSocket);
    return ()=>{
         connectSocket.disconnect();
    }
    },[])
    return (
        <socketContext.Provider value={socket}>
              {children}
        </socketContext.Provider>
    );
};

export default SocketProvider;