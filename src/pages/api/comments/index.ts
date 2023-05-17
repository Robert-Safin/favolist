import { connectDB } from "@/db/lib/connectDb";
import { Comment, Product, User } from "@/db/models";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userEmail = req.body.userEmail;
  const productId = req.body.productId
  const comment = req.body.comment;



  const productObjectId = new mongoose.Types.ObjectId(JSON.parse(productId));



  try {
    await connectDB()
    const productDoc = await Product.findOne({_id: productObjectId})
    const userDoc = await User.findOne({email: userEmail})

    const newComment = new Comment({
      productId: productDoc?._id,
      userId: userDoc?._id,
      content: comment,
    })

    await newComment.save()

    productDoc?.comments.push(newComment)

    await productDoc?.save()

    res.json({message: 'ok'})



  } catch(error) {
    console.log(error);

  }

};


export default handler
