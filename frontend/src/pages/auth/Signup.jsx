import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const SignUp = () => {
  const navigate = useNavigate();
  const IsLogged = useSelector((state) => state.auth.isLoggedIn);
  const Id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  // console.log(Id,token)
  useEffect(() => {
    if (Id && token) {
      navigate("/");
    } else if (IsLogged === false) {
      navigate("/signup");
    }
  }, []);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const SubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const notify = () => toast.warning("All Field Required");
      if (userName === "" && email === "" && phone === "" && password === "") {
        notify();
        // alert("All Field Are Required");
      }
      const Notification = (message) => toast.success(message);
      const response = await axios.post("http://localhost:5000/user/signup", {
        userName,
        email,
        phone,
        password,
      });
      if (response.status === 200) {
        Notification(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      const Warning = (errorMsg) => toast.warning(errorMsg);
      Warning(error.response.data.message);
      // console.log();
    }
  };
  return (
    <div className="flex items-center justify-center bg-gray-900 h-[98vh]">
      <div className="p-4 w-2/6 rounded bg-gray-600">
        <form action="" onSubmit={SubmitHandler}>
          <h1 className="flex items-center justify-center">User SignUp</h1>
          <label> UserName</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="UserName"
            className="w-full bg-gray-900 p-2 my-3 rounded"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="xyz@gmail.com"
            className="w-full bg-gray-900 p-2 my-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="00000000"
            className="w-full bg-gray-900 p-2 my-3 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="....."
            className="w-full bg-gray-900 p-2 my-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h4 className=" my-2">
            Already having a Account ?
            <Link to="/login" className="hover:text-blue-700 ml-2">
              Login
            </Link>
          </h4>
          <div className="flex items-center justify-center">
            <button className="p-2 bg-orange-400 w-full rounded hover:bg-orange-600  cursor-pointer">
              SignUp
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
