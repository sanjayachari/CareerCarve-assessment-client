import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Register from "./components/student/Register";
import Login from "./components/student/Login";
import MLogin from "./components/mentor/MLogin";
import MRegister from "./components/mentor/MRegister";
import Home from "./pages/Home";
import Checkout from "./components/checkout/Checkout";
import Right from "./components/dashboard/Right";
import Profile from "./components/profile/Profile";
import Success from "./components/success/Success";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/student-login" element={<Login />} />
          <Route path="/mentor-signup" element={<MRegister />} />
          <Route path="/mentor-login" element={<MLogin />} />
          <Route path="/dashboard" element={<Home />}>
            <Route path="landing" element={<Right />}></Route>
            <Route path=":id" element={<Checkout />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="success/:id/:studentId" element={<Success />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
