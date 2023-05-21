import { connectDB } from "@/db/lib/connectDb";
import { User, List, Product } from "@/db/models";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";





const handler: NextApiHandler = async (req: NextApiRequest,res: NextApiResponse) => {
  const email = req.body.userEmail;
  const listTitle = req.body.listTitle;
  const secure_url = req.body.secure_url;
  const listAbout = req.body.listAbout

  try {



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
