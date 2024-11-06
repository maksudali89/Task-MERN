import React, { useState, useEffect } from "react";
import Cards from "../components/home/Cards";
import axios from "axios";
import { AddTask } from "../store/auth/auth";
import { useDispatch } from "react-redux";

const AllTask = () => {
  const [AddTaskModel, setAddTaskModel] = useState(false);
  const dispatch = useDispatch();
  const Token = localStorage.getItem("token");
  const [Data, setData] = useState();

  useEffect(() => {
    const AllData = async () => {
      const response = await axios.get("https://task-mern-wb8q.onrender.com/task/all-task", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      Data && console.log(response.data.task);
      setData(response.data.task);
      dispatch(AddTask(response.data.task));
    };
    AllData();
  }, []);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const AddTaskHandler = async (e) => {
    try {
      e.preventDefault();
      await axios.post(
        "https://task-mern-wb8q.onrender.com/task/add-task",
        { title, desc },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-end my-2">
        <button
          className="p-2 rounded-xl bg-blue-500 w-20 text-white"
          onClick={() => setAddTaskModel(true)}
        >
          Add
        </button>
      </div>
      {Data && (
        <Cards home={true} setAddTaskModel={setAddTaskModel} data={Data} />
      )}
      {AddTaskModel && (
        <>
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] w-screen h-screen flex items-center justify-center z-50">
            <div className="p-4 bg-gray-800 rounded-lg w-[90vw] md:w-[60vw] lg:w-[35vw]">
              <h3 className="text-center text-lg text-white mb-4">
                Add A New Task
              </h3>
              <div>
                <input
                  type="text"
                  className="bg-gray-500 w-full my-2 rounded-md p-2 text-white"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  name="desc"
                  placeholder="Description"
                  cols="30"
                  rows="5"
                  className="bg-gray-500 w-full p-2 rounded-md my-2 text-white"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
              <div className="flex gap-2 items-center justify-center w-full mt-4">
                <button
                  className="p-2 bg-blue-600 text-white rounded w-[49%] hover:bg-blue-700"
                  onClick={AddTaskHandler}
                >
                  Add Task
                </button>
                <button
                  className="p-2 bg-red-400 text-white rounded w-[49%] hover:bg-red-500"
                  onClick={() => setAddTaskModel(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllTask;
