import { User } from "@/db/models";
import { UserModelSchema } from "@/db/models/User";
import { ObjectId } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req });

    if (!token) {
      console.log('no token');
      res.status(401).json({ error: 'Not authorized' });
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
          (id) => !userDoc?.follows.map(follow => follow.toString()).includes(id.toString())
      );
      console.log('filteredFollows', filteredFollows);

        res.json({ filteredFollows });
      }
    }

  } catch(error) {
    console.log(error);

  }
};
export default handler;
