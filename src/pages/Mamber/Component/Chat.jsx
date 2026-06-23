import React, { useState, useEffect } from "react";
import useSocket from "../../../Hook/useSocket";
import useAuth from "../../../Hook/useAuth";
import axiosSecure from "../../../Hook/axiosSecure";
import { Link, Outlet } from "react-router-dom";

const Chat = () => {
  const socket = useSocket();
  const AxiosSecure = axiosSecure();
  const { user } = useAuth();
  const [friendlist, setFriendlist] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  // Socket setup
  useEffect(() => {
    if (!socket) return;

    socket.emit("registerEmail", { email: user?.email });

    socket.on("message", (data) => {
      console.log("Incoming:", data.message);
    });

    return () => {
      socket.off("message");
    };
  }, [socket, user?.email]);

  // Get doctor friend list
  useEffect(() => {
    async function doctorGet() {
      const res = await AxiosSecure.get(
        `/appointments/doctor/list/${user?.email}`
      );
      setFriendlist(res.data);
    }
    if (user?.email) doctorGet();
  }, [user?.email, AxiosSecure]);

  // Handle sending message
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.message.value;
    if (!socket || !text.trim()) return;

    socket.emit("sendMessage", {
      email: user?.email,
      message: text,
    });

    e.target.reset();
  };

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <div className="overflow-y-auto h-full w-[20%] bg-yellow-400 border-r border-yellow-500 p-4">
        <h2 className="text-lg font-bold mb-4 text-gray-900">Doctors</h2>
        <ul className="space-y-2">
          {friendlist.map((item, index) => {
            const doctor = item.doctorInfo;
            return (
              <Link to={`/dashboard/Chat/user/${doctor?._id}`}>
                <li
                  key={doctor._id}
                  onClick={() => setActiveChat(doctor)}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${activeChat?._id === doctor._id
                      ? "bg-yellow-600 text-white"
                      : "bg-yellow-300 hover:bg-yellow-200"
                    }`}
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <div>
                    <p className="font-medium">{doctor.name}</p>
                  </div>
                </li>
              </Link>

            );
          })}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="w-[80%] flex flex-col border-l-2 border-yellow-500">
        {/* Chat Header */}
        <div className="p-4 bg-yellow-300 border-b border-yellow-500 flex items-center gap-3">
          {activeChat ? (
            <>
              <img
                src={activeChat.image}
                alt={activeChat.name}
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <h1 className="text-xl font-semibold">
                Chat with {activeChat.name}
              </h1>
            </>
          ) : (
            <h1 className="text-xl font-semibold text-gray-700">
              Select a doctor to start chat
            </h1>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto bg-white">
          <Outlet />
        </div>

        {/* Chat Input */}
        {activeChat && (
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-yellow-500 bg-yellow-100 flex gap-2"
          >
            <input
              type="text"
              name="message"
              placeholder="Type a message..."
              className="flex-1 p-2 rounded-lg border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Chat;
