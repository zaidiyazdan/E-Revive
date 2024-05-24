import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from "../Components/Wrapper";
import UserNav from "../Components/UserNav";

const RequestFacility = () => {
  const [image, setImage] = useState({ preview: "", data: "" });

  const [values, setValues] = useState({
    weight: "",
    type: "",
    name: "",
    price: "",
  });

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const { Facility_ID, UserID } = useParams();
  console.log(Facility_ID, UserID);

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!values.weight || !values.type || !values.name || !values.price) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);

    try {
      let formData = new FormData();
      formData.append("file", image.data);
      formData.append("weight", values.weight);
      formData.append("type", values.type);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("facilityId", Facility_ID);
      formData.append("userId", UserID);

      const response = await fetch(
        "http://localhost:5000/request/create-request",
        {
          method: "POST",
          body: formData,
        }
      );

      setValues({
        weight: "",
        type: "",
        name: "",
        price: "",
      });

      setImage({ preview: "", data: "" });

      if (response.ok) {
        toast.success("Request sent successfully");
      } else {
        throw new Error("Failed to send request");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to send request");
    } finally {
      setSubmitButtonDisabled(false);
    }
  };

  return (
    <Wrapper className="h-full">
      <UserNav />
      <div className="min-h-screen w-full overflow-x-hidden bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(175,225,170,.5)_100%)] flex flex-col lg:flex-row justify-center py-8">
        <div className="w-full lg:w-1/2 border-2 bg-gray-50 rounded-lg shadow-md  flex flex-col py-6 items-center">
          <h1 className="text-3xl font-bold text-center text-gray-800 my-8">
            Send Your E waste Request to Facility
          </h1>
          <div class=""></div>
          {/* <div className="bg-blue-600 h-2 w-full mx-auto relative -z-10 top-[-12px]"></div> */}
          <div className="flex flex-col items-center justify-center">
            <form
              onSubmit={handleSubmission}
              className="box-border border-2 bg-blue-100 border-blue-700 mx-2 px-8 w-[390px] p-4 rounded-2xl flex flex-col gap-3"
            >
              <div className="text-center">
                <h1 className="text-3xl mt-5 text-blue-800 font-bold">
                  Enter Product details
                </h1>
              </div>
              <div className="flex gap-1 mt-3 bg-white border-2 border-blue-600 rounded-xl h-12 p-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3250/3250738.png"
                  alt="name"
                  className="w-8 h-8 rounded-xl ml-2"
                />
                <input
                  type="Number"
                  placeholder="Weight (gm)"
                  value={values.weight}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      weight: event.target.value,
                    }))
                  }
                  className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
                />
              </div>
              <div className="flex items-center gap-1 mt-3 bg-white border-2 border-blue-600 rounded-xl h-12 px-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/6631/6631972.png"
                  alt="name"
                  className="w-8 h-8 rounded-xl ml-2"
                />
                <select
                  value={values.type}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, type: event.target.value }))
                  }
                  className="flex-1 h-full rounded-xl p-2 border-none outline-none bg-transparent"
                >
                  <option value="">Select an option</option>
                  <option value="Light home appliances">
                    Light home appliances
                  </option>
                  <option value="Heavy home appliances">
                    Heavy home appliances
                  </option>
                  <option value="IoT waste">IoT waste</option>
                  <option value="Industry waste">Industry waste</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="flex gap-1 mt-3 bg-white border-2 border-blue-600 rounded-xl h-12 p-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/5409/5409893.png"
                  alt="name"
                  className="w-8 h-8 rounded-xl ml-2"
                />
                <input
                  type="text"
                  placeholder="Product Name"
                  value={values.name}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, name: event.target.value }))
                  }
                  className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
                />
              </div>
              <div className="flex gap-1 mt-3 bg-white border-2 border-blue-600 rounded-xl h-12 p-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/12725/12725629.png"
                  alt="name"
                  className="w-8 h-8 rounded-xl ml-2"
                />
                <input
                  type="Number"
                  placeholder="₹ Price"
                  value={values.price}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      price: event.target.value,
                    }))
                  }
                  className="w-80 h-4 rounded-xl  p-4 border-none outline-none"
                />
              </div>
              {image.preview && (
                <img
                  src={image.preview}
                  alt="e-waste"
                  width="100"
                  height="100"
                />
              )}
              <label className="form-control w-full max-w-xs">
                <div className="label mt-2 font-semibold">
                  <span className="label-text">Add Device Image</span>
                </div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  class="file-input file-input-bordered file-input-primary w-full max-w-xs font-semibold border-2 border-blue-600"
                />
              </label>
              <b className="text-red-700">{errorMsg}</b>
              <button
                className={`btn btn-secondary border-none ${
                  submitButtonDisabled
                    ? "bg-blue-400" 
                    : "bg-blue-600 hover:bg-blue-400"
                }`}
                disabled={submitButtonDisabled}
              >
                {submitButtonDisabled ? (
                  <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                </svg>
                ) : (
                  "Submit"
                )}
              </button>
              <b></b>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default RequestFacility;
