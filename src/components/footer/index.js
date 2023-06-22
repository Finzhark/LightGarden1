import React from "react";
import { useNavigate } from "react-router-dom"
import { FaTwitter, FaFacebook, FaInstagramSquare } from "react-icons/fa";


const Footer = () => {
    const navigate = useNavigate()

  return (
    <div className="w-full">
        <div className="flex justify-center">
            <div className="border rounded-lg border-black w-2/3"/>
        </div>

        <footer className="text-gray-900 py-4 ">
            <div className="mx-auto flex flex-col items-center">
                <div className="flex space-x-4 mb-4">
                </div>
                <p className="text-sm mb-2">
                Subscribe to our newsletter for getting new updates
                </p>
                <form className="flex">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="py-2 px-4 border border-gray-500 rounded-l focus:outline-none"
                />
                <button
                    type="submit"
                    className="btn btn-secondary ml-2 py-2 px-4  hover:bg-gray-600 transition-colors duration-300"
                >
                    Subscribe
                </button>
                </form>
                <p className="text-xs mt-4">
                © {new Date().getFullYear()} - All rights reserved
                </p>
                <div className="flex flex-row gap-3 my-2">
                    <FaTwitter className="text-2xl" href="https://facebook.com"/>
                    <FaFacebook className="text-2xl" href="https://twitter.com"/>
                    <FaInstagramSquare className="text-2xl" href="https://instagram.com"/>
                </div>
                </div>
        </footer>
    </div>
  );
};

export default Footer;


