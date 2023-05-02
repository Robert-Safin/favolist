import { Schema, models, model, ObjectId, Model, Document } from "mongoose";

import { ProductModelSchema } from "./Product";

export interface ListModelSchema extends Document{
  _id?: ObjectId;
  user_id: ObjectId;
  title: string;
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
