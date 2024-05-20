import { check, validationResult } from "express-validator";
import Product from "../models/Product.js";

const listProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            // order: [["Title", "ASC"]],
        });
        console.log("lleuge");
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

const createProduct = async (req, res) => {
    const {
        handle,
        title,
        description,
        sku,
        grams,
        stock,
        price,
        compare_price,
        barcode,
    } = req.body;

    await check("handle")
        .notEmpty()
        .withMessage("Handle no puede ir vacio")
        .run(req);

    await check("title")
        .notEmpty()
        .withMessage("Title no puede ir vacio")
        .run(req);

    await check("description")
        .notEmpty()
        .withMessage("Description no puede ir vacio")
        .run(req);

    await check("sku").notEmpty().withMessage("SKU no puede ir vacio").run(req);

    await check("grams")
        .isFloat({ gt: 0 })
        .withMessage("Grams debe ser mayor a 0")
        .run(req);

    await check("stock")
        .isInt({ gt: 0 })
        .withMessage("El stock debe ser mayor a 0")
        .run(req);

    await check("price")
        .isFloat({ gt: 0 })
        .withMessage("El precio debe ser mayor a 0")
        .run(req);

    await check("compare_price")
        .isFloat({ gt: 0 })
        .withMessage("El compare_price debe ser mayor a 0")
        .run(req);

    await check("barcode")
        .notEmpty()
        .withMessage("El código de barras no puede estar vacío")
        .bail()
        .isLength({ min: 8, max: 50 })
        .withMessage("El código de barras debe tener entre 8 y 50 caracteres")
        .run(req);

    let result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json(result.array());
    }

    try {
        const existProduct = await Product.findOne({
            where: { sku },
        });
        console.log("aqui eso");
        if (existProduct) {
            const error = new Error("Ya existe un producto con ese 'sku'");
            return res.status(400).json({ msg: error.message });
        }
        await Product.create({
            handle,
            title,
            description,
            sku,
            grams,
            stock,
            price,
            compare_price,
            barcode,
        });
        return res.status(200).json({ msg: "Producto Creado Correctamente" });
    } catch (error) {
        console.log(error);
        return res
            .status(403)
            .json({ msg: "Hubo un problema al crear el Producto" });
    }
};

export { listProducts, createProduct };
