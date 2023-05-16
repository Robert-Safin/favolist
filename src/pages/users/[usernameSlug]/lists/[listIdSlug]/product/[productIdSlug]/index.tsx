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
interface Props {
  user: UserModelSchema
}

const ShowProduct: NextPage<Props> = (props) => {

  const [reviewIsActive, setReviewIsActive] = useState(true)
  const [descriptionIsActive, setDescriptionIsActive] = useState(false)
  const [referralIsActive, setReferralIsActive] = useState(false)


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
          <Image src={props.user.avatar!} alt={props.user.username} width={50} height={50} className={styles.avatar}/>
          <p>{props.user.username}</p>
        </div>

        <Image src={props.user.products[0].productLogo} alt={`product logo`} width={50} height={50} className={styles.logo}/>




        <div className={styles.actions}>
          <div className={styles.iconContainer}>
            <BsBookmark />
            <p>0</p>
          </div>

          <div className={styles.iconContainer}>
            <IoMdAddCircleOutline />
            <p>1</p>
          </div>

          <div className={styles.iconContainer}>
            <FaRegComment />
            <p>3</p>
          </div>
        </div>


      </div>


      <div className={styles.tabs}>
        <p onClick={handleReviewActive} className={reviewIsActive ? styles.activeTab : styles.nonActiveTab}>Review</p>
        <p onClick={handleDescriptionActive} className={descriptionIsActive ? styles.activeTab : styles.nonActiveTab}>Description</p>
        <p onClick={handleReferralActive} className={referralIsActive ? styles.activeTab : styles.nonActiveTab}>Referral</p>
      </div>

      {reviewIsActive && <div className={styles.tabWindow}>
        <p>{props.user.products[0].content}</p>
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
      user: JSON.parse(JSON.stringify(userDoc))
    }
  }
}

export default ShowProduct
