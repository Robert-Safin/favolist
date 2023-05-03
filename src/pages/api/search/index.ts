import { connectDB } from "@/db/lib/connectDb";
import List from "@/db/models/List";
import Product from "@/db/models/Product";
import User from "@/db/models/User";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = req.body;
    await connectDB();

    const words = query.split(' ');

    const regexWords = words.map((word: string) => new RegExp(word, 'i'));

    // to do filter out irrelevant data: ids, emails, etc !!!!

    const foundLists = await List.find({ title: { $in: regexWords } });

    const foundUsers = await User.find({ username: { $in: regexWords } });

    const foundProducts = await Product.find({ productName: { $in: regexWords } });

    const matchedFound = foundLists.length + foundUsers.length + foundProducts.length

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
