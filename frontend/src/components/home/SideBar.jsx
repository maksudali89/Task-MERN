import React from "react";
import { DataItems } from "../config/SideBarData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../../store/auth/auth";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserLogOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    dispatch(LogOut());
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full">
      <div>
        <h1 className="text-xl font-semibold">Task Management</h1>
        <h2 className="my-3 text-sm text-gray-400">example123@gmail.com</h2>
        <hr />
      </div>

      <div className="flex-grow">
        {DataItems.map((items) => (
          <div
            key={items.id}
            onClick={() => navigate(items.path)}
            className="my-2 flex items-center rounded-md p-2 cursor-pointer hover:bg-purple-300 text-white transition-all duration-300"
          >
            <i>{items.icon}</i> &nbsp;
            <span>{items.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <button
          className="bg-red-500 rounded w-full p-2 hover:bg-red-600 transition-all duration-300"
          onClick={UserLogOut}
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default SideBar;
