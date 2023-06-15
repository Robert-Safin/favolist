import { User } from "@/db/models";
import { UserModelSchema } from "@/db/models/User";
import { ObjectId } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });

  if (!token) {
    console.log('no token');

  }

  const userDoc = await User.findOne({ email: token?.email });

  const getRandomValue = (arr: UserModelSchema[]) => {
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };
  if (userDoc?.follows.length !== undefined) {
    const randomFriendId = getRandomValue(userDoc?.follows!);
    const randomFriendDoc = await User.findOne({ _id: randomFriendId });
    if (randomFriendDoc?.follows !== undefined) {
      const randomFriendFriendsDoc = await randomFriendDoc?.populate("follows");
      const filteredFollows = randomFriendFriendsDoc?.follows.filter(
        (id) => !userDoc?.follows.includes(id)
      );
      res.json({ filteredFollows });
    } else {
      console.log('NO FRIEND FOLLOWS');

    }
  } else {
    console.log('NO FOLLOWS');

  }
};
export default handler;
