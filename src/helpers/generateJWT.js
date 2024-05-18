import jwt from "jsonwebtoken";

const generateJWT = (id) => {
    return jwt.sign({ id }, 'secret', {
        expiresIn: "1h",
    });
};

export default generateJWT;
