import { List, User } from "@/db/models";

import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req });

    const userDoc = await User.findOne({ email: token?.email });

    const getRandomValue = (arr: any[]) => {
      let randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    };

    if (userDoc?.follows.length! > 0) {
      const randomFriendId = getRandomValue(userDoc?.follows!);
      const randomFriendDoc = await User.findOne({ _id: randomFriendId });
      const randomFriendListId = getRandomValue(randomFriendDoc?.lists!);
      const randomListDoc = await List.findOne({ _id: randomFriendListId });
      const randomListOwner = await User.findOne({
        _id: randomListDoc?.user_id,
      });
      console.log("listDoc:", randomListDoc, "userDoc:", randomListOwner);

      res.status(200).json({ listDoc: randomListDoc, userDoc: randomListOwner });
    } else {
      res.status(400).json({ message: "not matched" });
    }
  } catch (error) {
    console.log(error);
  }
};
export default handler;
