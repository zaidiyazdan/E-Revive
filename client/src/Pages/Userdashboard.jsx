import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom"; 
import "../Styles/Userdashboard.css";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import UserNav from "../Components/UserNav";
import Wrapper from "../Components/Wrapper";
import Shimmer from "../Components/Shimmer";

const Userdashboard = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { UserID } = useParams();
  console.log(UserID);
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/facility/allfacility"
        );
        console.log(response.data.data);
        setFacilities(response.data.data);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  if (loading) {
    return <Shimmer/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Wrapper className="h-full">
      <UserNav />
      <h1 className="text-center text-5xl font-bold pt-8 font-mono z-10">
        All Facilities
      </h1>
      <hr className="bg-green-600 h-2 w-[22%] mx-auto relative -z-10 top-[-12px]" />
      <div className="divider mx-auto mb-8 w-40 mt-4 rounded-full bg-green-600"></div>
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {facilities.map((facility) => (
          <div
            key={facility.f_id}
            className="facility-card rounded-lg hover:border-2 hover:border-green-600 shadow-md bg-white"
          >
            <div className="card-info flex flex-col p-4 justify-between">
              <h3 className="text-3xl font-semibold text-black my-2">
                {facility.name}
              </h3>
              <div className="flex flex-col items-start text-lg font-medium text-gray-700 mb-2">
                <div
                  className="flex items-center w-full justify-between
                 mb-1"
                >
                  <div className="flex flex-row items-center">
                    <FaEnvelope className="mr-2" />
                    Email:
                  </div>
                  <span> {facility.email}</span>
                </div>
                <div
                  className="flex items-center w-full justify-between
                 mb-1"
                >
                  <div className="flex flex-row items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    Address:
                  </div>
                  <span>{facility.address}</span>
                </div>
                <div
                  className="flex items-center w-full justify-between
                 mb-1"
                >
                  <div
                    className="flex items-center w-full justify-between
                 mb-1"
                  >
                    <div className="flex flex-row items-center">
                      <FaPhone className="mr-2" />
                      Phone:
                    </div>
                    <span>{facility.phone}</span>
                  </div>
                </div>
                <div
                  className="flex items-center w-full justify-between
                 mb-1"
                >
                  <span>Capacity: </span>
                  <span>{facility.capacity} Kg </span>
                </div>
              </div>
              <Link
                to={`/User/facility/${facility.f_id}/${UserID}`}
                className="inline-block w-full md:w-auto px-4 py-2 bg-green-600 text-white font-medium rounded-md text-center hover:bg-green-700 mt-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Request Facility
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Userdashboard;
