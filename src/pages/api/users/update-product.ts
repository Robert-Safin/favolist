import { connectDB } from "@/db/lib/connectDb";
import { Product } from "@/db/models";
import { NextApiRequest, NextApiResponse } from "next";

  const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = req.body.email;
  const productId = req.body.productId;
  const title = req.body.title
  const review = req.body.review;
  const specs = req.body.specs;
  const price = req.body.price;
  const referral = req.body.referral;
  const referralLink = req.body.referralLink;
  const image = req.body.productImage

    //await connectDB()

    const productDoc = await Product.findById(productId)
    await productDoc?.updateOne({
      productName: title,
      content: review,
      specs: specs,
      price: price,
      referral: referralLink,
      referralDiscriptio: referral,
      productImage: image,
    })
    await productDoc?.save()


    res.json({message: "ok"})
};

export default handler
