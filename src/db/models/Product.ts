import { Schema, models, model, ObjectId, Model } from "mongoose";

export interface ProductModelSchema {
  user_id : ObjectId,
  listName: string;
  productName: string;
  productBrand: string;
  productBrandImage: string;
  content: string;
  rating: number;
  referral: string;
}

const ProductSchema = new Schema<ProductModelSchema>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
      type: String,
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
      default: ""
    },
  },
  {
    timestamps: true,
  }
);

const Product = models?.Product || model("Product", ProductSchema);

export default Product as Model<ProductModelSchema>;
