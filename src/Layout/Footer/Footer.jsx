import React from "react";
import {
    FaFacebookF,
    FaLinkedinIn,
    FaTwitter,
    FaHeartbeat,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-20">

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-16">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-600 p-3 rounded-2xl">
                                <FaHeartbeat className="text-white text-xl" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Dr<span className="text-blue-600">Meet</span>
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Healthcare Platform
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                            Your trusted healthcare companion. Find experienced doctors,
                            schedule appointments, and manage your healthcare journey
                            effortlessly.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-5">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-3">
                            <Link
                                to="/"
                                className="text-gray-600 hover:text-blue-600 transition"
                            >
                                Home
                            </Link>

                            <Link
                                to="/alldoctor"
                                className="text-gray-600 hover:text-blue-600 transition"
                            >
                                Doctors
                            </Link>

                            <Link
                                to="/service"
                                className="text-gray-600 hover:text-blue-600 transition"
                            >
                                Services
                            </Link>

                            <Link
                                to="/profile_page"
                                className="text-gray-600 hover:text-blue-600 transition"
                            >
                                Profile
                            </Link>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-5">
                            Services
                        </h3>

                        <div className="flex flex-col gap-3">
                            <p className="text-gray-600">
                                Online Appointment
                            </p>

                            <p className="text-gray-600">
                                Doctor Consultation
                            </p>

                            <p className="text-gray-600">
                                Medical Support
                            </p>

                            <p className="text-gray-600">
                                Emergency Help
                            </p>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-5">
                            Contact Us
                        </h3>

                        <div className="space-y-3">
                            <p className="text-gray-600">
                                support@drmeet.com
                            </p>

                            <p className="text-gray-600">
                                +880 1234-567890
                            </p>

                            <p className="text-gray-600">
                                Available 24/7
                            </p>
                        </div>

                        {/* Social */}
                        <div className="flex gap-3 mt-6">

                            <a
                                href="https://www.facebook.com/durjoy.chando.2024"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="https://x.com/DurjoyChando"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
                            >
                                <FaTwitter />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/durjoy-chando-4a9878317/"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
                            >
                                <FaLinkedinIn />
                            </a>

                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">

                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} DrMeet. All rights reserved.
                    </p>

                    <div className="flex gap-5 text-sm">
                        <span className="text-gray-500 hover:text-blue-600 cursor-pointer">
                            Privacy Policy
                        </span>

                        <span className="text-gray-500 hover:text-blue-600 cursor-pointer">
                            Terms & Conditions
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;