import mongoose from "mongoose";
const enquiryItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: String,
    quantity: Number,
    price: Number,
    variant: String,
  },
  { _id: false },
);
const enquirySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    items: [enquiryItemSchema],
    estimatedTotal: { type: Number, required: true },
    whatsappMessage: { type: String, required: true },
    status: {
      type: String,
      enum: ["New", "Contacted", "Confirmed", "Cancelled"],
      default: "New",
    },
  },
  { timestamps: true },
);
const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;
