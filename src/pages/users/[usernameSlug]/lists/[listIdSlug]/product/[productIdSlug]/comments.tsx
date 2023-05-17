import { GetServerSideProps, NextPage } from "next";
import styles from './comments.module.css'
import { connectDB } from "@/db/lib/connectDb";
import { getSession } from "next-auth/react";
import { User } from "@/db/models";
import { ObjectId } from "mongodb";
import { CommentModelSchema } from "@/db/models/Comment";
import { ReactEventHandler, useRef } from "react";
import { useRouter } from "next/router";
import Comment from "@/components/comments&replies /Comment";


interface Props {
  currentUserEmail: string
  targetProductId: ObjectId
  comments: CommentModelSchema[]
}
const CommentsPage: NextPage<Props> = (props) => {

  const router = useRouter()
  const usernameSlug = router.query.usernameSlug
  const listSlug = router.query.listIdSlug
  const productSlug = router.query.productIdSlug

  const commentRef = useRef<HTMLTextAreaElement>(null)
  const productHasNoComments = props.comments.length === 0

  const handleNewComment: ReactEventHandler = async (e) => {
    e.preventDefault()

    const enteredComment = commentRef.current?.value

    const data = {
      userEmail: props.currentUserEmail,
      productId: props.targetProductId,
      comment: enteredComment,
    }

    try {
      const response = await fetch('/api/comments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response);

      if (response.ok) {
        router.push(`/users/${usernameSlug}/lists/${listSlug}/product/${productSlug}/comments`)
      }

    } catch (error) {
      console.log(error);

    }

  }

  return (
    <div className={styles.mainContainer}>

      <div className={styles.title}>
        <h1>Comments</h1>
        {productHasNoComments && <p>This product has no comments</p>}
      </div>

      {!productHasNoComments && props.comments.map(comment =>
        <Comment
        key={String(comment._id)}
        content={comment.content}
        username={comment.userId.username}
        avatar={comment.userId.avatar!}
        timestamp={comment.createdAt}
        replies={comment.replies}
        _id={comment._id}
        />
      )}

      <form className={styles.formContainer} onSubmit={handleNewComment}>

        <div className={styles.textareaAndButton}>
          <textarea className={styles.textarea} id="new-comment" placeholder="New Comment" ref={commentRef}></textarea>
          <button className={styles.button} type="submit">Submit</button>
        </div>

      </form>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const usernameSlug = context.query.usernameSlug
  const listSlug = context.query.listIdSlug
  const productSlug = context.query.productIdSlug

  const currentUser = await getSession(context)

  await connectDB()
  const targetProduct = await User.findOne({ username: usernameSlug })
  .populate({
    path: 'products',
    match: { productName: productSlug },
    populate: {
      path: 'comments',
      populate: [
        { path: 'userId' },
        {
          path: 'replies',
          populate: {
            path: 'userId'
          }
        }
      ]
    }
  });






  return {
    props: {
      currentUserEmail: currentUser?.user?.email,
      targetProductId: JSON.stringify(targetProduct?.products[0]._id),
      comments: JSON.parse(JSON.stringify(targetProduct?.products[0].comments))
    }
  }

}

export default CommentsPage
