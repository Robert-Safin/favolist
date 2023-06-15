import React, { useEffect, useState } from 'react';
import styles from './FeedCard.module.css'
import Avatar from '../avatar/Avatar';
import { FC } from 'react';
import Image from 'next/image';
import { RxAvatar } from 'react-icons/rx';
import { HiOutlineBookmark } from 'react-icons/hi';
import { BiCommentDetail } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { RxDotsHorizontal } from 'react-icons/rx';
import { ObjectId } from 'mongoose';
import { UserModelSchema } from '@/db/models/User';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import CustomSession from '@/utils/Session';
import { Router, useRouter } from 'next/router';
import Link from 'next/link';
import { CommentModelSchema } from '@/db/models/Comment';
import { motion } from 'framer-motion'

interface Props {
  id: ObjectId;
  userId: ObjectId,
  productListName: string
  productName: string
  productLogo: string;
  productImage: string;
  shortContent: string;
  price: number;
  referral: string,
  user: UserModelSchema
  currentUserDoc: UserModelSchema
  bookmarkedBy: ObjectId[]
  comments: CommentModelSchema[]

}

const FeedProductCard: FC<Props> = (props) => {
  const { data: session, status } = useSession()
  const userSession = session as CustomSession
  const router = useRouter()

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [bookmarkValue, setBookmarkValue] = useState(props.bookmarkedBy.length)

  useEffect(() => {

    const productIsBookmarked = props.bookmarkedBy.some(bookmark => bookmark === props.currentUserDoc._id)

    setIsBookmarked(productIsBookmarked)
  }, [props.currentUserDoc.bookmarks, props.id, props.bookmarkedBy, props.currentUserDoc._id])




  const handleAddBookmark = async () => {
    const data = {
      bookmarkedByEmail: userSession.user.email,
      productId: props.id,
    }
    const response = await fetch('/api/bookmarks/add-bookmark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setIsBookmarked(true)
      setBookmarkValue(bookmarkValue + 1)
    } else {
      console.log(await response.json())
    }
  }

  const handleRemoveBookmark = async () => {

    const data = {
      bookmarkedByEmail: userSession.user.email,
      productId: props.id,
    }

    const response = await fetch('/api/bookmarks/remove-bookmark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setIsBookmarked(false)
      setBookmarkValue(bookmarkValue - 1)
    } else {
      console.log(await response.json())
    }
  }


  return (


    <motion.div
      initial={{ y: 300, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}>

      <div className={styles.container}>


        <h2 className={styles.category}>{props.productListName}</h2>
        <h2 className={styles.title}>{props.productName}</h2>
        <h2 className={styles.price}>${props.price}</h2>
        <div className={styles.imgContainer}>
          <Link href={`/users/${props.user.username}/lists/${props.productListName}/product/${props.productName}`}>
            <Image className={styles.image} width={500} height={500} alt='product' src={props.productImage} />
          </Link>
        </div>

        <div className={styles.cardBar}>
          <Link href={`/users/${props.user.username}`}>
            <div className={styles.userInfo}>
              <Image className={styles.avatar} src={props.user.avatar!} alt={'user avatar'} width={50} height={50} />
              <p className={styles.username}>{props.user.username}</p>
            </div>
          </Link>

          <div className={styles.actions}>
            {!isBookmarked &&
              <div className={styles.actionContainer} onClick={handleAddBookmark}>
                <BsBookmark className={styles.icon} />
                <p className={styles.count}>{bookmarkValue}</p>
              </div>}

            {isBookmarked &&
              <div className={styles.actionContainer} onClick={handleRemoveBookmark}>
                <BsFillBookmarkFill className={styles.icon} />
                <p className={styles.count}>{bookmarkValue}</p>
              </div>}

            <Link href={`/users/${props.user.username}/lists/${props.productListName}/product/${props.productName}/comments`}>
              <div className={styles.actionContainer}>
                <FaRegComment className={styles.icon} />
                <p className={styles.count}>{props.comments.length}</p>
              </div>
            </Link>

          </div>
        </div>

        <div className={styles.descriptionContainer}>
          <p className={styles.descriptionList}>{props.shortContent}</p>
        </div>
      </div>
    </motion.div>

  );
};

export default FeedProductCard;
