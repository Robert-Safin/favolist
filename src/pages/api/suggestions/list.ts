
import { List, User } from "@/db/models";
import { UserModelSchema } from "@/db/models/User";
import { ObjectId } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";





const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });

  const userDoc = await User.findOne({ email: token?.email });

  const getRandomValue = (arr:any[]) => {
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  if (userDoc?.follows.length! > 0) {
    const randomFriendId = getRandomValue(userDoc?.follows!)
    const randomFriendDoc = await User.findOne({_id: randomFriendId})
    const randomFriendListId = getRandomValue(randomFriendDoc?.lists!)
    const randomListDoc = await  List.findOne({_id: randomFriendListId})
    const randomListOwner = await User.findOne({_id: randomListDoc?.user_id})
    res.status(400).json({listDoc: randomListDoc, userDoc: randomListOwner })
  } else {
    res.status(400).json({message: 'not matched'})
  }
};
export default handler;
