import React from "react";
import { MdOutlineCancel } from "react-icons/md";

const CheckoutPopup = ({ popup, duration , GenerateStripe }) => {
 

  return (
    <div className="h-screen w-screen bg-black bg-opacity-50 backdrop-blur-sm z-40 flex items-center justify-center">
      <div className="h-[300px] md:w-[400px] bg-white rounded-md p-4 relative">
        <div
          className="w-full flex justify-end items-center p-2 cursor-pointer"
          onClick={() => popup()}
        >
          <MdOutlineCancel/>
        </div>
        <div className="flex  flex-col items-start justify-center border rounded-md p-2 mt-7">
          <div>Card number : <b>4242 4242 4242 4242</b></div>
          <div>MM/YY : <b>12/2024 - ANY</b></div>
          <div>CVV : <b>123 - ANY</b></div>
        </div>
        <div className="text-[25px]  font-bold text-center py-3">
          {duration == 30 ? (
            <div>₹ 2000</div>
          ) : duration == 45 ? (
            <div>₹ 3000</div>
          ) : duration == 60 ? (
            <div>₹ 4000</div>
          ) : (
            ""
          )}
        </div>
        <div className="p-2 bg-black rounded-md text-white text-center cursor-pointer" onClick={() => GenerateStripe()}>Payment</div>
      </div>
    </div>
  );
};

export default CheckoutPopup;
