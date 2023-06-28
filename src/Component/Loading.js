import React from "react";
import loading from "../Images/1494.gif";

const Loading = () => (
  <div className="spinner flex justify-center w-full h-screen items-center">
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;