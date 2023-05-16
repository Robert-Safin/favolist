import { connectDB } from "@/db/lib/connectDb";
import { User, List, Product } from "@/db/models";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";


// to do: secure route

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const email = req.body.userEmail;
  const listName = req.body.listName;
  const name = req.body.productName;
  const content = req.body.enteredContent;
  const specs = req.body.enteredSpecs;
  const price = req.body.enteredPrice;
  const referral = req.body.enteredReferral;
  const referralDiscription = req.body.enteredReferralDiscription
  const image = req.body.image;

  try {
    const uploadResponse = await cloudinary.v2.uploader.upload(image, {
      folder: "FAVOLIST/products",
    })

    const secure_url = uploadResponse.secure_url;
    await connectDB();
    const userDoc = await User.findOne({ email: email })
      .populate({
        path: "lists",
        match: { title: listName },
      })
      .exec();

    const listId = userDoc?.lists[0]._id;
    const list = await List.findOne({ _id: listId });
    const listTitle = list?.title



    const newProduct = new Product({
      user_id: userDoc?._id,
      listId: listId,
      productListName: listTitle,
      productName: name,
      productImage: secure_url,
      content: content,
      specs: specs,
      price: price,
      referral: referral,
      referralDiscription: referralDiscription,
    })

    await newProduct.save()
    list?.products.push(newProduct)
    await list?.save()
    userDoc?.products.push(newProduct)
    userDoc?.save()
    res.json({message: 'success'})
  } catch (error) {
    res.json({message: 'error', error: error});
  }
};

export default handler;
