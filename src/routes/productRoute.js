import express from "express";
import { listProducts } from "../controller/productController.js";
import checkAuth from "../middleware/checkAuth.js";

const productRouter = express.Router();

productRouter.get("/", checkAuth, listProducts);

export default productRouter;
