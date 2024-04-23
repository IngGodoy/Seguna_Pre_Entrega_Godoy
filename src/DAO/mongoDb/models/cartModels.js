import mongoose from "mongoose";

const cartColletion = "carts";

const cartSchema = new mongoose.Schema({
    products:{
        type: [
            {
                product: {
                    type: mongoose.Schema.ObjectId,
                    ref: "products",
                    quatity: {
                        type: Number,
                        default : 1
                    }
                }
            }
        ],
        default : []
    }
});

const cartModel = mongoose.model(cartColletion, cartSchema);

export default cartModel;