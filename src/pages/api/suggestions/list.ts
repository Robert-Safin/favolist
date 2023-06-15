import { connectDB } from "@/db/lib/connectDb";
import { List, User } from "@/db/models";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()
  try {
    const token = await getToken({ req });
    if (!token) {
      res.status(401).json({ error: 'Not authorized' });
      return;
    }

    const userDoc = await User.findOne({ email: token?.email }).populate('follows');
    if (!userDoc) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const getRandomValue = (arr: any[]) => {
      let randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    };

    if (userDoc?.follows?.length > 0) {
      const randomFriendDoc = getRandomValue(userDoc?.follows);
      if (!randomFriendDoc?.lists?.length) {
        res.status(400).json({ message: "Friend has no lists" });
        return;
      }
      const randomListId = getRandomValue(randomFriendDoc?.lists);
      const randomListDoc = await List.findOne({ _id: randomListId });

      res.status(200).json({ listDoc: randomListDoc, userDoc: randomFriendDoc });
    } else {
      res.status(400).json({ message: "User is not following anyone" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
