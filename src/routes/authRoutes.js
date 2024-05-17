import express from "express";
import { login } from "../controller/authController.js";

const userRouter = express.Router();

userRouter.post("/login", login);

export default userRouter;
