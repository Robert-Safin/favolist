import { connectDB } from "@/db/lib/connectDb";
import { User, List, Product } from "@/db/models";
import { getToken } from "next-auth/jwt"
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const token = await getToken({ req })


  try {
    await connectDB();

    const query = req.body.query

    const words = query.split(' ');

    const regexWords = words.map((word: string) => new RegExp(word, 'i'));

    const foundLists = await List.find({ title: { $in: regexWords } }).populate('user_id');
    const foundUsers = await User.find({ username: { $in: regexWords } })
    const foundProducts = await Product.find({ productName: { $in: regexWords } }).populate('user_id');
    const foundReferrals = foundProducts.filter(product => product.referral.length > 0)



    const currentUser = await User.findOne({email: token?.email})





    res.json({
      message: "ok",
      foundUsers: JSON.stringify(foundUsers),
      foundLists: JSON.stringify(foundLists),
      foundProducts: JSON.stringify(foundProducts),
      foundReferrals: JSON.stringify(foundReferrals),
      currentUser: JSON.stringify(currentUser)
    });
  } catch (error) {
    res.json({ message: "error", error: error });
  }
};

export default handler;
