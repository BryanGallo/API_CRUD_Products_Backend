import express from "express";
import db from "./config/db.js";
import cors from "cors";
import userRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoute.js";

const app = express();

//Solicitudes HTTP en JSON
app.use(express.json());

//Conexion BDD
try {
    db.authenticate();
    db.sync();
    console.log("Conexion correcta a la BDD");
} catch (error) {
    console.log("error en la base");
}

//TODO: Colocar la direcion del front 
app.use(
    cors({
        origin: "*",
    })
);

//ROUTING
//Routing User
app.use("/api/auth", userRouter);
//Routing Product
app.use("/api/product", productRouter);

const port = 8000;

app.listen(port, () => {
    console.log(`Servidor operativo en el puerto ${port}`);
});
