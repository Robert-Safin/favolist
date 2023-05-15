import { connectDB } from "@/db/lib/connectDb";
import { List, User } from "@/db/models";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";


// to do: secure route
// followers should be unique

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
  const listId = req.body.listId;
  const title = req.body.listTitle;
  const about = req.body.listAbout;
  const thumbnail = req.body.image;

  try {
    await connectDB();

    const listDoc = await List.findById(listId);
    if (!listDoc) {
      res.json({ message: "no list found" });
    }


    const uploadResponse = await cloudinary.v2.uploader.upload(
      thumbnail,
      {
        folder: "FAVOLIST/lists",
        format: "webp",
      }
    );

    const secureUrl = uploadResponse.secure_url
    if (!secureUrl) {
      res.json({message: "no secure url"})
    }

    await listDoc?.updateOne({title: title, about:about, thumbnail:thumbnail})



  } catch (error) {
    console.log(error);

  }
};

export default handler;
