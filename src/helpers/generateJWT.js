import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const generateJWT = (id) => {
    //TODO: mover palabra secreta a variables de entorno
    return jwt.sign({ id },  process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

export default generateJWT;
