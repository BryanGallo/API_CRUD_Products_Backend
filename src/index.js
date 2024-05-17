import express from "express";
import db from "./config/db.js";
import userRouter from './routes/authRoutes.js'

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

//ROUTING
//Routing User
app.use("/api/auth", userRouter);

const port = 8000;

app.listen(port, () => {
    console.log(`Servidor operativo en el puerto ${port}`);
});
