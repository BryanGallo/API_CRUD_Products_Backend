import { exit } from "node:process";
import Product from "../models/Product.js";
import User from "../models/User.js";
import { products } from "./products.js";
import { user } from "./users.js";
import db from "../config/db.js";
const importData = async () => {
    try {
        await db.authenticate();

        //generar columnas
        await db.sync();

        //Insertamos los datos,BulkCreate inserta todos los datos del arreglo
        await Product.bulkCreate(products);
        await User.bulkCreate(user);
        console.log("Datos Importados correctamente");

        exit(0);
    } catch (error) {
        console.log(error);
        exit(1);
    }
};

const deleteData = async () => {
    try {
        //Autenticar en la bdd
        await db.authenticate();

        //generar columnas
        await db.sync();

        await db.sync({ force: true });
        console.log("Datos Eliminados correctamente");
    } catch (error) {
        console.log(error);
        exit(1);
    }
};

//process.argv manera de manar argumentos desde lenguaje de consola propio de node
if (process.argv[2] === "-i") {
    //llamamo  a la funcion superior
    importData();
}

if (process.argv[2] === "-d") {
    //llamamo  a la funcion superior
    deleteData();
}
