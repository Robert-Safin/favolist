import mongoose, { ObjectId, Model, Document } from "mongoose";
import { CommentModelSchema } from "./Comment";
import { UserModelSchema } from "./User";

export interface ProductModelSchema extends Document {
  _id: ObjectId;
  user_id: ObjectId;
  listId: ObjectId;
  productListName: string;
  productName: string;
  productLogo: string;
  productImage: string;
  content: string;
  shortContent: string;
  specs: string;
  price: number;
  referral: string;
  referralDiscription: string;
  comments: CommentModelSchema[];
  bookmarkedBy: UserModelSchema[];
  createdAt: Date;
  updatedAt: Date;
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
    productListName: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productLogo: {
      type: String,
      default:
        "https://res.cloudinary.com/dxgkclowd/image/upload/v1683187504/defaultLogo_ryvt8i.png",
    },
    productImage: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    shortContent : {
      type: String,
      required: true,
    },
    specs: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    referral: {
      type: String,
      default: "",
    },
    referralDiscription: {
      type: String,
      default: "",
    },
    comments:
      {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
      default: [],
      },
    bookmarkedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    }
  },
  {
    timestamps: true,
  }
);

const Product = (mongoose.models.Product ||
  mongoose.model("Product", ProductSchema)) as Model<ProductModelSchema>;

export default Product as Model<ProductModelSchema>;
