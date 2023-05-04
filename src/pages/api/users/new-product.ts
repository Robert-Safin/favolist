import { connectDB } from "@/db/lib/connectDb";
import List from "@/db/models/List";
import User from "@/db/models/User";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";
import Product from "@/db/models/Product";

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
  const price = req.body.enteredPrice;
  const referral = req.body.enteredReferral;
  const image = req.body.image;

  try {
    const uploadResponse = await cloudinary.v2.uploader.upload(image, {
      folder: "FAVOLIST",
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
    //console.log(listTitle);


    const newProduct = new Product({
      user_id: userDoc?._id,
      listId: listId,
      productListName: listTitle,
      productName: name,
      productImage: secure_url,
      content: content,
      price: price,
      referral: referral,
    })
    // to do productListName is no saved
    //console.log(newProduct);

    await newProduct.save()
    list?.products.push(newProduct)
    res.json({message: 'success'})
  } catch (error) {
    res.json({message: 'error', error: error});
  }
};

export default handler;
