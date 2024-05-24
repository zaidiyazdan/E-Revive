import React, { useEffect, useState } from "react";
import { selectFacilityData } from "../Slice/facilitySlice";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Wrapper from "../Components/Wrapper";


const AllRequests = () => {
    const navigate = useNavigate();
  const facilityData = useSelector(selectFacilityData);
  const { FacilityID } = useParams();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/request/allpastrequest/${FacilityID}`
        );
        setRequests(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequests();
  }, []);

  return (
    <Wrapper> <div className="bg-gray-100 rounded-lg min-h-screen">
      <div className="bg-gray-800  text-white py-4 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold">{facilityData?.name}</h1>
              <span className="text-sm">{facilityData?.email}</span>
              <span className="text-sm mx-6">{facilityData?.address}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 lg:p-8">
        <div>
          <h2 className="text-4xl font-bold text-center text-gray-800 sm:text-4xl pt-4 font-mono">
            All Requests
          </h2>
          <div className="border-b-4 border-gray-700 mb-8 h-4 w-[18%] mx-auto"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {requests.map((Req) => (
            <div
              key={Req.req_id}
              className="w-full rounded-lg hover:border-2 hover:border-gray-800 shadow-md bg-white p-4 px-6"
            >
              <h3 className="font-semibold px-6 py-2 rounded-lg border-2 w-[126px] border-gray-700 bg-gray-100">{Req.status}</h3>
              <div className="mt-2">
                <div className="flex flex-col sm:flex-row justify-between">
                  <p className="flex items-center">
                    <span className="font-bold mr-2">Name:</span>
                    {Req.ewaste_name}
                  </p>
                  <p className="flex items-center">
                    <span className="font-bold mr-2">Weight:</span>
                    {Req.ewaste_weight}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-between">
                  <p className="flex items-center">
                    <span className="font-bold mr-2">Type:</span>
                    {Req.ewaste_type}
                  </p>
                  <p className="flex items-center">
                    <span className="font-bold mr-2">Price:</span>
                    {Req.ewaste_price}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-between">
                  <p className="flex items-center">
                    <span className="font-bold mr-2">User_ID:</span>
                    {Req.user_id}
                  </p>
                  <p className="flex items-center">
                    <span className="font-bold mr-2">Requested At: </span>
                    {Req.created_at}
                  </p>
                </div>
                {
                    Req.status === 'ACCEPTED' && <button className="bg-blue-500 hover:bg-blue-700 m-2 mb-0 text-white font-bold py-2 px-4 rounded">
                    COMPLETE TRANSACTION
                  </button>
                }
                {
                    Req.status === 'PENDING' && <button className="bg-green-500 hover:bg-green-700 m-2 mb-0 text-white font-bold py-2 px-4 rounded" onClick={()=>{navigate(`/facility/${FacilityID}`)}}> 
                    INCOMING REQUESTS
                  </button>
                }
                {
                    Req.status === 'REJECTED' && <button className="bg-red-500 hover:bg-red-600 px-auto m-2 mb-0 text-white font-bold py-2 px-4 rounded">
                    CANCELLED REQUEST
                  </button>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Wrapper>
  );
};

export default AllRequests;
