import React, { useState } from "react";
import photo from "../Assets/eWaste-Recycling.png";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubmitButton from "../Components/SubmitButton";
import { useDispatch } from "react-redux";
import { setFacilityData } from "../Slice/facilitySlice";
import Navbar from "../Components/Navbar";
import Wrapper from "../Components/Wrapper";

export default function Login() {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmission = async () => {
    if (!values.email || !values.password) {
      setErrorMsg("Fill all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/facility/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();

      if (data && data.data && data.data[0] && data.data[0].f_id) {
        const { name, email, address, f_id } = data.data[0];
        dispatch(setFacilityData({ id: f_id, name, email, address }));
        navigate(`/facility/${data.data[0].f_id}`);
        toast.success("Login successful");
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMsg("Failed to login");
      toast.error("Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper className="overflow-hidden">
      <Navbar />
      <div className="flex flex-col lg:flex-row justify-center my-16">
        <div className="w-full lg:w-1/2 p-4 flex justify-center items-center">
          <div className="box-border w-[390px] p-4 rounded-2xl flex flex-col gap-6">
            <div className="text-center">
              <h1 className="text-3xl mt-5 text-green-600 font-bold">
                Login as Facility
              </h1>
            </div>
            <div className="flex gap-1 mt-3 bg-white border-2 border-green-600 rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/14035/14035965.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
            </div>
            <div className="flex gap-1 mt-3 bg-white border-2 border-green-600 rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/10969/10969350.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="password"
                placeholder="password"
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
            </div>
            <div className="flex gap-2 text-lg">
              Create new account
              <div className=" text-green-600 underline">
                <Link to="/facility/Signup"> Sign up</Link>
              </div>
            </div>
            <b className="text-red-700">{errorMsg}</b>
            <SubmitButton
              onClick={handleSubmission}
              btnTitle="Login"
              loading={loading}
              bgColor="green"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2  p-4">
          <img src={photo} alt="Recycle it" />
        </div>
      </div>
    </Wrapper>
  );
}
