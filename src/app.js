import express from "express";
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import handlebars from 'express-handlebars';
import {__dirname} from "./utils.js";
import routerViews from "./routes/views.router.js";
import { Server } from "socket.io";
//import ProductManager from "./DAO/fileSistem/manager/productManager.js"; "file Sitem"
import ProductManager from "./DAO/mongoDb/manager/productManager.js"
import mongoose from "mongoose";

const productsManager = new ProductManager();


const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, ()=> console.log("server ok on port: " + PORT));
const socketServer = new Server(httpServer); //servidor para trabajar con socket

//mongoDb connect
const MONOGO_URL = "mongodb://127.0.0.1/ecommerce";

const initMongoDb = async ()=> {
  try {
    await mongoose.connect(MONOGO_URL);
      console.log("conectado a MongoDb");
  } catch (error) {
    console.log(error);
  };
};

initMongoDb();

socketServer.on("connection", async (socket)=>{

  console.log("usuario conectado");

  socket.on("newProduct", async (product)=>{
    console.log("producto agregado desde el cliente:: ",{product});
    await productsManager.addProduct(product);
    const products = await productsManager.getProducts();
    socket.emit("updateProducts", { products});
  });

  socket.on("deleteProduct", async (id) =>{
    await productsManager.deleteProduct(parseInt(id));
    const products = await productsManager.getProducts();
    socket.emit("updateProducts", { products});
  })
});


app.use(express.json());
app.use(express.urlencoded({ extended: true })); // nos permite recibir req.body
app.use(express.static(__dirname + "/public"));


//handlebars
app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');

//endpoint para renderizar la plantilla handlebars
app.use("/views", routerViews);

//endpoint de carts y products
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);


