import { check, validationResult } from "express-validator";
const login = async (req, res) => {
    const { email, password } = req.body;
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
    return res.status(200).json({ msg: "LLegue" });
};

export { login };
