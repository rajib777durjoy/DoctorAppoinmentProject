import React from 'react';
import {
  FaStethoscope,
  FaUserMd,
  FaTooth,
  FaHeartbeat,
  FaNotesMedical,
  FaVideo
} from 'react-icons/fa';

const Service = () => {
  const services = [
    { id: 1, icon: <FaStethoscope />, title: "General Consultation", description: "Consult with general physicians for common health issues." },
    { id: 2, icon: <FaUserMd />, title: "Specialist Doctor", description: "Book appointments with expert specialists across departments." },
    { id: 3, icon: <FaTooth />, title: "Dental Care", description: "Access top dental clinics and doctors near you." },
    { id: 4, icon: <FaHeartbeat />, title: "Cardiology", description: "Consult with heart specialists for cardiac-related issues." },
    { id: 5, icon: <FaVideo />, title: "Video Consultation", description: "Talk to doctors from home via secure video calls." },
    { id: 6, icon: <FaNotesMedical />, title: "Health Packages", description: "Full body checkups and preventive health packages." },
  ];

  return (
    <div className="bg-white min-h-screen">

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold">
          Our Medical Services
        </h1>
        <p className="mt-3 text-blue-100 max-w-xl mx-auto">
          Comprehensive healthcare solutions designed for your comfort and well-being
        </p>
      </div>

      {/* SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white border border-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1"
            >

              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-2xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                {service.icon}
              </div>

              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {service.title}
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed">
                {service.description}
              </p>

            </div>
          ))}

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-blue-50 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How It Works
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6">

          {[
            {
              title: "Search Doctor",
              desc: "Find specialists based on your health needs."
            },
            {
              title: "Book Appointment",
              desc: "Choose time, date, and consultation type."
            },
            {
              title: "Get Treatment",
              desc: "Visit clinic or join online consultation."
            }
          ].map((step, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
              <div className="text-blue-600 font-bold text-xl mb-2">
                Step {i + 1}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm">
                {step.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-14 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Need Medical Assistance?
        </h2>
        <p className="text-blue-100 mb-6">
          Connect with our doctors anytime, anywhere.
        </p>
        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition">
          Book Appointment
        </button>
      </section>

    </div>
  );
};

export default Service;