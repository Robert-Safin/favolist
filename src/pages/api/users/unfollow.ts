import { connectDB } from "@/db/lib/connectDb";
import { User } from "@/db/models";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";


// to do: secure route
// followers should be unique


const handler: NextApiHandler = async (req: NextApiRequest,res: NextApiResponse) => {
  const currentUserEmail = req.body.currentUserEmail
  const unfollowTargetID= req.body.unfollowTargetID

  try {
    await connectDB()
    const currentUser = await User.findOne({email: currentUserEmail})
    const unfollowTarget = await User.findOne({_id: unfollowTargetID})
     // @ts-ignore missging mongoose models :(
    const userFollowing = await currentUser?.follows.pull(unfollowTargetID)
     // @ts-ignore missging mongoose models :(
    const userGettingFollowed = await unfollowTarget?.followers.pull(currentUsername)

    await currentUser?.save()
    await unfollowTarget?.save()


    res.json({message: "unfollowed"})

  } catch (error) {
    res.json({message: 'there was an error', error: error})
  }
};

export default handler;
