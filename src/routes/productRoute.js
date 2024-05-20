import express from "express";
import {
    listProducts,
    createProduct,
    editProduct,
    deleteProduct,
} from "../controller/productController.js";
import checkAuth from "../middleware/checkAuth.js";

const productRouter = express.Router();

productRouter.get("/", checkAuth, listProducts);
productRouter.post("/create-product", checkAuth, createProduct);
productRouter.put("/edit-product", checkAuth, editProduct);
productRouter.delete("/delete-product/:id", checkAuth, deleteProduct);

export default productRouter;
