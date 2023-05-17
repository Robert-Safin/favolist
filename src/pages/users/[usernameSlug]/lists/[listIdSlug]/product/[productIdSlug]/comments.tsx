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
        />
      )}

      <form className={styles.formContainer} onSubmit={handleNewComment}>
        <label className={styles.label} htmlFor="new-comment">New Comment</label>

        <div className={styles.textareaAndButton}>
          <textarea className={styles.textarea} id="new-comment" ref={commentRef}></textarea>
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

  const userDoc = await User.findOne({ username: usernameSlug })
  await userDoc!.populate('products')
  const targetProduct = userDoc?.products.find(product => product.productName === productSlug)

  const targetProductWithComments = await targetProduct?.populate('comments')



  // return product with populated comments and for each comment populate user object

    await Promise.all(
        targetProductWithComments!.comments.map(async comment => await comment.populate('userId'))
    );













  await connectDB()

  return {
    props: {
      currentUserEmail: currentUser?.user?.email,
      targetProductId: JSON.stringify(targetProduct?._id),
      comments: JSON.parse(JSON.stringify(targetProductWithComments?.comments))
    }
  }

}

export default CommentsPage
