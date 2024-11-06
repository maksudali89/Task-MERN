import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../store/auth/auth";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const IsLogged = useSelector((state) => state.auth.isLoggedIn);
  // console.log(IsLogged)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // Use useEffect to handle navigation after render
  useEffect(() => {
    if (IsLogged === true) {
      navigate("/");
    }
  }, []);

  const LoginHandler = async (e) => {
    try {
      e.preventDefault();
      if (email === "" && password === "") {
        toast.warn("Email And Password Required");
      } else {
        const response = await axios.post("http://localhost:5000/user/login", {
          email,
          password,
        });
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        dispatch(LoginUser());
        navigate("/"); // You can still navigate here as it is inside a handler, not render
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 h-[98vh]">
      <div className="p-4 w-2/6 rounded bg-gray-600">
        <form action="" onSubmit={LoginHandler}>
          <h1 className="flex items-center justify-center">User Login</h1>
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
            Not having a Account ?
            <Link to="/signup" className="hover:text-blue-700 ml-2">
              SignUp
            </Link>
          </h4>
          <div className="flex  items-center justify-center">
            <button className="p-2 bg-orange-400 w-full rounded hover:bg-orange-600  cursor-pointer">
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
