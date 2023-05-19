import { connectDB } from "@/db/lib/connectDb";
import { User, List, Product, Social } from "@/db/models";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// to do: secure route







const handler:NextApiHandler = async(req:NextApiRequest, res:NextApiResponse) => {

  //const username = req.body.newUsername
  const bio = req.body.newBio
  const email = req.body.userEmail

  const facebook = req.body.facebook as string
  const instagram = req.body.instagram as string
  const linkedin = req.body.linkedin as string
  const meduim =req.body.meduim as string
  const patreon = req.body.patreon as string
  const snapchat = req.body.snapchat as string
  const twitch = req.body.twitch as string
  const twitter = req.body.twitter as string
  const youtube = req.body.youtube as string




  try {
    await connectDB()
    const userDoc = await User.findOne({email: email})
    await userDoc?.updateOne({bio:bio})


    await userDoc?.populate('socials')



    res.status(200).json({message: "ok"})
  } catch(error) {
    res.status(500).json({message: error})
  }






}

export default handler
