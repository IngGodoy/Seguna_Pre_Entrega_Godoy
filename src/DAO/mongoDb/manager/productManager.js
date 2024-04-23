import productModel from "../models/productMoldels.js";


class ProductManager {

  async getProducts(){
    try {
      return await productModel.find().lean();
    } catch (error) {
      console.log(error);
      throw new Error("error al buscar los productos");
    };
  };

  
  async getAll(limit = 10, page = 1, sort = {}, filtro = ""){
    try {
        // aqui agrego el metodo para paginar los productos
        return await productModel.paginate(
            {
                category : filtro  
            },
            {
                page,
                limit, 
                sort
            }
        );
    } catch (error) {
        console.log(error);
    };
};

  async addProduct(newProduct) {

    const {title, description, price, thumbnail, code, stock,status, category} = newProduct 

    //verificar si los productos tiene todo los campos
    if (!title || !description || !code || !price || !stock || !category) {
        throw new Error('Error al crear el producto');
    };

    try {
    const products = await productModel.find();  
    //verificar codigo del producto
    const checkCode = products.find((product)=> product.code === code);
    console.log("verificación de codigo: ",checkCode)  //borrar
    if (checkCode){
        throw new Error("error codigo del producto ya existente");
    };

    const newProduct = await productModel.create({title, description, price, thumbnail, code, stock, status, category});
    return newProduct; 

    } catch (error) {
      console.log(error);
      throw new Error("error al crear producto");
    };
  };


  async getProductById(id){

    const productById = await productModel.findOne({_id : id});
    
    if(!productById){
        throw new Error(`El producto ${id} no existe!`);
    };

    return productById;
  };

  async updateProduct(id, product){

    try {
        const productById = await productModel.findOne({_id : id });
        if(!productById) {
        console.log("error Id Product")
        return "error Id Product"
        };

        const updateProduct = await productModel.updateOne({_id : id}, product);

        return updateProduct;
    } catch (error) {
        console.log(error);
        throw new Error("error al actualizar producto");
    }
  };

  async deleteProduct (id){
    try {
        const productById = await productModel.findOne({_id : id});
        console.log(productById)
        if(!productById) {
            console.log("error Id Product")
            return "error Id Product"
        };
        await productModel.deleteOne({_id : id});
        return  `producto con  ${id} eliminado`
    } catch (error) {
        console.log(error);
        //throw new Error("error al eliminar producto");
    }
  }

};

export default ProductManager;