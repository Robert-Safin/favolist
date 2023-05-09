
import { ObjectId } from 'mongoose'
import { FC } from 'react'
import styles from './FoundProductCard.module.css'
import Image from 'next/image'
import { UserModelSchema } from '@/db/models/User'
interface Props {
  productId: ObjectId
  userId: ObjectId |UserModelSchema
  listId: ObjectId
  productName: string
  productListName: string
  productLogo: string
  productImage: string
  content: string
  price: number
  referral: string
  userAvatar: string
  userName: string
}

const FoundProductCard: FC<Props> = (props) => {

  const maxContentLength = 100
  let shortContent
  if (props.content.length > maxContentLength) {
    shortContent = props.content.substring(0, maxContentLength) + '...'
  } else {
    shortContent = props.content
  }
  return (
    <div className={styles.productContainer}>



      <div className={styles.infoContainer}>

              <div className={styles.productInfo}>
                <h2 className={styles.listName}>{props.productListName}</h2>
                <h1 className={styles.productName}>{props.productName}</h1>
                <h3 className={styles.price}>${props.price}</h3>
                <p>{shortContent}</p>
              </div>

              <div className={styles.imageAndButton}>
                <Image className={styles.image} src={props.productImage} alt={'product name'} width={100} height={100}/>
                <button className={styles.button}>View product</button>
              </div>

      </div>

      <div className={styles.userInfo}>
        <Image className={styles.avatar} src={props.userAvatar} alt='user avatar' width={50} height={50}/>
          <p className={styles.username}>{props.userName}</p>
      </div>


    </div>
  )
}

export default FoundProductCard

// {props.productId}

// {props.userId}

// {props.listId}

//

// {props.productLogo}

// {props.productImage}

// {props.content}

// {props.price}

// {props.referral}
