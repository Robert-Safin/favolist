import { ProductModelSchema } from "./Product";
import { Schema, models, model, ObjectId, Model, Document } from "mongoose";


export interface ListModelSchema extends Document{
  _id: ObjectId;
  user_id: ObjectId;
  title: string;
  thumbnail: string;
  about: string,
  products: ProductModelSchema[]
}

const ListSchema = new Schema<ListModelSchema>(
  {

    user_id: {
      type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: []
    }]
  },
  {
    timestamps: true,
  }
);


const List = models?.List || model("List", ListSchema);

export default List as Model<ListModelSchema>;
