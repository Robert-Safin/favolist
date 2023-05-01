import { Schema, models, model, ObjectId, Model, Document } from "mongoose";

export interface ProductModelSchema extends Document {
  _id : ObjectId
  user_id : ObjectId,
  listName: string;
  productCategory: string;
  productName: string;
  productLogo: string;
  productImage: string;
  content: string;
  price: number;
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
    productLogo: {
      type: String,
      default: "Unbranded",
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

const Product = models?.Product || model("Product", ProductSchema);

export default Product as Model<ProductModelSchema>;
