import mongoose, { Document, Model, ObjectId } from "mongoose";

export interface SocialModelSchema extends Document {
  _id: ObjectId;
  userId: ObjectId;
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

const SocialSchema = new mongoose.Schema<SocialModelSchema>(
  {
    link: {
      type: String,
      required: true,
    },
    userId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);

const Social = (mongoose.models.Social ||
  mongoose.model("Social", SocialSchema)) as Model<SocialModelSchema>;

export default Social as Model<SocialModelSchema>;
