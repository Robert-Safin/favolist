import { connectDB } from "@/db/lib/connectDb";
import { User, List, Product, Social } from "@/db/models";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// to do: secure route







const handler:NextApiHandler = async(req:NextApiRequest, res:NextApiResponse) => {


  const bio = req.body.newBio
  const email = req.body.userEmail

  const facebook = req.body.facebook as string
  const instagram = req.body.instagram as string
  const linkedin = req.body.linkedin as string
  const medium = req.body.medium as string
  const patreon = req.body.patreon as string
  const snapchat = req.body.snapchat as string
  const twitch = req.body.twitch as string
  const twitter = req.body.twitter as string
  const youtube = req.body.youtube as string
  const tiktok = req.body.tiktok as string
  const github = req.body.github as string




  try {
    await connectDB()
    const userDoc = await User.findOne({email: email})
    await userDoc?.updateOne({bio:bio})



    const socialDoc = await Social.findOne({userId:userDoc?._id})



    socialDoc!.facebook = facebook
    socialDoc!.instagram = instagram
    socialDoc!.linkedin = linkedin
    socialDoc!.medium = medium
    socialDoc!.patreon = patreon
    socialDoc!.snapchat = snapchat
    socialDoc!.twitch = twitch
    socialDoc!.twitter = twitter
    socialDoc!.youtube = youtube
    socialDoc!.tiktok = tiktok
    socialDoc!.github = github

    await socialDoc?.save()
    await userDoc?.save()



    res.status(200).json({message: "ok"})
  } catch(error) {
    res.status(500).json({message: error})
  }






}

export default handler
export const config = {
  api: {
    responseLimit: '10mb',
  },
}
