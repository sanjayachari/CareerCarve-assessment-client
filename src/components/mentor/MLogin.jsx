import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";

const MLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });

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

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required!";
    if (!formData.fullName) newErrors.fullName = "Full name is required!";
    if (!formData.password) newErrors.password = "Password is required!";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle form submission (e.g., send data to the backend)
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="md:h-screen md:w-screen flex items-center justify-center bg-red-100">
      <div className="md:flex rounded-2xl shadow-2xl ">
        <div class="col-span-1 w-[333px] flex-col flex items-center justify-center bg-red-400 md:rounded-l-2xl p-5">
          <img src="/login.svg " alt="" />
          <div>Not a mentor?</div>
          <Link to={'/student-login'} className="font-semibold text-red-800">Login as student</Link>
        </div>

        <form action=""
          className="flex flex-col w-[333px] bg-white p-5 md:rounded-r-2xl "
          >
          <div className="flex gap-2 justify-between items-center">
            <h3 className="text-[20px] font-bold">Welcome</h3>
            <h3 className="text-[16px] font-semibold text-red-400 underline">
              Mentor
            </h3>
          </div>
          <div className="h-[90px] flex flex-col">
            <label for="" class="text-red-500 font-semibold mt-4 mb-2">
              Enter Email ID
            </label>
            <input
              type="email"
              class="py-2 px-4 rounded-[16px] border-black bg-red-100"
              placeholder="Loremipsum@gmail.com"
              name="email"
              required
              id=""
            />
            <div>
            </div>
          </div>
          <div class="h-[80px] flex flex-col mt-6">
            <label for="" class="text-red-500 font-semibold mb-2">
              Enter Password
            </label>
            <input
              type="password"
              class="py-2 px-4 rounded-[16px] border-black bg-red-100"
              placeholder="Password"
              required
            />

            <div>
            </div>
          </div>
          <button
            class="bg-red-500 text-white p-2 rounded-[16px] my-[10px]"
            type="submit"
          >
            Next
          </button>
          <div className="flex gap-2 my-2">
            <div>Don't have an account?</div>
            <Link to={'/mentor-signup'} className="font-semibold text-red-500">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MLogin;
