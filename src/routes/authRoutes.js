import express from "express";
import {
    registerUser,
    authenticate,
    forgetPassword,
} from "../controller/authController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", authenticate);
userRouter.post("/forget-password", forgetPassword);

export default userRouter;
