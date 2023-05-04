import { Schema, models, model, Model, Document } from "mongoose";
import { ListModelSchema } from "./List";
import { ObjectId } from "mongoose";
import { ProductModelSchema } from "./Product";

export interface UserModelSchema extends Document {
  _id : ObjectId;
  username: string;
  email: string;
  provider: "github" | "google";
  avatar?: string;
  bio: string;
  follows: ObjectId[],
  followers: ObjectId[],
  lists : ListModelSchema[],
  products: ProductModelSchema[],
}

const UserSchema = new Schema<UserModelSchema>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    provider: {
      type: String,
      enum: ["github", "google"],
      required: true,
    },
    avatar: {
      type: String,
      default: "/user.webp"
    },
    bio: {
      type: String,
      default: ""
    },
    follows: [{
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
    }],
    followers: [{
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
    }],
    lists: [{
      type: Schema.Types.ObjectId,
      ref: "List",
      default: []
    }],
    products: [{
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: []
    }]
  },
  {
    timestamps: true,
  }
);

const User = models?.User || model("User", UserSchema);

export default User as Model<UserModelSchema>;
