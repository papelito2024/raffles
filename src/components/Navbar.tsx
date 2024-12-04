import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Trophy } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">RaffleHub</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/admin"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
            >
              <Gift className="h-4 w-4" />
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;