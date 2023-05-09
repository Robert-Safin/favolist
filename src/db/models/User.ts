import mongoose, { Model, Document, ObjectId } from "mongoose";
import { ListModelSchema } from "./List";
import { ProductModelSchema } from "./Product";

export interface UserModelSchema extends Document {
  _id: ObjectId;
  username: string;
  email: string;
  provider: "github" | "google";
  avatar?: string;
  bio: string;
  follows: ObjectId[];
  followers: ObjectId[];
  lists: ListModelSchema[];
  products: ProductModelSchema[];
  socials: Social[];
}

interface Social {
  social:
    | "Facebook"
    | "Github"
    | "Tiktok"
    | "Patreon"
    | "Youtube"
    | "Linkedin"
    | "Twitter"
    | "Twitch"
    | "Instagram"
    | "Snapchat";
  link: string;
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
    follows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
        default: [],
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: [],
      },
    ],
    socials: {
      type: [
        {
          social: {
            type: String,
            enum: [
              "Facebook",
              "Github",
              "Tiktok",
              "Patreon",
              "Youtube",
              "Linkedin",
              "Twitter",
              "Twitch",
              "Instagram",
              "Snapchat",
            ],
            required: true,
          },
          link: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = (mongoose.models.User ||
  mongoose.model("User", UserSchema)) as Model<UserModelSchema>;

export default User as Model<UserModelSchema>;
