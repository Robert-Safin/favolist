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
    //console.log('me:', currentUser);

    const unfollowTarget = await User.findOne({_id: unfollowTargetID})
    //console.log('ante:',unfollowTarget );




     // @ts-ignore missging mongoose models :(
    await currentUser?.follows.pull(unfollowTargetID)
     // @ts-ignore missging mongoose models :(
    await unfollowTarget?.followers.pull(currentUser)




    await currentUser?.save()
    await unfollowTarget?.save()


    res.json({message: "unfollowed"})

  } catch (error) {
    res.json({message: 'there was an error', error: error})
  }
};

export default handler;
