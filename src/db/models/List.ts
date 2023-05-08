import mongoose, { Schema, models, model, ObjectId, Model, Document } from "mongoose";
import { UserModelSchema } from "./User";
import { ProductModelSchema } from "./Product";


export interface ListModelSchema extends Document{
  _id: ObjectId;
  user_id: ObjectId | UserModelSchema
  title: string;
  thumbnail: string;
  about: string,
  products: ProductModelSchema[]
}

const ListSchema = new mongoose.Schema<ListModelSchema>(
  {

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    thumbnail : {
      type: String,
      // to do
      default: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/2324px-Banana-Single.jpg"
    },
    about: {
      type: String,
      required: true,
    },
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: []
    }]
  },
  {
    timestamps: true,
  }
);


const List = (mongoose.models.List || mongoose.model("List", ListSchema)) as Model<ListModelSchema>;

export default List as Model<ListModelSchema>;
