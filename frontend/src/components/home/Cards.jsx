import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdEditDocument, MdAutoDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";

const Cards = ({ home, setAddTaskModel, data }) => {
  const MyTask = useSelector((state) => state.auth.tasks);
  const taskArray = Object.values(MyTask);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [updateFormModel, setUpdateFormModel] = useState(false);

  const HandlerUpdateClick = (data) => {
    setSelectedTask(data);
    setTitle(data.title);
    setDesc(data.desc);
    setUpdateFormModel(true);
  };

  const HandlerForUpdateTask = async () => {
    const response = await axios.put(
      `https://task-mern-wb8q.onrender.com/task/update-task/${selectedTask._id}`,
      { title, desc },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setUpdateFormModel(false);
    window.location.reload();
  };

  const HandlerForImportant = async (id) => {
    await axios.put(
      `https://task-mern-wb8q.onrender.com/task/imp-task-update/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    window.location.reload();
  };

  const HandlerForComplete = async (id) => {
    await axios.put(
      `https://task-mern-wb8q.onrender.com/task/comp-task-update/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    window.location.reload();
  };

  const HandlerDelete = async (id) => {
    await axios.delete(`https://task-mern-wb8q.onrender.com/task/delete-task/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    window.location.reload();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {data &&
        data.map((data) => (
          <div
            key={data._id}
            className="flex flex-col justify-between border p-4 rounded-md"
          >
            <div>
              <h3 className="text-xl font-semibold">{data.title}</h3>
              <p className="text-gray-300">{data.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                onClick={() => HandlerForComplete(data._id)}
                className={`${
                  data.Completed === false ? "bg-red-400" : "bg-green-700"
                } rounded-lg p-1 w-5/6`}
              >
                {data.Completed === false ? "InCompleted" : "Completed"}
              </button>
              <div className="text-white p-2 gap-2 w-3/6 text-2xl flex justify-around">
                <button onClick={() => HandlerForImportant(data._id)}>
                  {data.important === false ? (
                    <FaRegHeart />
                  ) : (
                    <FaHeart className="text-red-600" />
                  )}
                </button>
                <button onClick={() => HandlerUpdateClick(data)}>
                  <MdEditDocument />
                </button>
                <button onClick={() => HandlerDelete(data._id)}>
                  <MdAutoDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      {updateFormModel && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] w-screen h-screen flex flex-col items-center justify-center z-50">
          <div className="p-4 bg-gray-800 rounded-lg w-[90vw] md:w-[60vw] lg:w-[35vw]">
            <h3 className="text-center text-lg text-white mb-4">Update Task</h3>
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
                onClick={HandlerForUpdateTask}
              >
                Update Task
              </button>
              <button
                className="p-2 bg-red-400 text-white rounded w-[49%] hover:bg-red-500"
                onClick={() => setUpdateFormModel(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {home === true && (
        <div className="flex flex-col justify-center items-center border p-4 rounded-md hover:scale-105 hover:cursor-pointer">
          <IoAddCircleSharp
            className="text-5xl"
            onClick={() => setAddTaskModel(true)}
          />
          <h2 className="mt-3">Add Task</h2>
        </div>
      )}
    </div>
  );
};

export default Cards;
