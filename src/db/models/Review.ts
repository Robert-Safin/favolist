import { Schema, models, model, ObjectId, Model } from "mongoose";
import List from "./List";

export interface ListModelSchema {
  list_id: ObjectId;
  title: string;
  productName: string;
  productBrand: string;
  productBrandImage: string;
  content: Text;
  rating: number;
  referral: string;
}

const UserSchema = new Schema<ListModelSchema>(
  {
    list_id: {
      type: List,
      required: true,
    },
    title: {
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
