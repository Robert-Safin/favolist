import { FC, ReactEventHandler, useRef, useState } from "react";
import styles from './Comment.module.css'
import Image from "next/image";
import { ReplyModelSchema } from "@/db/models/Reply";
import { useSession } from "next-auth/react";
import CustomSession from "@/utils/Session";
import { ObjectId } from "mongoose";
import { useRouter } from "next/router";



interface Props {
  content: string;
  username: string;
  avatar: string;
  timestamp: string;
  replies: ReplyModelSchema[]
  _id: ObjectId
}
const Comment: FC<Props> = (props) => {
  const router = useRouter()

  const usernameSlug = router.query.usernameSlug
  const listSlug = router.query.listIdSlug
  const productSlug = router.query.productIdSlug




  const [showReplies, setShowReplies] = useState(false)
  const replyRef = useRef<HTMLInputElement>(null)

  const { data: session, status } = useSession()
  const userSession = session as CustomSession

  const date = new Date(props.timestamp)
  const now = new Date()
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInDays = Math.round(diffInMilliseconds / (24 * 60 * 60 * 1000))

  let isCommentedToday
  if (diffInDays === 0) {
    isCommentedToday = "Today"
  } else {
    isCommentedToday = diffInDays + " days ago"
  }

  const handleReplySubmit: ReactEventHandler = async (e) => {
    e.preventDefault()
    const data = {
      reply: replyRef.current?.value,
      repliedBy: userSession.user.email,
      commentId: props._id
    }

    try {
      const response = await fetch('/api/replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        replyRef.current!.value = ''
        await router.push(`/users/${usernameSlug}/lists/${listSlug}/product/${productSlug}/comments`)
      }

    } catch (error) {

    }
  }

  return (
    <div className={styles.commentContainer}>


        <Image className={styles.mainAvatar} src={props.avatar} alt={`user avatar`} width={300} height={300} />


      <div className={styles.commentContent}>

        <div className={styles.bgGray}>
          <h3 className={styles.mainUsername}>{props.username}</h3>
          <p className={styles.mainComment}>{props.content}</p>
        </div>

        <div className={styles.actions}>
          <p className={styles.timeStamp}>{isCommentedToday}</p>
          <p>Reply</p>
          <p>Like</p>
        </div>

        <h1 className={styles.viewReplies} onClick={() => setShowReplies(!showReplies)}>View previous {props.replies.length} replies </h1>

        {showReplies &&

          <>
            {props.replies.map(reply =>
            <div key={String(reply._id)} className={styles.replyContainer}>
              <Image className={styles.replyAvatar} src={reply.userId.avatar!} alt={`user avatar`} width={300} height={300}/>
              <p className={styles.replyUsername}>{reply.userId.username}</p>
              <p className={styles.replyContent}>{reply.content}</p>
            </div>
            )}

            <form className={styles.replyFrom} onSubmit={handleReplySubmit}>
              <input className={styles.replyInput} type="text" ref={replyRef} placeholder="New reply" />
              <button className={styles.replyButton} type="submit">Submit</button>
            </form>

          </>}

      </div>



    </div>
  )
}

export default Comment
