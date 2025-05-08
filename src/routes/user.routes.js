import { Router } from "express";
import {
  deleteUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";
import { accessToken } from "../middlewares/security.js";

const userRoutes = Router();

userRoutes.post("/register", registerUser);

userRoutes.post("/login", accessToken, loginUser);

userRoutes.patch("/updateUser", accessToken, updateUser);

userRoutes.delete("/deleteUser", accessToken, deleteUser);

export default userRoutes;
