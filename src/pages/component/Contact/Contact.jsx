import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
const Contact = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_zas7kxh', 'template_pn2ml2r', form.current, {
        publicKey: 'LNGatKuNsBOF1rF2V',
      })
      .then(
        () => {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "email successfull",
            showConfirmButton: false,
            timer: 1500
          });
        },
        (error) => {
       
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Something went wrong!${error.text}`,  
          });
        },
      );
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-800 mb-10">Contact Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Need help or want to book an appointment? Feel free to reach out!
          </p>
          <div>
            <h3 className="font-semibold text-xl text-amber-700">Clinic Address</h3>
            <p className="text-gray-600">123 Health Street, Dhaka, Bangladesh</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl text-amber-700">Phone</h3>
            <p className="text-gray-600">(+880)1733757561</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl text-amber-700">Email</h3>
            <p className="text-gray-600">durjoy2001chando@gmail.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <form ref={form} onSubmit={sendEmail} className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Your Name</label>
            <input
              type="text"
              name="user_name"
              placeholder="Enter your name"
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="user_email"
              placeholder="Enter your email"
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Subject</label>
            <input
              type="text"
              name='subject'
              placeholder="Write the subject"
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              rows="4"
              name="message"
              placeholder="Write your message"
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            ></textarea>
          </div>

          <button
            type="submit" value="Send"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
