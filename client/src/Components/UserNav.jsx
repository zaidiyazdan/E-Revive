import React from 'react';
import logo from '../Assets/logo.png';
import ProfileDropdown from "./ProfileDropdown";

const UserNav = () => {
  return (
    <nav className="bg-gradient-to-br w-full from-gray-800 to-gray-900 shadow-lg py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img src={logo} className="h-8 mr-2" alt="navbar" />
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              E-Revive
            </span>
          </div>
          <div className="flex items-center">
          <ProfileDropdown/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNav;
