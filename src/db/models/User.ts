import { Schema, models, model, Model } from "mongoose";

export interface UserModelSchema {
  username: string;
  email: string;
  provider: "github" | "google";
  avatar?: string;
  follows: UserModelSchema[],
  followers: UserModelSchema[],
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
    },
    avatar: {
      type: String,
    },
    follows: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
    followers: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }]
  },
  {
    timestamps: true,
  }
);

const User = models?.User || model("User", UserSchema);

export default User as Model<UserModelSchema>;
