import {Router} from "express";
import ProductManager from "../DAO/mongoDb/manager/productManager.js";

const productsManager = new ProductManager();

const router =Router();

router.get("/", async (request, response)=>{
    try {
        
        const {limit, page, sort, category} = request.query
        const products = await productsManager.getAll(limit, page, sort, category);
        console.log("productos del get all",products) // borrar

        const next = products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : null;
        const prev = products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : null;
        
        // respuesta en formato de paginación
        response.status(200).json({
            payload: products.docs,
            info: {
             count: products.totalDocs,
             pages: products.totalPages,
             next,
             prev
            }
        }); 
        
    } catch (error) {
        console.log(error)
    };
    
});

router.get("/:pid", async (request, response)=>{

    const {pid} = request.params;

    try{
        const productById = await productsManager.getProductById(pid);
        
        if(productById === "Not found"){
            response.status(400).json(productById)
        }else{
            response.status(200).json(productById);
        }
   
    }catch (error){
        response.status(500).json(error.message);
    };
});

router.post("/", async (request, response)=>{
    try{
        const newProdct =  request.body;
        const checkCreation = await productsManager.addProduct(newProdct);
        console.log("ver creacion de producto: ", checkCreation);
        if(checkCreation){
            response.status(200).json(checkCreation); 
        }else {
            response.status(400).json({message:`invalid product error`});
        };
        
    }catch (error){
        response.status(500).json(error.message);
    };  
});

router.put("/:pid", async (request, response)=>{
    try{
        const {pid} = request.params;
        const updateProduct = request.body;
        const productCheckUpdate = await productsManager.updateProduct(parseInt(pid),updateProduct);
        productCheckUpdate ? response.status(200).json(productCheckUpdate) : response.status(400).json({message:`invalid product error`});
    }catch (error){
        response.status(500).json(error.message);
    };  
});

router.delete("/:pid", async (request, response)=>{
    try{
        const {pid} = request.params;
        const productCheckDelete = await productsManager.deleteProduct(pid);
        productCheckDelete ? response.status(200).json({message:`removed product`}) : response.status(400).json({message:`invalid product error`});
    }catch (error){
        response.status(500).json(error.message);
    };  
});






export default router;
