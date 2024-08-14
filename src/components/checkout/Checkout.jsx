import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdPerson } from "react-icons/md";
import axios from "axios";
import { SERVER } from "../../api/constant";
import CheckoutPopup from "../checkoutPopup/CheckoutPopup";
import { v4 as uuidv4 } from "uuid";
import { ThreeDot } from "react-loading-indicators";

const Checkout = () => {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(30);
  const params = useParams();
  const [user, setUser] = useState([]);

  const [data, setData] = useState([]);
  console.log(data);
  const fun = async () => {
    try {
      const res = await axios.get(`${SERVER}/get-mentor/${params.id}`, {
        withCredentials: true,
      });
      console.log(res.data);
      setData(res.data.response);
      setUser(res.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(data?.events?.[data?.events?.length - 1]);
  useEffect(() => {
    fun();
  }, []);

  const [open, setOpen] = useState(false);
  const popup = async () => {
    setOpen(!open);
  };

  function parseTime(dateStr, timeStr) {
    const [day, month, year] = dateStr?.split("-").map(Number);
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return new Date(year, month - 1, day, hours, minutes);
  }
  //   data.events[data.events.length - 1]

  function scheduleBooking(duration, uu) {
    const now = new Date();

    // Retrieve the last booking's end time from the database
    const lastBookingEndTime = data?.events[data.events.length - 1]?.endTime;

    // Convert the last booking's end time to a Date object if available
    let lastEndTime = lastBookingEndTime
      ? parseTime(data.events[data.events.length - 1].date, lastBookingEndTime)
      : null;

    // Initialize the start time to the current time
    let startTime = new Date();
    startTime.setMinutes(now.getMinutes());
    startTime.setSeconds(now.getSeconds());

    // If there are existing bookings and the last booking's end time is earlier than the current time
    if (lastEndTime && lastEndTime < now) {
      // Set the start time to the current time
      startTime = new Date();
      startTime.setMinutes(now.getMinutes());
      startTime.setSeconds(now.getSeconds());
    } else if (data?.events && data.events.length > 0) {
      // Start immediately after the last booking
      lastEndTime =
        lastEndTime ||
        parseTime(
          data.events[data.events.length - 1].date,
          data.events[data.events.length - 1].endTime
        );
      startTime = new Date(lastEndTime.getTime() + 60000); // Add 1 minute to avoid overlap
    }

    const endTime = new Date(startTime.getTime() + duration * 60000); // Calculate end time

    // Format times and date
    const formattedStartTime = startTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const formattedEndTime = endTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const formattedDate = `${startTime.getDate()}-${
      startTime.getMonth() + 1
    }-${startTime.getFullYear()}`;

    // Prepare new booking details
    const newBooking = {
      isPayment: false,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      date: formattedDate,
      studentName: user.fullName,
      studentExpertise: user.expertise,
      studentId: uu,
    };

    // Update the database or data structure with the new booking details
    // This part depends on how your application interacts with the database
    // For demonstration, we'll just return the new booking details
    return newBooking;
  }

  // Example usage:
  // console.log(scheduleBooking(60)); // First booking
  // console.log(scheduleBooking(45)); // Second booking, starts after the first ends

  const [uuId, setUuId] = useState("");
  const GenerateStripe = async () => {
    const uu = uuidv4();
    setUuId(uu);
    const amount =
      duration == 30 ? 2000 : duration == 45 ? 3000 : duration == 60 ? 4000 : 0;
    const date =
      new Date().getDay() +
      "-" +
      new Date().getMonth() +
      "-" +
      new Date().getFullYear();
    try {
      const updatePayment = await axios.post(
        `${SERVER}/bookSession/${params.id}`,
        scheduleBooking(duration, uu)
      );
      console.log(updatePayment.data);
      const res = await axios.post(`${SERVER}/checkout`, {
        amount: amount,
        id: params.id,
        studentId: uu,
      });
      console.log(res.data);
      if (res.status == 200) {
        // navigate(`/${res.data.url}`)
        window.location = res.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full md:w-[80%] h-screen p-2 ">
      <div className="absolute top-0 left-0 z-30">
        {open && (
          <CheckoutPopup
            popup={popup}
            duration={duration}
            GenerateStripe={GenerateStripe}
          />
        )}
      </div>
      <div className="h-full w-full bg-white rounded-2xl p-5  overflow-scroll scroll-smooth no-scrollbar z-20">
        <Link to={"/dashboard/landing"} className="flex gap-3 items-center">
          <IoMdArrowBack className="text-[30px]" /> back
        </Link>
        {data && data?._id ? (
          <div className="border border-black border-opacity-30 bg-gradient-to-r from-blue-100 to-white  shadow-xl rounded-md md:w-[400px] relative p-5 my-5 ">
            <div className=" items-center justify-center flex flex-col">
              <MdPerson className="text-[50px]" />
              <div>{data?.fullName}</div>
              <div>{data?.expertise}</div>
            </div>
            <div className="flex gap-4  py-5 items-center justify-center">
              <div
                className={`p-2 rounded-md ${
                  duration == 30
                    ? "border-2 border-black shadow-xl"
                    : "border border-black"
                }  cursor-pointer`}
                onClick={() => setDuration(30)}
              >
                30 MINS
              </div>
              <div
                className={`p-2 rounded-md  ${
                  duration == 45
                    ? "border-2 border-black shadow-xl"
                    : "border border-black"
                }   cursor-pointer`}
                onClick={() => setDuration(45)}
              >
                45 MINS
              </div>
              <div
                className={`p-2 rounded-md  ${
                  duration == 60
                    ? "border-2 border-black shadow-xl"
                    : "border border-black"
                }  cursor-pointer`}
                onClick={() => setDuration(60)}
              >
                60 MINS
              </div>
            </div>
            <div
              className="p-2 bg-black bg-opacity-80 hover:bg-black duration-500 rounded-md text-white w-full text-center cursor-pointer"
              onClick={() => popup()}
            >
              Book
            </div>
          </div>
        ) : (
          <div className=" flex items-center justify-center my-10">
              <ThreeDot color="#6778c4" size="medium" text="" textColor="" />

            </div> 
        )}
      </div>
    </div>
  );
};

export default Checkout;
