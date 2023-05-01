import { Schema, models, model, Model } from "mongoose";
import { ListModelSchema } from "./List";
import { ObjectId } from "mongoose";

export interface UserModelSchema {
  username: string;
  email: string;
  provider: "github" | "google";
  avatar?: string;
  follows: ObjectId[],
  followers: ObjectId[],
  lists : ListModelSchema[]
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
    }]
  },
  {
    timestamps: true,
  }
);

const User = models?.User || model("User", UserSchema);

export default User as Model<UserModelSchema>;
