import { connectDB } from "@/db/lib/connectDb";
import User from "@/db/models/User";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// to do: secure route

export interface UserProfileUpdateForm {
  newUsername: string,
  newBio: string,
  userEmail: string
}





const handler:NextApiHandler = async(req:NextApiRequest, res:NextApiResponse) => {

  const username = req.body.newUsername
  const bio = req.body.newBio
  const email = req.body.userEmail

  try {
    await connectDB()
    const user = await User.findOne({email: email})
    await user?.updateOne({username:username,bio:bio})
    res.status(200).json({message: "ok"})
  } catch(error) {
    res.status(500).json({message: error})
  }






}

export default handler
