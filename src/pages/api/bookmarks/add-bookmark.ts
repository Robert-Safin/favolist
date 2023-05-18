import { Product, User } from "@/db/models";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async(req:NextApiRequest,res:NextApiResponse) => {
  const userEmail = req.body.bookmarkedByEmail
  const productId = req.body.productId

  try {
    const userDoc = await User.findOne({email:userEmail})
    const productDoc =  await Product.findById(productId)

    if (productDoc!.bookmarkedBy.some(bookmarkedUser => String(bookmarkedUser) === String(userDoc!._id))) {
      return res.status(400).json({message: 'This product has already been bookmarked by the user.'})
    }


    productDoc?.bookmarkedBy.push(userDoc!)

    await productDoc?.save()

    res.json({message: 'ok'})

  } catch(error) {
    console.log(error);
  }

}

export default handler
