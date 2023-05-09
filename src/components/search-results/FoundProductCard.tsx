
import { ObjectId } from 'mongoose'
import { FC } from 'react'
import styles from './FoundProductCard.module.css'
import Image from 'next/image'
interface Props {
  productId: ObjectId
  userId: ObjectId
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
  return (
    <div className={styles.productContainer}>



      <div className={styles.infoContainer}>

              <div>
                <p>{props.productListName}</p>
                <p>{props.productName}</p>
                <p>{props.price}</p>
                <p>{props.content}</p>
              </div>

              <div>
                <Image src={props.productImage} alt={'product name'} width={50} height={50}/>
              </div>

      </div>

      <div className={styles.userInfo}>
        <Image src={props.userAvatar} alt='user avatar' width={50} height={50}/>
          <p>{props.userName}</p>
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
