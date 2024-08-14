import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import "../../index.css";
import { MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER } from "../../api/constant";
import { ThreeDot } from "react-loading-indicators";

const Right = () => {

    const [mentors , setMentors] = useState([])
    console.log('mentors',mentors)
  useEffect(() => {
    const fun = async () => {
      try {
        const response = await axios.get(`${SERVER}/get-mentor`, {
          withCredentials: true,
        });
        console.log(response);
        setMentors(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    fun();
  }, []);

  const arr = [
    {
      id: 0,
      name: "Sajay",
      Specialization: "Finanace",
    },
    {
      id: 1,
      name: "Sajay",
      Specialization: "HR",
    },
    {
      id: 2,
      name: "Sajay",
      Specialization: "Marketing",
    },
    {
      id: 3,
      name: "Sajay",
      Specialization: "FINOR",
    },
    {
      id: 4,
      name: "Sajay",
      Specialization: "ON",
    },
    {
      id: 5,
      name: "Sajay",
      Specialization: "AA",
    },
    {
      id: 6,
      name: "Sajay",
      Specialization: "Finanace",
    },
  ];

  return (
    <div className="w-full md:w-[80%] h-screen p-2 ">
      <div className="h-full w-full bg-white rounded-2xl p-5  overflow-scroll scroll-smooth no-scrollbar">
        <div className="flex gap-3 items-center border-2 border-opacity-30 rounded-xl  border-blue-500 px-8 ">
          <input
            type="text"
            className="p-4  w-full outline-none"
            name=""
            id=""
          />
          <IoSearch className="hover:scale-150 duration-500 cursor-pointer" onClick={()=>alert("Premium service with an additional charge.")} />
        </div>
        <div className="flex items-center justify-center py-10">
          <div className=" grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-10 items-centerplace-content-center content-center">
            {mentors?.length > 0 ? mentors?.map((e, i) => {
              return (
                <div
                  key={i}
                  className="hover:scale-110 duration-500 col-span-1 h-[300px] w-[300px] border border-black border-opacity-30 bg-gradient-to-r from-blue-100 to-white  shadow-xl rounded-md p-4"
                >
                  <div className="h-[100px] w-full flex items-center justify-center">
                    <MdPerson className="text-[50px] opacity-50" />
                  </div>
                  <div className="h-[150px] w-full  flex items-center justify-center flex-col">
                    <div className="text-center p-2">{e.fullName}</div>
                    <div className="text-center pb-10">{e.expertise}</div>
                    <Link
                      to={`/dashboard/${e._id}`}
                      className="p-2 bg-black bg-opacity-80 hover:bg-black duration-500 rounded-md text-white w-full text-center"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              );
            }) : <div className="h-full w-full flex items-center justify-center">
              <ThreeDot color="#6778c4" size="medium" text="" textColor="" />

            </div>  }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Right;
