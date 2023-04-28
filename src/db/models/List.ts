import { Schema, models, model, ObjectId, Model } from "mongoose";
import User from "./user";

export interface ListModelSchema {
  user_id: ObjectId;
  title: string;
}

const ListSchema = new Schema<ListModelSchema>(
  {
    user_id: {
      type: User,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const List = models?.List || model("List", ListSchema);

export default List as Model<ListModelSchema>;
