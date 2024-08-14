import React from "react";
import { Link } from "react-router-dom";

const Left = () => {
  return (
    <div className="md:w-[20%] md:block hidden h-screen p-2">
      <div className="h-[80px] w-full border border-white border-opacity-70 rounded-2xl mb-10 flex items-center justify-center uppercase font-bold text-white cursor-pointer text-[20px]">CareerCarve</div>
      <div className="p-3 flex flex-col">
        <Link to={'landing'} className="p-2 border-b border-white text-white cursor-pointer">Home</Link>
        <div className="p-2 border-b border-white text-white cursor-not-allowed opacity-50">Event</div>
        <div  className="p-2 border-b border-white text-white cursor-not-allowed opacity-50">Profile</div>
      </div>
    </div>
  );
};

export default Left;
