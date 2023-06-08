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
import { useRouter } from 'next/router';

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

}

const FeedProductCard: FC<Props> = (props) => {
  const { data: session, status } = useSession()
  const userSession = session as CustomSession
  const router = useRouter()

  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const productIsBookmarked = props.currentUserDoc.bookmarks.some(bookmark=> props.id)
    setIsBookmarked(productIsBookmarked)
  },[props.currentUserDoc.bookmarks, props.id ])




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
    if (response.ok) {
      router.push(`/users/${userSession.user.username}/lists/${listSlug}/product/${props.user.products[0].productName}`)
    } else {
      console.log(await response.json())
    }
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
    if (response.ok) {
      router.push(`/users/${userSession.user.username}/lists/${listSlug}/product/${props.user.products[0].productName}`)
    } else {
      console.log(await response.json())
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.suspensionPoints}>
        <button className="p-2">
          <RxDotsHorizontal />
        </button>
      </div>

      <h2 className={styles.category}>{props.productListName}</h2>
      <h2 className={styles.title}>{props.productName}</h2>
      <h2 className={styles.price}>${props.price}</h2>
      <div className={styles.imgContainer}>
        <Image className={styles.image}
          width={500}
          height={500}
          alt='product'
          src={props.productImage}
        />
      </div>

      <div className={styles.cardBar}>
        <div className={styles.userInfo}>
        <Image className={styles.avatar} src={props.user.avatar!} alt={'user avatar'} width={50} height={50}/>
        <p>{props.user.username}</p>
        </div>

        <div className={styles.actions}>
          {!isBookmarked &&
          <div><BsBookmark /></div>
          }
          {isBookmarked &&
          <div><BsFillBookmarkFill /></div>
          }

          <div><FaRegComment /></div>

        </div>
      </div>

      <div className={styles.descriptionContainer}>
        <p className={styles.descriptionList}>{props.shortContent}</p>
      </div>

    </div>
  );
};

export default FeedProductCard;
