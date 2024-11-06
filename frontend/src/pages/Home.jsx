import React from "react";
import SideBar from "../components/home/SideBar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-[98vh] gap-2 flex-col md:flex-row">
      <div className="border rounded-lg w-full md:w-1/4 lg:w-1/6 p-3 flex flex-col justify-between">
        <SideBar />
      </div>
      <div className="border rounded-lg w-full md:w-3/4 lg:w-5/6 p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
