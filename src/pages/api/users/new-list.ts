import { connectDB } from "@/db/lib/connectDb";
import List from "@/db/models/List";
import User from "@/db/models/User";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";

// to do: secure route

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



const handler: NextApiHandler = async (req: NextApiRequest,res: NextApiResponse) => {
  const email = req.body.userEmail;
  const listTitle = req.body.listTitle;
  const thumbnail = req.body.image;
  const listAbout = req.body.listAbout

  try {
    const uploadResponse = await cloudinary.v2.uploader.upload(thumbnail, {
      folder: "FAVOLIST",
    });

    const secure_url = uploadResponse.secure_url
    await connectDB();
    const user = await User.findOne({ email: email });
    const newList = new List({
      user_id: user?._id,
      title: listTitle,
      thumbnail: secure_url,
      about: listAbout,
    });
    await newList.save();
    user?.lists.push(newList);
    await user?.save();
    res.json({message:'success'})
  } catch (error) {
    res.json({message: 'there was an error', error: error})
  }
};

export default handler;
