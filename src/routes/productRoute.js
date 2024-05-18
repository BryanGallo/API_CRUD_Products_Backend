import express from "express";
import {
    listProducts,
    createProduct,
} from "../controller/productController.js";
import checkAuth from "../middleware/checkAuth.js";

const productRouter = express.Router();

productRouter.get("/", checkAuth, listProducts);
productRouter.post("/create-product", checkAuth, createProduct);

export default productRouter;
