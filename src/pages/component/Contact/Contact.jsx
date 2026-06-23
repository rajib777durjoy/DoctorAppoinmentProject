import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_zas7kxh', 'template_pn2ml2r', form.current, {
        publicKey: 'LNGatKuNsBOF1rF2V',
      })
      .then(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Message sent successfully",
          timer: 1500,
          showConfirmButton: false
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: error.text,
        });
      });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-16 px-4">

      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Contact Us
        </h1>
        <p className="text-gray-500 mt-2">
          We’re here to help you with appointments, support, or any medical inquiry.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT INFO */}
        <div className="space-y-5">

          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
            <FaMapMarkerAlt className="text-blue-600 text-xl mb-2" />
            <h3 className="font-semibold text-gray-800">Clinic Address</h3>
            <p className="text-gray-500">123 Health Street, Dhaka, Bangladesh</p>
          </div>

          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
            <FaPhoneAlt className="text-blue-600 text-xl mb-2" />
            <h3 className="font-semibold text-gray-800">Phone</h3>
            <p className="text-gray-500">(+880) 1733-757561</p>
          </div>

          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
            <FaEnvelope className="text-blue-600 text-xl mb-2" />
            <h3 className="font-semibold text-gray-800">Email</h3>
            <p className="text-gray-500">support@drmeet.com</p>
          </div>

        </div>

        {/* RIGHT FORM */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="bg-white border border-blue-100 shadow-lg rounded-2xl p-8 space-y-5"
        >

          <h2 className="text-2xl font-bold text-gray-800">
            Send Message
          </h2>

          <div>
            <label className="text-sm text-gray-600">Your Name</label>
            <input
              type="text"
              name="user_name"
              placeholder="Enter your name"
              className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="user_email"
              placeholder="Enter your email"
              className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Message</label>
            <textarea
              rows="4"
              name="message"
              placeholder="Write your message..."
              className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
          >
            Send Message
          </button>

        </form>

      </div>
    </section>
  );
};

export default Contact;
