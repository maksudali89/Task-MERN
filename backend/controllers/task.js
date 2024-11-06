import { Task } from "../models/task.js";
import { User } from "../models/user.js";

export async function HandlerForAddTask(req, res) {
  const { title, desc } = req.body;
  // console.log("Title",title);
  const newTask = await Task.create({
    title,
    desc,
  });

  const user = req.user;
  const Id = user.id;
  // console.log(Id);
  await User.findByIdAndUpdate(Id, { $push: { Task: newTask._id } });
  res.status(200).json({ message: "task Added Successfully" });
}

export async function HandlerForGettingAllTasks(req, res) {
  const id = req.user.id;
  const Data = await User.findById(id).populate({
    path: "Task",
    option: { $sort: { createdAt: -1 } },
  });
  // console.log(Data)
  res
    .status(200)
    .json({ message: "Data Getting Successfully", task: Data.Task });
}

export async function HandlerForDeleteTask(req, res) {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  const Id = req.user.id;
  await User.findByIdAndUpdate(Id, { $pull: { Task: id } });

  res.status(200).json({ message: "Task Deleted Successfully" });
}

export async function HandlerForGettingOnlyImportantTasks(req, res) {
  const id = req.user.id;
  const ImpTask = await User.findById(id).populate({
    path: "Task",
    match: { important: true },
    option: { $sort: { createdAt: -1 } },
  });
  const impData = ImpTask.Task;
  res
    .status(200)
    .json({ message: "Imp Data getting successFully ", IMPData: impData });
}

export async function HandlerForGettingOnlyCompletedTasks(req, res) {
  const Id = req.user.id;
  const ComTask = await User.findById(Id).populate({
    path: "Task",
    match: { Completed: true },
    option: { $sort: { createdAt: -1 } },
  });

  const ComData = ComTask.Task;
  res
    .status(200)
    .json({ message: "Completed Task Success", compData: ComData });
}

export async function HandlerForGettingInCompletedTasks(req, res) {
  const Id = req.user.id;
  const InCmpTask = await User.findById(Id).populate({
    path: "Task",
    match: { inComplete: false },
    option: { $sort: { createdAt: -1 } },
  });
  const InCompleteD = InCmpTask.Task;
  res
    .status(200)
    .json({ message: "In Completed Data Fetched Success", data: InCompleteD });
}

export async function HandlerForUpdateTasks(req, res) {
  const { id } = req.params;
  // console.log(id)
  const { title, desc } = req.body;
  // console.log(title)
  await Task.findByIdAndUpdate(id, { title: title, desc: desc });
  return res.status(200).json({ message: "Tasks Updated SuccessFully" });
}

export async function HandlerForEditTask(req, res) {
  const { id } = req.params;
  const data = await Task.findById(id);
  return res.status(200).json({ message: "Tasks Updated SuccessFully",Data:data });
}

export async function HandlerForImportantTask(req, res) {
  const { id } = req.params;
  const TaskData = await Task.findById(id);
  const ImpTask = TaskData.important;
  await Task.findByIdAndUpdate(id, { important: !ImpTask });
  res.status(200).json({ message: "Important Task Updated SuccessFully" });
}
export async function HandlerForUpdateCompletedTask(req, res) {
  const { id } = req.params;
  const TaskData = await Task.findById(id);
  const CompTasks = TaskData.Completed;
  await Task.findByIdAndUpdate(id, { Completed: !CompTasks });

  res.status(200).json({ message: "Completed Task UPdated" });
}
