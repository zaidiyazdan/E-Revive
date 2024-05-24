import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import photo from "../Assets/dashboard.png";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubmitButton from "../Components/SubmitButton";
import { setUserData } from "../Slice/userSlice";
import { useDispatch } from "react-redux";
import Wrapper from "../Components/Wrapper";

const Userlogin = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmission = async () => {
    if (!values.email || !values.password) {
      setErrorMsg("Fill all fields");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        const { address, email, phone, user_id, username } = data.data[0];
        dispatch(setUserData({ user_id, username, email, address, phone }));
        navigate(`/User/${data.data[0].user_id}`);
        toast.success("Login successful");
      } else {
        setErrorMsg(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMsg("Failed to log in");
      toast.error("Failed to log in");
    }
    setLoading(false);
  };

  return (
    <Wrapper className="w-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row bg-gray-50 my-16 justify-center ">
        <div className="w-full lg:w-1/2 p-6 flex justify-center items-center">
          <div className="box-border  lg:w-[390px] px-6 py-6 rounded-2xl flex flex-col gap-8">
            <div className="text-center">
              <h1 className="text-3xl mt-4 text-green-600 font-bold">Login</h1>
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
                className="h-4 rounded-xl  p-4 border-none outline-none flex-1"
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
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
                className="h-4 rounded-xl  p-4 border-none outline-none flex-1"
              />
            </div>
            <div className="flex gap-2">
              Already have an account?
              <div className="text-green-600 underline">
                <Link to="/User/Signup"> Signup</Link>
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
        <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
          <img src={photo} alt="Recycle it" />
        </div>
      </div>
    </Wrapper>
  );
};

export default Userlogin;
