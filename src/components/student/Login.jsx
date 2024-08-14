import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER } from "../../api/constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      return alert("empty");
    } else {
      try {
        const res = await axios.post(
          `${SERVER}/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        console.log(res.data);
        if (res.status == 200) {
          setTimeout(() => {
            // console.log('hello')
            navigate("/dashboard/landing");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
        alert(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className="md:h-screen md:w-screen flex items-center justify-center bg-red-100">
      <div className="md:flex rounded-2xl shadow-2xl ">
        <div class="col-span-1 w-[333px] flex-col flex items-center justify-center bg-blue-400 md:rounded-l-2xl p-5">
          <img src="/login.svg " alt="" />
          <div>Not a student?</div>
          <Link to={"/mentor-login"} className="font-semibold text-blue-800">
            Login as mentor
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-[333px] bg-white p-5 md:rounded-r-2xl "
        >
          <div className="flex gap-2 justify-between items-center">
            <h3 className="text-[20px] font-bold">Welcome</h3>
            <h3 className="text-[16px] font-semibold text-blue-400 underline">
              Student
            </h3>
          </div>
          <div className="h-[90px] flex flex-col">
            <label for="" class="text-[#0069D1] font-semibold mt-4 mb-2">
              Enter Email ID
            </label>
            <input
              type="email"
              class="py-2 px-4 rounded-[16px] border-black bg-[#E4ECEE]"
              placeholder="Loremipsum@gmail.com"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              id=""
            />
            <div></div>
          </div>
          <div class="h-[80px] flex flex-col mt-6">
            <label for="" class="text-[#0069D1] font-semibold mb-2">
              Enter Password
            </label>
            <input
              type="password"
              class="py-2 px-4 rounded-[16px] border-black bg-[#E4ECEE]"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <div></div>
          </div>
          <button
            class="bg-[#0069D1] text-white p-2 rounded-[16px] my-[10px]"
            type="submit"
          >
            Next
          </button>
          <div className="flex gap-2 my-2">
            <div>Don't have an account?</div>
            <Link to={"/"} className="font-semibold text-blue-500">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
