import { Schema, models, model, ObjectId, Model } from "mongoose";
import List from "./List";

export interface ProductModelSchema {
  userId : ObjectId,
  listName: string;
  productName: string;
  productBrand: string;
  productBrandImage: string;
  content: Text;
  rating: number;
  referral: string;
}

const ProductSchema = new Schema<ProductModelSchema>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    listName: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productBrand: {
      type: String,
      default: "Unbranded",
    },
    productBrandImage: {
      type: String,
      default: "Unbranded"
    },
    content: {
      type: Text,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      max: 10,
      min: 1,
    },
    referral: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = models?.Product || model("Product", ProductSchema);

export default Product as Model<ProductModelSchema>;
