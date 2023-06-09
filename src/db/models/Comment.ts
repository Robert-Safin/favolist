import mongoose, { Model, Document, ObjectId } from "mongoose";
import { ReplyModelSchema } from "./Reply";
import { UserModelSchema } from "./User";

export interface CommentModelSchema extends Document {
  _id: ObjectId;
  productId: ObjectId;
  userId: UserModelSchema
  content: string;
  replies: ReplyModelSchema[];
  createdAt: string;
}

const CommentSchema = new mongoose.Schema<CommentModelSchema>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    replies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Reply",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = (mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema)) as Model<CommentModelSchema>;

export default Comment as Model<CommentModelSchema>;
