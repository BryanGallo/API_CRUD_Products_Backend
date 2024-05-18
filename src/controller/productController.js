import { check, validationResult } from "express-validator";
import Product from "../models/Product.js";

const listProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            // order: [["Title", "ASC"]],
        });
        console.log('lleuge');
        if (!products) {
            const error = new Error("No se encontraron productos");
            return res.status(400).json({ msg: error.message });
        }
        return res.status(200).json(products);
    } catch (error) {
        return res
            .status(403)
            .json({ msg: "Hubo un problema al listar los productos" });
    }
};

export { listProducts };
