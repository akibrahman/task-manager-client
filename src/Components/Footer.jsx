import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Social Media Links */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Connect with us</h3>
          <div className="flex space-x-4">
            <Link
              target="_blank"
              to="https://www.facebook.com"
              className="hover:text-gray-400 transition duration-300"
            >
              <FaFacebook />
            </Link>
            <Link
              target="_blank"
              to="https://www.twitter.com"
              className="hover:text-gray-400 transition duration-300"
            >
              <FaTwitter />
            </Link>
            <Link
              target="_blank"
              to="https://www.linkedin.com"
              className="hover:text-gray-400 transition duration-300"
            >
              <FaLinkedin />
            </Link>
            <Link
              target="_blank"
              to="https://www.instagram.com"
              className="hover:text-gray-400 transition duration-300"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>

        {/* Subscription Field */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">
            Subscribe to our newsletter
          </h3>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-48 border border-gray-600 rounded-l focus:outline-none"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none">
              Subscribe
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="hover:text-gray-400 transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-400 transition duration-300"
              >
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p className="text-center py-2 bg-primary text-white font-semibold">
          All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
