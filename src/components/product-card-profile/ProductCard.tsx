import { FC } from 'react'
import styles from './ProductCard.module.css'
import Image from 'next/image'
import { BsBookmark } from 'react-icons/bs'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { FaRegComment } from 'react-icons/fa'
import {MdCopyAll} from 'react-icons/md'
interface Props {
  title: string
  price: number
  content: string
  referral: string
  listName: string
  image: string
  avatar: string
  username: string
}

const ProductCardProfile: FC<Props> = (props) => {

  const productContentLength = 140

  let shortContent
  if (props.content.length > productContentLength) {
    shortContent = props.content.substring(0, productContentLength) + '...'
  } else {
    shortContent = props.content
  }

  const productHasReferral = props.referral.length > 0

  return (
    <div className={styles.cardContainer}>







      <div className={styles.productContainer}>

        <div className={styles.productText}>
          <h1 className={styles.listName}>{props.listName}</h1>
          <h2 className={styles.title}>{props.title}</h2>
          <h3 className={styles.price}>${props.price}</h3>
          <p className={styles.content}>{shortContent}</p>

          {productHasReferral &&
            <div className={styles.referralContainer}>
              <p>{props.referral}</p>
              <MdCopyAll className={styles.refIcon}/>
            </div>}


        </div>

        <div >
          <Image className={styles.image} src={props.image} alt={props.listName} width={80} height={80} />
        </div>


      </div>





      <div className={styles.cardActionsContainer}>

        <div className={styles.userInfo}>
          <Image className={styles.avatar} src={props.avatar} alt='user avatar' width={40} height={40} />
          <p>{props.username}</p>
        </div>

        <div className={styles.iconsContainer}>

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








    </div>
  )
}

export default ProductCardProfile