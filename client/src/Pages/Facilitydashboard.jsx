import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Styles/Userdashboard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectFacilityData } from "../Slice/facilitySlice";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import Shimmer from "../Components/Shimmer";

const Facilitydashboard = () => {
  const navigate = useNavigate();
  const facilityData = useSelector(selectFacilityData);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { FacilityID } = useParams();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/request/getallrequests/${FacilityID}`
        );
        setRequests(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchRequests();
  }, [FacilityID]);

  const handleAccept = async (req_id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/request/completetransaction/${req_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Remove the request from the state
        setRequests(requests.filter((request) => request.req_id !== req_id));
        toast.success("Request Accepted");
      } else {
        throw new Error("Failed to accept transaction");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error("Error accepting request");
    }
  };

  const handleDecline = async (req_id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/request/rejectrequest/${req_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("REQUEST SENT");

      if (response.ok) {
        // Remove the request from the state
        setRequests(requests.filter((request) => request.req_id !== req_id));
        toast.success("Request Rejected");
      } else {
        throw new Error("Failed to reject request");
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("Failed to reject request");
    }
  };

  if (loading) {
    return(
       <Shimmer/>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Wrapper>
      <div className="bg-gray-800 text-white py-4 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold">{facilityData?.name}</h1>
              <span className="text-sm">{facilityData?.email}</span>
              <span className="text-sm mx-6">{facilityData?.address}</span>
            </div>
            <div>
              <button className="bg-gray-100 border-blue-600 border-2 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded" onClick={()=>{navigate(`/allrequests/${FacilityID}`)}}>
                Show All Requests
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg min-h-screen p-6 lg:p-8">
        <div>
          <h2 className="text-4xl font-bold text-center text-gray-700 sm:text-4xl pt-4 font-mono">
            Current Incoming Requests
          </h2>
          <div className="border-b-4 border-gray-600 mb-8 h-4 w-[30%] mx-auto"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {requests.map((Req) => (
            <div class="card w-96 bg-base-100 shadow-xl" key={Req.req_id}>
              <figure class="px-10 pt-10">
                <img src={Req.image} alt="ewaste" class="rounded-xl" />
              </figure>
              <div class="card-body items-center text-center">
                <h2 class="card-title">{Req.ewaste_name}</h2>
                <p className="flex justify-between">
                  <span className="font-bold mr-2">Weight: </span>
                  {Req.ewaste_weight}
                </p>
                <p className="flex justify-between">
                  <span className="font-bold mr-2">Type: </span>
                  {Req.ewaste_type}
                </p>
                <p className="flex justify-between">
                  <span className="font-bold mr-2">Price: </span>
                  {Req.ewaste_price}
                </p>
                <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleAccept(Req.req_id)}
                  className="flex mr-4 items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/5261/5261648.png"
                    alt="Accept"
                    className="w-5 h-5 mr-2"
                  />
                  Accept
                </button>
                <button
                  onClick={() => handleDecline(Req.req_id)}
                  className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3712/3712271.png"
                    alt="Decline"
                    className="w-6 h-6 mr-2"
                  />
                  Decline
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </Wrapper>
  );
};

export default Facilitydashboard;
