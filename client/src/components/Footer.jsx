import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-pink-500">VogueNest</h1>
          <p className="text-gray-400">
            Elevate your wardrobe with our latest fashion trends for women, men, and kids. Explore exclusive styles and
            get inspired by modern aesthetics.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-pink-500 hover:text-white transition duration-300">
              <FaFacebookF />
            </a>
            <a href="#" className="text-pink-500 hover:text-white transition duration-300">
              <FaTwitter />
            </a>
            <a href="#" className="text-pink-500 hover:text-white transition duration-300">
              <FaInstagram />
            </a>
            <a href="#" className="text-pink-500 hover:text-white transition duration-300">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-white">Quick Links</h2>
          <a href="#" className="hover:text-pink-500 transition duration-300">
            About Us
          </a>
          <a href="#" className="hover:text-pink-500 transition duration-300">
            Shop
          </a>
          <a href="#" className="hover:text-pink-500 transition duration-300">
            FAQs
          </a>
          <a href="#" className="hover:text-pink-500 transition duration-300">
            Contact Us
          </a>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-semibold text-white">Newsletter</h2>
          <p className="text-gray-400">
            Stay updated on the latest trends and offers! Subscribe to our newsletter.
          </p>
          <form className="flex space-x-2">
            <input
              type="email"
              className="w-full px-4 py-2 text-black rounded-md focus:outline-none"
              placeholder="Your email"
            />
            <button className="bg-pink-500 px-6 py-2 rounded-md text-white font-semibold hover:bg-pink-600 transition duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-600 pt-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 VogueNest. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
