import mongoose, { Schema, models, model, ObjectId, Model, Document } from "mongoose";
import { UserModelSchema } from "./User";

export interface ProductModelSchema extends Document {
  _id : ObjectId
  user_id : ObjectId
  listId: ObjectId;
  productListName: string;
  productName: string;
  productLogo: string;
  productImage: string;
  content: string;
  price: number;
  referral: string;
}

const ProductSchema = new mongoose.Schema<ProductModelSchema>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
    productListName : {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productLogo: {
      type: String,
      default: "https://res.cloudinary.com/dxgkclowd/image/upload/v1683187504/defaultLogo_ryvt8i.png",
    },
    productImage: {
    type: String,
    required: true,
    },
    content: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true
    },
    referral: {
      type: String,
      default: ""
    },
  },
  {
    timestamps: true,
  }
);

const Product = (mongoose.models.Product || mongoose.model("Product", ProductSchema)) as Model<ProductModelSchema>;

export default Product as Model<ProductModelSchema>;
