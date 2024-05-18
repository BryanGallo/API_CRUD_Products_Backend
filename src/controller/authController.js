import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import generateJWT from "../helpers/generateJWT.js"
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    await check("name")
        .notEmpty()
        .withMessage("El nombre no puede ir vacio")
        .run(req);

    await check("email")
        .isEmail()
        .withMessage("Eso no parece un email")
        .run(req);

    await check("password")
        .isLength({ min: 4 })
        .withMessage("La contraseña debe tener al menos 4 caracteres")
        .run(req);
    let result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(200).json(result.array());
    }
    try {
        const existUser = await User.findOne({ where: { email } });
        if (existUser) {
            const error = new Error("El usuario ya esta registrado");
            return res.status(400).json({ msg: error.message });
        }
        await User.create({
            name,
            email,
            password,
        });
        return res.status(200).json({ msg: "Usuario Creado Correctamente" });
    } catch (error) {
        return res
            .status(403)
            .json({ msg: "Hubo un problema al crear el Usuario" });
    }
};
const authenticate = async (req, res) => {
    const { email, password } = req.body;
    await check("email")
        .isEmail()
        .withMessage("Eso no parece un email")
        .run(req);

    await check("password")
        .notEmpty()
        .withMessage("La contraseña no puede ir vacía")
        .run(req);

    let result = validationResult(req);
    console.log(result);
    if (!result.isEmpty()) {
        return res.status(200).json(result.array());
    }
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            const error = new Error("El usuario no existe");
            return res.status(400).json({ msg: error.message });
        }
        if (await user.validatePassword(password)) {
            return res.status(200).json({
                id: user.id,
                name: user.name,
                token:generateJWT(user.id)
            });
        } else {
            const error = new Error("Tu clave es Incorrecta");
            return res.status(403).json({ msg: error.message });
        }
    } catch (error) {
        return res
            .status(403)
            .json({ msg: "Hubo un problema al ingresar el sistema" });
    }
};

export { registerUser, authenticate };
