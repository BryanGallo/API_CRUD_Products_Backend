import { DataTypes } from "sequelize";
import db from "../config/db.js";

const User = db.define("users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
        trim: true,
    },
    token: {
        type: DataTypes.STRING,
        require: false,
    },
});

export default User;
