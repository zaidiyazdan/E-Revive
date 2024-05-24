import React, { useState } from "react";
import photo from "../Assets/ewaste.webp";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubmitButton from "../Components/SubmitButton";
import Navbar from "../Components/Navbar";
import Wrapper from "../Components/Wrapper";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    capacity: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmission = () => {
    if (
      !values.name ||
      !values.email ||
      !values.password ||
      !values.capacity ||
      !values.address ||
      !values.phone
    ) {
      setErrorMsg("Fill all fields");
      console.log(values);
      return;
    }

    setLoading(true);
    fetch("http://localhost:5000/facility/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Registration successful");
          setValues({
            name: "",
            email: "",
            password: "",
            address: "",
            phone: "",
            capacity: "",
          });
          setErrorMsg("");
        } else {
          throw new Error("Failed to register");
        }
      })
      .catch((error) => {
        console.error("Error registering:", error);
        toast.error("Failed to register");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Wrapper className="overflow-hidden">
      <Navbar />
      <div className="flex flex-col my-16 lg:flex-row justify-center">
        <div className="w-full lg:w-1/2 p-4 h-screen flex justify-center items-center">
          <div className="box-border w-[390px] p-4 rounded-2xl flex flex-col gap-5">
            <div className="text-center">
              <h1 className="text-3xl mt-1 text-green-600 font-bold">Signup</h1>
            </div>
            <div className="flex gap-1 mt-2 bg-white border-2 border-green-600 rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/10969/10969079.png"
                alt="name"
                className="w-8 h-8 rounded-xl"
              />
              <input
                type="text"
                placeholder="Name"
                value={values.name}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, name: event.target.value }))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
            </div>
            <div className="flex gap-1 mt-2 bg-white border-2 border-green-600 rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/14035/14035965.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
            </div>
            <div className="flex gap-1 mt-2 bg-white border-2 border-green-600 rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/10969/10969350.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
            </div>
            <div className="flex gap-1 mt-2 bg-white border-2 border-green-600 rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/14090/14090489.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="text"
                placeholder="Address"
                value={values.address}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    address: event.target.value,
                  }))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
            </div>
            <div className="flex gap-1 mt-2 bg-white border-2 border-green-600 rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/14360/14360764.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="text"
                placeholder="Phone"
                value={values.phone}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, phone: event.target.value }))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
            </div>
            <div className="flex gap-1 mt-2 bg-white border-2 border-green-600 rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1599/1599763.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="Number"
                placeholder="capacity"
                value={values.capacity}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    capacity: event.target.value,
                  }))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
            </div>
            <div className="flex gap-2">
              Already have an account?
              <div className="text-green-800 underline">
                <Link to="/facility/login"> Login</Link>
              </div>
            </div>
            <b className="text-red-700 m-0">{errorMsg}</b>
            <SubmitButton
              onClick={handleSubmission}
              btnTitle="Register"
              loading={loading}
              bgColor="green"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <img src={photo} alt="Recycle it" />
        </div>
      </div>
    </Wrapper>
  );
}
