import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();
import UserRoute from "./routes/user.js";
import TaskRoutes from "./routes/Task.js";
import { HandlerForMongoDbConnection } from "./config/MongoDb.js";

HandlerForMongoDbConnection(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb Connected Successfully");
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

// for testing purpose
app.get("/", async (req, res) => {
  return res.send("hello from production");
});
app.use("/user", UserRoute);
app.use("/task", TaskRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `server is running on http://127.0.0.1:${process.env.PORT || 4000}`
  );
});
