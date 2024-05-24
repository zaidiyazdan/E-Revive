import React from "react";
import "../Styles/AboutSection.css";
import { Link } from "react-router-dom";
import Bg from "../Assets/bg.png";
import Navbar from "../Components/Navbar";
import Wrapper from '../Components/Wrapper'

const AboutSection = () => {
  return (
    <Wrapper>
      {" "}
      <div className="overflow-hidden w-full h-full bg-gray-100">
        <Navbar />
        <div className=" flex font-sans items-center justify-center pt-8">
          <div className="w-4/5 h-full border-spacing-2 border-2 bg-white rounded-lg py-8 px-4">
            <h2 className="text-4xl font-bold text-center  text-green-600 sm:text-5xl">
              <img src={Bg} alt="logo" className="w-18 inline mx-2" /> About
              Re-Eco
            </h2>
            <p className="text-xl text-gray-900 font-semibold text-justify leading-loose py-8 px-6">
              ReEco is your one-stop solution for responsible electronic waste
              management. We're passionate about making it easy for individuals
              and businesses to contribute to a cleaner, greener planet by
              providing convenient and eco-friendly solution for recycling their
              E waste.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 mx-8">
                <h3 className="text-3xl font-bold">Our Mission</h3>
                <p className="text-xl text-black leading-relaxed">
                  ReEco is dedicated to empowering people and organizations to
                  recycle their electronic waste responsibly.
                </p>
              </div>
              <div className="space-y-4 mx-8">
                <h3 className="text-3xl font-bold">The Impact</h3>
                <p className="text-xl text-black leading-relaxed">
                  By choosing ReEco, you're not just recycling your devices,
                  you're making a real difference.
                </p>
                <Link
                  to="/User/login"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Join Our Mission
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AboutSection;
