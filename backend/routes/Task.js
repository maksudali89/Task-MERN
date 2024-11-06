import { Router } from "express";
const router = Router();
import {
  HandlerForAddTask,
  HandlerForGettingAllTasks,
  HandlerForDeleteTask,
  HandlerForGettingOnlyImportantTasks,
  HandlerForGettingOnlyCompletedTasks,
  HandlerForGettingInCompletedTasks,
  HandlerForImportantTask,
  HandlerForUpdateCompletedTask,
  HandlerForUpdateTasks,
  HandlerForEditTask,
} from "../controllers/task.js";
import { AuthMiddleware } from "../middleware/auth.js";
router.post("/add-task", AuthMiddleware, HandlerForAddTask);
router.get("/all-task", AuthMiddleware, HandlerForGettingAllTasks);
router.delete("/delete-task/:id", AuthMiddleware, HandlerForDeleteTask);
router.get("/imp-task", AuthMiddleware, HandlerForGettingOnlyImportantTasks);
router.put("/update-task/:id", AuthMiddleware, HandlerForUpdateTasks);
router.get("/comp-task", AuthMiddleware, HandlerForGettingOnlyCompletedTasks);
router.get("/inCmp-task", AuthMiddleware, HandlerForGettingInCompletedTasks);
router.put("/imp-task-update/:id", HandlerForImportantTask);
router.put("/comp-task-update/:id", HandlerForUpdateCompletedTask);
export default router;
