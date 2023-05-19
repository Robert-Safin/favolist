import { connectDB } from "@/db/lib/connectDb";
import { Product, User } from "@/db/models";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = req.body.email;
  const listName = req.body.listName;
  const productTitle = req.body.product;



  // delete Product from User
  // delete Product from User's List

  try {
    //await connectDB()
    const userDoc  = await User.findOne({email:  email})
    await userDoc?.populate('lists')
    const targetList = userDoc?.lists.find(list => list.title === listName )
    await targetList?.populate('products')
    const targetProduct = targetList?.products.find(product => product.productName === productTitle)



    const productId = targetProduct?._id
     // @ts-ignore missging mongoose models :(
    await userDoc?.products.pull(productId)
     // @ts-ignore missging mongoose models :(
    await targetList?.products.pull(productId)

    await Product.deleteOne({_id: productId})

    await userDoc?.save()
    await targetList?.save()

    res.json({message: 'ok'})

  } catch(error) {
    console.log(error);

  }
};

export default handler;
