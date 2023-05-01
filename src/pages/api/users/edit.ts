import { connectDB } from "@/db/lib/connectDb";
import User from "@/db/models/User";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler:NextApiHandler = async(req:NextApiRequest, res:NextApiResponse) => {

  const session = await getSession({ req })

  if (!session) {
    console.log('no session');
  } else {
    console.log(session);

  }


}

export default handler
