import { connectDB } from "@/db/lib/connectDb";
import { User, List, Product } from "@/db/models";
import { UserModelSchema } from "@/db/models/User";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = req.body;
    await connectDB();

    const words = query.split(' ');

    const regexWords = words.map((word: string) => new RegExp(word, 'i'));

    const foundLists = await List.find({ title: { $in: regexWords } }).populate('user_id');

    const foundUsers = await User.find({ username: { $in: regexWords } })

    const foundProducts = await Product.find({ productName: { $in: regexWords } }).populate('user_id');

    const matchedFound = foundLists.length + foundUsers.length + foundProducts.length


    //console.log(foundUsers);











    res.json({
      message: "ok",
      matchedFound: matchedFound,
      foundUsers: JSON.stringify(foundUsers),
      foundLists: JSON.stringify(foundLists),
      foundProducts: JSON.stringify(foundProducts),
    });
  } catch (error) {
    res.json({ message: "error", error: error });
  }
};

export default handler;
