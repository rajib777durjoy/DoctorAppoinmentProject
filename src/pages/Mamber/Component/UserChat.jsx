import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSocket from '../../../Hook/useSocket';

const UserChat = () => {
    const {id}= useParams();
    console.log(id);
    const socket = useSocket();
    useEffect(()=>{
     if (!socket) return;
    socket.on("returnMessage",(data) => {
      console.log("Incoming:", data.message);
    });

    return () => {
      socket.off("returnMessage");
    };
    },[])
    return (
        <div>
            <div className='w-[100%] h-[600px] overflow-y-scroll'>

            </div>
           <textarea className='w-[100%] h-[40px] px-4 py-1' name="" placeholder='chating' id=""></textarea>
        </div>
    );
};

export default UserChat;