import React from 'react';
import { FaStethoscope, FaUserMd, FaTooth, FaHeartbeat, FaNotesMedical, FaVideo } from 'react-icons/fa';


const Service = () => {
    const services = [
        { id: 1, icon: <FaStethoscope />, title: "General Consultation", description: "Consult with general physicians for common health issues." },
        { id: 2, icon: <FaUserMd />, title: "Specialist Doctor", description: "Book appointments with expert specialists across departments." },
        { id: 3, icon: <FaTooth />, title: "Dental Care", description: "Access top dental clinics and doctors near you." },
        { id: 4, icon: <FaHeartbeat />, title: "Cardiology", description: "Consult with heart specialists for cardiac-related issues." },
        { id: 5, icon: <FaVideo />, title: "Online Video Consultation", description: "Talk to doctors from your home via secure video call." },
        { id: 6, icon: <FaNotesMedical />, title: "Health Packages", description: "Routine check-ups and complete health packages at affordable rates." },
    ];
    return (
        <div className="bg-base-100 text-base-content">

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 py-16 text-center">
                <h1 className="text-4xl font-bold text-blue-800">Our Services</h1>
                <p className="text-gray-600 mt-2">Comprehensive care tailored to your needs</p>
            </div>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto px-4 py-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {services.map(service => (
                    <div key={service.id} className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition">
                        <div className="text-4xl text-primary mb-4">{service.icon}</div>
                        <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                        <p className="text-gray-600">{service.description}</p>
                    </div>
                ))}
            </section>

            {/* How It Works Section */}
            <section className="bg-base-200 py-16 text-center">
                <h2 className="text-3xl font-bold mb-8">How It Works</h2>
                <div className="flex flex-col md:flex-row justify-center gap-12 max-w-4xl mx-auto">
                    <div>
                        <h3 className="text-xl font-bold">1. Search Doctor</h3>
                        <p className="text-gray-600">Find the right specialist for your condition.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">2. Book Appointment</h3>
                        <p className="text-gray-600">Choose your date, time, and preferred method.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">3. Get Treated</h3>
                        <p className="text-gray-600">Visit clinic or join video call for consultation.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-primary text-white py-12 text-center">
                <h2 className="text-2xl font-bold mb-2">Need Help Finding the Right Service?</h2>
                <p className="mb-4">Talk to our support team or start browsing our doctors.</p>
                <button className="btn btn-secondary">Book Now</button>
            </section>

        </div>
    );
};

export default Service;