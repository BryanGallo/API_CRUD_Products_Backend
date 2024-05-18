import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Product = db.define("products", {
    handle: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        require: true,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
        unique: true,
    },
    grams: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        require: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        require: true,
    },
    compare_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        require: true,
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
});

export default Product;
