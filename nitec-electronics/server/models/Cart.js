import mongoose from "mongoose";
import Product from "./Product";
const cartItemSchema = new mongoose.Schema(
  {
    Product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, default: 1 },
    variant: { type: String, default: "" },
  },
  { _id: false },
);
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Type.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
});
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
