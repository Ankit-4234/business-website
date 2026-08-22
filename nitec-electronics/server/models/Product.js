import mongoose from "mongoose";
import slugify from "slugify";

const variantSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    priceModifier: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
  },
  { _id: false },
);
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: { type: String, required: true },
    images: [{ type: String, required: true }],
    price: { type: Number, required: true },
    salePrice: { type: Number, default: null },
    stock: { type: Number, required: true, default: 0 },
    sku: { type: String, unique: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    colors: [{ name: String, hex: String }],
    variants: [variantSchema],
    specifications: [{ key: String, value: String }],
    features: [{ type: String }],
    featured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true },
);
productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug =
      slugify(this.name, { lower: true }) +
      "-" +
      Date.now().toString().slice(-5);
  }
  next();
});
const Product = mongoose.model("Product", productSchema);
export default Product;
