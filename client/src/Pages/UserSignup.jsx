import React, { useState } from "react";
import { Link } from "react-router-dom";
import photo from "../Assets/dashboard.png";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubmitButton from "../Components/SubmitButton";
import Wrapper from "../Components/Wrapper";

const Usersignup = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    address: "",
    phone: "",
    username: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmission = async () => {
    if (!values.email || !values.password || !values.phone || !values.address) {
      setErrorMsg("Fill all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(response);
      if (response.ok) {
        toast.success("User registered successfully");
        setValues({
          email: "",
          password: "",
          address: "",
          phone: "",
          username: "",
        });
        setErrorMsg("");
      } else {
        toast.error("Failed to register user");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMsg("Failed to register user");
      toast.error("Failed to register user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper className="w-screen min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-col lg:flex-row justify-center my-16">
        <div className="w-full lg:w-1/2 p-4 flex justify-center items-center">
          <div className="box-border w-[390px] p-4 rounded-2xl flex flex-col gap-6">
            <div className="text-center">
              <h1 className="text-3xl mt-12 text-green-600 font-bold">
                Signup
              </h1>
            </div>
            <div className="flex gap-1 mt-3 bg-white border-2 border-green-600 rounded-xl h-12 p-2">
              <img
                src="https://cdn-icons-png.flaticon.com/128/10969/10969079.png"
                alt="name"
                className="w-8 h-8 rounded-xl ml-2"
              />
              <input
                type="text"
                placeholder="Username"
                value={values.username}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    username: event.target.value,
                  }))
                }
                className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
              />
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
                value={values.email}
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
            <div className="flex gap-1 mt-3 bg-white border-2 border-green-600 rounded-xl h-12 p-2">
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
            <div className="flex gap-1 mt-3 bg-white border-2 border-green-600 rounded-xl h-12 p-2">
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
            <div className="flex gap-2">
              Already have an account?
              <div className="text-green-800 underline">
                <Link to="/User/login"> Login</Link>
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
        <div className="w-full lg:w-1/2 flex justify-center items-center p-4">
          <img src={photo} alt="Recycle it" />
        </div>
      </div>
    </Wrapper>
  );
};

export default Usersignup;
