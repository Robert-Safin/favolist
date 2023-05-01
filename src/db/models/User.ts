import { Schema, models, model, Model } from "mongoose";
import { ListModelSchema } from "./List";

export interface UserModelSchema {
  username: string;
  email: string;
  provider: "github" | "google";
  avatar?: string;
  follows: UserModelSchema[],
  followers: UserModelSchema[],
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
      ref: "User"
    }],
    followers: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
    lists: [{
      type: Schema.Types.ObjectId,
      ref: "List"
    }]
  },
  {
    timestamps: true,
  }
);

const User = models?.User || model("User", UserSchema);

export default User as Model<UserModelSchema>;
