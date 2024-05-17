import express from "express";
import db from "./config/db.js";

const app = express();

//Conexion BDD
try {
    db.authenticate();
    db.sync();
    console.log("Conexion correcta a la BDD");
} catch (error) {
    console.log("error en la base");
}

const port = 8000;

app.listen(port, () => {
    console.log(`Servidor operativo en el puerto ${port}`);
});
