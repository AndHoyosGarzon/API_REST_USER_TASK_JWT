import { Router } from "express";
import {
  creatNewTask,
  deleteTask,
  getAllTask,
  updateTask,
} from "../controllers/tasks.controller.js";
import { accessToken } from "../middlewares/security.js";

const tasksRouter = Router();

tasksRouter.get("/get_all_task", accessToken, getAllTask);

tasksRouter.post("/create_task", accessToken, creatNewTask);

tasksRouter.patch("/update_task", accessToken, updateTask);

tasksRouter.delete("/delete_task", accessToken, deleteTask);

export default tasksRouter;
