import mongoose, { Model, Document, ObjectId } from "mongoose";
import { ListModelSchema } from "./List";
import { ProductModelSchema } from "./Product";
import { SocialModelSchema } from "./Social";
export interface UserModelSchema extends Document {
  _id: ObjectId;
  username: string;
  email: string;
  provider: "github" | "google";
  avatar?: string;
  bio: string;
  follows: UserModelSchema[];
  followers: UserModelSchema[];
  lists: ListModelSchema[];
  products: ProductModelSchema[];
  socials: SocialModelSchema;
  bookmarks: ProductModelSchema[];
}



const UserSchema = new mongoose.Schema<UserModelSchema>(
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
      default: "/user.webp",
    },
    bio: {
      type: String,
      default: "",
    },
    follows: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },

    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },

    lists: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "List",
      default: [],
    },

    products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      default: [],
    },
    bookmarks: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      default: [],
    },
    socials: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Social",
    },
  },
  {
    timestamps: true,
  }
);

const User = (mongoose.models.User ||
  mongoose.model("User", UserSchema)) as Model<UserModelSchema>;

export default User as Model<UserModelSchema>;
