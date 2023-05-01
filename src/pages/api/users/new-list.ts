import { connectDB } from "@/db/lib/connectDb";
import List from "@/db/models/List";
import User from "@/db/models/User";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";


const handler:NextApiHandler = async(req:NextApiRequest, res:NextApiResponse) => {
  const email = req.body.userEmail
  const listTitle = req.body.listTitle

  try {
    await connectDB()
    const user = await User.findOne({email:email})

    const newList =  new List({user_id: user?._id, title: listTitle})
    await newList.save()


    user?.lists.push(newList)

    await user?.save()
    res.status(200).json({message: "ok"})
  } catch(error) {
    console.log(error);
    res.status(400).json({message: error})

  }

}

export default handler
