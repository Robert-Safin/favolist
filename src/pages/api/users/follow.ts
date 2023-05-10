import { connectDB } from "@/db/lib/connectDb";
import { User } from "@/db/models";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";


// to do: secure route


const handler: NextApiHandler = async (req: NextApiRequest,res: NextApiResponse) => {
  const currentUsername = req.body.currentUsername
  const followTargetUsername = req.body.followTargetUsername

  try {
    await connectDB()
    const currentUser = await User.findOne({username: currentUsername})
    const followTarget = await User.findOne({username: followTargetUsername})

    const userFollowing = await currentUser?.follows.push(followTarget!)
    const userGettingFollowed = await followTarget?.followers.push(currentUser!)

    await currentUser?.save()
    await followTarget?.save()


    res.json({message: "ok"})

  } catch (error) {
    res.json({message: 'there was an error', error: error})
  }
};

export default handler;
