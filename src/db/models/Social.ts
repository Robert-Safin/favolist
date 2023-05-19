import mongoose, { Document, Model, ObjectId } from "mongoose";

export interface SocialModelSchema extends Document {
  _id: ObjectId;
  userId: ObjectId;
  facebook : string
  github : string
  tiktok : string
  patreon : string
  youtube : string
  linkedin : string
  twitter : string
  twitch : string
  instagram : string
  snapchat : string
  medium: string
}

const SocialSchema = new mongoose.Schema<SocialModelSchema>(
  {
    userId: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    facebook : {
      type: String,
      default: "",
    },
    github : {
      type: String,
      default: "",
    },
    tiktok : {
      type: String,
      default: "",
    },
    patreon : {
      type: String,
      default: "",
    },
    youtube : {
      type: String,
      default: "",
    },
    linkedin : {
      type: String,
      default: "",
    },
    twitter : {
      type: String,
      default: "",
    },
    twitch : {
      type: String,
      default: "",
    },
    instagram : {
      type: String,
      default: "",
    },
    snapchat : {
      type: String,
      default: "",
    },
    medium : {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Social = (mongoose.models.Social ||
  mongoose.model("Social", SocialSchema)) as Model<SocialModelSchema>;

export default Social as Model<SocialModelSchema>;
