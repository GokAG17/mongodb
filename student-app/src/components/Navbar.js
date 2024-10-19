import React from 'react';
import { Link } from 'react-router-dom';

//import logo from '../assets/logo.svg'; 

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* <img src={logo} alt="Logo" className="h-8 w-auto mr-2" />  */}
          <Link to="/" className="text-white font-bold text-lg">Student Management System</Link>
        </div>
        <div>
          <ul className="flex space-x-4 text-white">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/classes" className="hover:text-gray-300">Batches</Link></li>
            <li><Link to="/students" className="hover:text-gray-300">Students</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
