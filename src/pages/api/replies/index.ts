import { connectDB } from "@/db/lib/connectDb"
import { Comment, Reply, User } from "@/db/models"
import { NextApiRequest, NextApiResponse } from "next"


const handler = async(req:NextApiRequest, res:NextApiResponse) => {
  const content = req.body.reply
  const email = req.body.repliedBy
  const commentId = req.body.commentId

  await connectDB()

  const replyByUser = await User.findOne({email: email})

  const newReply = new Reply({
    commentId: commentId,
    userId: replyByUser?._id,
    content: content,
  })

  await newReply.save()

  const targetComment = await Comment.findById(commentId)

  await targetComment?.replies.push(newReply)
  await targetComment?.save()

  console.log(newReply);
  res.json({message: 'ok'})

}

export default handler
