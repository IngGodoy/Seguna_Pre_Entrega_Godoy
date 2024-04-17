import {Router} from "express";
import ProductManager from "../DAO/mongoDb/manager/productManager.js";

const productsManager = new ProductManager();

const router = Router();

router.get("/", (request, response)=>{

    const name = "nombre de prueba";

    response.render("index", {name:name});
});

router.get("/products", async (req, res) => {
    const products = await productsManager.getProducts();
    console.log("ver productos:: ",  products );
    res.render("home", { products });
});

router.get("/realTimeProducts", async (req, res) => {
    const products = await productsManager.getProducts();
    res.render("realTimeProducts", { products });
});



export default router;