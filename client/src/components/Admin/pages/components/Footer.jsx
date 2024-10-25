import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-16">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Company Info */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <p className="text-xl font-semibold">
              <span className="text-red-600">©</span> 2024 FastX. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 mt-2 max-w-xs mx-auto md:mx-0">
              FastX is a leading logistics company, providing fast and reliable services for all your needs.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-sm">
            <a href="#" className="hover:text-red-600 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-red-600 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-red-600 transition-colors duration-300">Support</a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 mt-6 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-xs">
          <p>Designed and Developed by FastX Team</p>
        </div>
      </div>
    </footer>
  );
}


