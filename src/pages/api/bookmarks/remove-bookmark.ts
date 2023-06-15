import { connectDB } from "@/db/lib/connectDb";
import { Product, User } from "@/db/models";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async(req:NextApiRequest,res:NextApiResponse) => {
  const userEmail = req.body.bookmarkedByEmail
  const productId = req.body.productId


  try {
    await connectDB()
    const userDoc = await User.findOne({email:userEmail})
    const productDoc =  await Product.findById(productId)

    // @ts-ignore ???
    await productDoc?.bookmarkedBy.pull(userDoc!)

    await productDoc?.save()

    res.json({message: 'ok'})

  } catch(error) {
    console.log(error);
  }

}

export default handler
