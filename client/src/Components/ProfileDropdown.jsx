import React, { useState } from "react";
import profile from "../Assets/profile-icon.png";
import { clearFacilityData } from "../Slice/facilitySlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUserData } from "../Slice/userSlice";

const ProfileDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const title = "User Profile";
  const items = [
    { label: "Username", value: userData.username },
    { label: "Email address", value: userData.email },
    { label: "Phone number", value: userData.phone },
    { label: "Address", value: userData.address },
  ];
  console.log(userData);
  const logout = () => {
    navigate("/User/login");
    dispatch(clearFacilityData());
    toast.success("Logout Successfull");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex items-center">
      <div className="ml-3 relative">
        <div className="max-w-xs bg-gradient-to-r from-green-600 to-green-400  pl-2 rounded-full flex items-center text-sm">
          <span className="sr-only">Open user menu</span>
          <span className="text-white font-medium pr-1 text-lg">
            Hi, Welcome back 👋
          </span>
          <button
            className="relative h-10 flex justify-center items-center w-10 overflow-hidden bg-gray-100 hover:bg-gray-200 rounded-full"
            onClick={toggleDropdown}
          >
            <div className="avatar online placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-16">
                <span className="text-xl">{userData.username[0]}</span>
              </div>
            </div>
          </button>
        </div>
        {isDropdownOpen && (
          <div className="bg-white absolute right-0 mt-2 w-[360px]  divide-y sm:divide-gray-300 overflow-hidden shadow-lg rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {title}
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <div className="sm:divide-y sm:divide-gray-300">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt className="text-sm font-medium text-gray-500">
                      {item.label}
                    </dt>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="py-1">
              <button
                onClick={logout}
                className="block px-4 font-semibold py-2 text-sm text-red-700 w-full hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDropdown;
