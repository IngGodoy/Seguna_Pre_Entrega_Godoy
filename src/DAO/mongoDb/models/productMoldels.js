import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  status: { type: Boolean, default: true }
});

productSchema.plugin(mongoosePaginate) // esto me permite paginar la clase product

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;