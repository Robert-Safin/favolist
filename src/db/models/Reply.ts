import mongoose, { Model, Document, ObjectId } from "mongoose";

export interface ReplyModelSchema extends Document {
  _id: ObjectId;
  commentId: ObjectId;
  userId: ObjectId;
  content: string;
}

const ReplySchema = new mongoose.Schema<ReplyModelSchema>(
  {
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
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
  },
  {
    timestamps: true,
  }
);

const Reply = (mongoose.models.Reply ||
  mongoose.model("Reply", ReplySchema)) as Model<ReplyModelSchema>;

export default Reply as Model<ReplyModelSchema>;
