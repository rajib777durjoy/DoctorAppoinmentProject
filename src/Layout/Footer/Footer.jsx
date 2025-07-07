import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Logo & Description */}
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-2">Dr.Meet</h2>
                    <p>Your trusted healthcare partner. Book appointments with top doctors anytime, anywhere.</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="footer-title">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="/" className="link link-hover">Home</a></li>
                        <li><a href="/about" className="link link-hover">About Us</a></li>
                        <li><a href="/services" className="link link-hover">Services</a></li>
                        <li><a href="/" className="link link-hover">Contact</a></li>
                    </ul>
                </div>

                {/* Appointment & Support */}
                <div>
                    <h4 className="footer-title">Appointments</h4>
                    <ul className="space-y-2">
                        <li><a href="/alldoctor" className="link link-hover">Find a Doctor</a></li>
                        <li><a href="/login" className="link link-hover">Login</a></li>
                        <li><a href="/register" className="link link-hover">Register</a></li>
                        <li><a href="/" className="link link-hover">Help Center</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h4 className="footer-title">Follow Us</h4>
                    <div className="flex gap-4 mt-2 text-xl">
                        <a href="https://www.facebook.com/durjoy.chando.2024" target='_blank'><FaFacebook /></a>
                        <a href="https://x.com/DurjoyChando" target='_blank'><FaTwitter /></a>
                        <a href="https://www.linkedin.com/in/durjoy-chando-4a9878317/" target='_blank'><FaLinkedin /></a>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">© {new Date().getFullYear()} Dr.Meet. All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;