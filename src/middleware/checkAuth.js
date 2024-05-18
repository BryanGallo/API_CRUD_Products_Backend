import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkAuth = async (req, res, next) => {
    //next se usa porque enviar al siguiente middlewere
    console.log("desde checkAuth.js");
    //colocamos header.authorization porque es en los headers donde se envia el JWT
    console.log(req.headers.authorization);
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            //TODO: mover palabra secreta a variables de entorno
            const decoded = jwt.verify(token, "secret");
            console.log(decoded);

            req.user = await User.findOne({
                attributes: ["id", "name", "email"],
                where: decoded.id,
            });
            console.log(req.user);
            return next();
        } catch (error) {
            return res.status(404).json({ msg: "Hubo un error con la sesion" });
        }
    }

    if (!token) {
        const error = new Error("Token no valido");
        return res.status(401).json({ msg: error.message });
    }
    next();
};

export default checkAuth;
