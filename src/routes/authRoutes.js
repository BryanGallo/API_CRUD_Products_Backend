import express from "express";
import { registerUser, authenticate } from "../controller/authController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", authenticate);

export default userRouter;
