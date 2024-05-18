import express from "express";
import {
    registerUser,
    authenticate,
    forgetPassword,
    confirmToken,
    newPassword,
    profile,
} from "../controller/authController.js";
import checkAuth from "../middleware/checkAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", authenticate);
userRouter.post("/forget-password", forgetPassword);
userRouter.get("/forget-password/:token", confirmToken);
userRouter.post("/forget-password/:token", newPassword);

//*Ruta privada
userRouter.get("/profile", checkAuth, profile);

export default userRouter;
