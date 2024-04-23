import mongoose from "mongoose";

const productCollection = "products";

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnails: { type: String, required: true },
  code: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  status: { type: Boolean, default: true }
});

const productModel = mongoose.model(productCollection, productSchema);

productSchema.plugin(mongoosePaginate); // esto me permite paginar la clase product

export default productModel;