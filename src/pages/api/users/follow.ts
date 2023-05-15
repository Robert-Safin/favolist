import { connectDB } from "@/db/lib/connectDb";
import { User } from "@/db/models";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";


// to do: secure route
// followers should be unique


const handler: NextApiHandler = async (req: NextApiRequest,res: NextApiResponse) => {
  const currentUserEmail = req.body.currentUserEmail
  const followTargetID = req.body.followTargetID


  try {
    await connectDB()
    const currentUser = await User.findOne({email: currentUserEmail})
    const followTarget = await User.findOne({_id: followTargetID})

    const userFollowing = await currentUser?.follows.push(followTarget!)
    const userGettingFollowed = await followTarget?.followers.push(currentUser!)

    await currentUser?.save()
    await followTarget?.save()


    res.json({message: "followed"})

  } catch (error) {
    res.json({message: 'there was an error', error: error})
  }
};

export default handler;
