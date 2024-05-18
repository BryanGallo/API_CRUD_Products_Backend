import jwt from "jsonwebtoken";

const generateJWT = (id) => {
    //TODO: mover palabra secreta a variables de entorno
    return jwt.sign({ id }, 'secret', {
        expiresIn: "1h",
    });
};

export default generateJWT;
