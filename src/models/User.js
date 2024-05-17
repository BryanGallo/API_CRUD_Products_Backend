import { DataTypes } from "sequelize";
import db from "../config/db.js";
import bcrypt from "bcryptjs";

const User = db.define(
    "users",
    {
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
    },
    {
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, 10);
            },
        },
    }
);

export default User;
