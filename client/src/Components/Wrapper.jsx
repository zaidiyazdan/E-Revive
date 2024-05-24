import React from "react";
import Footer from "./Footer";

const Wrapper = ({ children, classname }) => {
  return (
    <div
      className={`w-full mx-auto ${
        classname || ""
      }`}
    >
      {children}
      <Footer/>
    </div>
  );
};

export default Wrapper;
