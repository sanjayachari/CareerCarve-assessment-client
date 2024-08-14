import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { SERVER } from "../../api/constant";
import axios from "axios";

const MRegister = () => {

  const [isRegistered, setIsRegistered] = useState(false);
  const items = [
    {
      label: <div onClick={() => setExpertise("FMCG Sales")}>FMCG Sales</div>,
      key: "0",
    },
    {
      label: (
        <div onClick={() => setExpertise("Equity Research")}>
          Equity Research
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div onClick={() => setExpertise("Digital Marketing")}>
          Digital Marketing
        </div>
      ),
      key: "2",
    },
    {
      label: <div onClick={() => setExpertise("Finance")}>Finance</div>,
      key: "3",
    },
    {
      label: <div onClick={() => setExpertise("E-Commerce")}>E-Commerce</div>,
      key: "4",
    },
  ];
  const [expertise, setExpertise] = useState("Finance");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, fullName, expertise, password);
    if (email == "" || fullName == "" || password == "") {
      return alert("empty");
    } else {
      try {
        const res = await axios.post(`${SERVER}/register`, {
          email,
          fullName,
          expertise,
          password,
          userType: "mentor",
        });
        console.log(res.data);
        if(res.status == 200){
          setIsRegistered(true)

          // setTimeout(()=>{
          //   // console.log('hello')
          //   navigate('/mentor-login')
          // },2000)
        }
      } catch (error) {
        alert(error?.response?.data?.message)
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="md:h-screen md:w-screen flex items-center justify-center bg-red-100">
        <div className="md:flex rounded-2xl shadow-2xl ">
          <div class="col-span-1 w-[333px] flex-col flex items-center justify-center bg-red-400  md:rounded-l-2xl p-5">
            <img src="/login.svg " alt="" />
            <div>Not a mentor?</div>
            <Link to={"/"} className="font-semibold text-red-800">
              Register as student
            </Link>
          </div>
          {isRegistered ? (
            <div class="flex flex-col items-center justify-center h-[500px] w-[333px]">
              <div class="relative h-[100px] w-[100px] ">
                <img src="/successlogo.svg" className="h-[100px] w-[100px" alt="" />
                <img
                  src="/right.svg"
                  class="absolute top-0 left-0 bottom-0 right-0 m-auto p-5"
                  alt=""
                />
              </div>
              <div class="text-[25px] font-semibold mt-[34px]">
                Welcome to CareerCarve!
              </div>
              <div class="text-[#767676] mt-[10px] px-5">
                Redirecting you to the Login screen. This might take a few
                seconds...
              </div>
            </div>
          ) : (
            <form
              className="flex flex-col w-[333px] h-[500px] bg-white p-5 md:rounded-r-2xl "
              onSubmit={handleSubmit}
            >
              <div className="flex gap-2 justify-between items-center">
                <h3 className="text-[20px] font-bold">Create Account</h3>
                <h3 className="text-[16px] font-semibold text-red-500 underline">
                  Mentor
                </h3>
              </div>

              <div className="h-[90px] flex flex-col">
                <label
                  htmlFor="email"
                  className="text-red-500 font-semibold mt-3 mb-2"
                >
                  Enter Email ID
                </label>
                <input
                  type="email"
                  className="py-2 px-4 rounded-[16px] border-black bg-red-100"
                  placeholder="Loremipsum@gmail.com"
                  name="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}

                />
              </div>
              <div className="h-[80px] flex flex-col mb-2">
                <label
                  htmlFor="fullName"
                  className="text-red-500 font-semibold my-2"
                >
                  Enter Full name
                </label>
                <input
                  type="text"
                  className="py-2 px-4 rounded-[16px] border-black bg-red-100"
                  placeholder="Full name"
                  name="fullName"
                  value={fullName}
                  required
                  onChange={(e) => setFullName(e.target.value)}

                />
              </div>
              <div className="h-[80px] flex flex-col mb-2">
                <label
                  htmlFor="fullName"
                  className="text-red-500 font-semibold my-2"
                >
                  Choose Your Specialization
                </label>
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                  className="w-full py-2 px-4 rounded-[16px] border-black bg-red-100"
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space className="flex justify-between items-center text-opacity-80 text-[14px]">
                      {expertise}
                      <DownOutlined className="text-[14px]" />
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <div className="h-[80px] flex flex-col mb-2">
                <label
                  htmlFor="password"
                  className="text-red-500 font-semibold my-2"
                >
                  Create Password
                </label>
                <input
                  type="password"
                  className="py-2 px-4 rounded-[16px] border-black bg-red-100"
                  placeholder="Password"
                  name="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              <button
                className="bg-red-500 text-white p-2 rounded-[16px]"
                type="submit"
              >
                Next
              </button>
              <div className="flex gap-2 my-2">
                <div>Already have an account?</div>
                <Link
                  to={"/mentor-login"}
                  className="font-semibold text-red-500"
                >
                  Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default MRegister;
