import express from "express";
import {
    registerUser,
    authenticate,
    forgetPassword,
    confirmToken,
    newPassword,
} from "../controller/authController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", authenticate);
userRouter.post("/forget-password", forgetPassword);
userRouter.get("/forget-password/:token", confirmToken);
userRouter.post("/forget-password/:token", newPassword);

export default userRouter;
