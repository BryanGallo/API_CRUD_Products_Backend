import { check, validationResult } from "express-validator";

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
    console.log(result);
    if (!result.isEmpty()) {
        return res.status(200).json(result.array());
    }
    return res.status(200).json({ msg: "Usuario Creado" });
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
    return res.status(200).json({ msg: "Usuario Logeado" });
};

export { registerUser, authenticate };
