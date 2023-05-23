import { User } from "@/db/models";
import { UserModelSchema } from "@/db/models/User";
import { GetServerSideProps, NextPage } from "next";
import styles from './index.module.css'
import Image from "next/image";
import { BsBookmark } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { useState } from "react";
import { RxLinkedinLogo } from "react-icons/rx";
import Link from "next/link";
import { useRouter } from "next/router";
import { connectDB } from "@/db/lib/connectDb";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { getSession, useSession } from "next-auth/react";
import CustomSession from "@/utils/Session";
import { ObjectId } from "mongoose";

interface Props {
  user: UserModelSchema
  bookmarkedBy: UserModelSchema[]
  currentUserId: ObjectId
}


const ShowProduct: NextPage<Props> = (props) => {
  console.log(props);

  const router = useRouter()
  const usernameSlug = router.query.usernameSlug
  const listSlug = router.query.listIdSlug
  const productSlug = router.query.productIdSlug

  const { data: session, status } = useSession()
  const userSession = session as CustomSession

  const deltaString = props.user.products[0].content
  const deltaObject = JSON.parse(deltaString);
  const converter = new QuillDeltaToHtmlConverter(deltaObject.ops, {});
  const html = converter.convert();


  const [reviewIsActive, setReviewIsActive] = useState(true)
  const [descriptionIsActive, setDescriptionIsActive] = useState(false)
  const [referralIsActive, setReferralIsActive] = useState(false)

 // @ts-ignore ??????
  const currentUserAlreadyBookmarked = props.user.products[0].bookmarkedBy.includes(props.currentUserId)


  const handleReviewActive = () => {
    setReviewIsActive(true)
    setDescriptionIsActive(false)
    setReferralIsActive(false)
  }
  const handleDescriptionActive = () => {
    setReviewIsActive(false)
    setDescriptionIsActive(true)
    setReferralIsActive(false)
  }
  const handleReferralActive = () => {
    setReviewIsActive(false)
    setDescriptionIsActive(false)
    setReferralIsActive(true)
  }

  const handleAddBookmark = async () => {
    const data = {
      bookmarkedByEmail: userSession.user.email,
      productId: props.user.products[0]._id,
    }
    const response = await fetch('/api/bookmarks/add-bookmark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    router.push(`/users/${userSession.user.email}/lists/${listSlug}`)
  }

  const handleRemoveBookmark = async () => {
    const data = {
      bookmarkedByEmail: userSession.user.email,
      productId: props.user.products[0]._id,
    }
    const response = await fetch('/api/bookmarks/remove-bookmark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    router.push(`/users/${userSession.user.email}/lists/${listSlug}`)
  }


  return (
    <div className={styles.mainContainer}>
      <div className={styles.productStats}>
        <h2>{props.user.lists[0].title}</h2>
        <h1>{props.user.products[0].productName}</h1>
        <h3>${props.user.products[0].price}</h3>
        <Image src={props.user.products[0].productImage} alt={props.user.products[0].productName} width={500} height={500} className={styles.image}/>
      </div>

      <div className={styles.user}>

        <div className={styles.userAvatarAndName}>
          <Link href={`/users/${props.user.username}`}><Image src={props.user.avatar!} alt={props.user.username} width={50} height={50} className={styles.avatar}/></Link>
          <p>{props.user.username}</p>
        </div>

        <Image src={props.user.products[0].productLogo} alt={`product logo`} width={50} height={50} className={styles.logo}/>




        <div className={styles.actions}>
          <div className={styles.iconContainer}>
            <BsBookmark />
            <p>x</p>
          </div>

          <div className={styles.iconContainer}>
            <IoMdAddCircleOutline />
            <p>x</p>
          </div>

          <div className={styles.iconContainer}>
            <Link href={`/users/${usernameSlug}/lists/${listSlug}/product/${productSlug}/comments`}>
            <FaRegComment />
            </Link>
            <p>{props.user.products[0].comments.length}</p>
          </div>
        </div>


      </div>


      <div className={styles.tabs}>
        <p onClick={handleReviewActive} className={reviewIsActive ? styles.activeTab : styles.nonActiveTab}>Review</p>
        <p onClick={handleDescriptionActive} className={descriptionIsActive ? styles.activeTab : styles.nonActiveTab}>Description</p>
        <p onClick={handleReferralActive} className={referralIsActive ? styles.activeTab : styles.nonActiveTab}>Referral</p>
      </div>

      {reviewIsActive && <div className={styles.tabWindow}>
        <p className={styles.productContent} dangerouslySetInnerHTML={{ __html: html }} />
      </div>}

      {descriptionIsActive && <div className={styles.tabWindow}>
        <p>{props.user.products[0].specs}</p>
      </div>}

      {referralIsActive && <div className={styles.tabWindow}>
        <p>{props.user.products[0].referralDiscription}</p>
        <p>{props.user.products[0].referral}</p>
      </div>}


    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB();
  const userSlug = context.query.usernameSlug
  const listSlug = context.query.listIdSlug
  const productSlug = context.query.productIdSlug



  const userDoc = await User.findOne({ username: userSlug })

  await userDoc?.populate({
    path: 'lists',
    match: { title: listSlug }
  })

  await userDoc?.populate({
    path: 'products',
    match: { productName: productSlug }
  })


  return {
    props: {
      user: JSON.parse(JSON.stringify(userDoc)),

    }
  }
}

export default ShowProduct
