import { check, validationResult } from "express-validator";
import Product from "../models/Product.js";

const listProducts = async (req, res) => {
    res.status(200).json({ msg: "LLegaste a listar productos" });
};

export { listProducts };
