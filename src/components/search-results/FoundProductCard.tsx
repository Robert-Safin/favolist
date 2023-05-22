
import { ObjectId } from 'mongoose'
import { FC } from 'react'
import styles from './FoundProductCard.module.css'
import Image from 'next/image'
import { UserModelSchema } from '@/db/models/User'
import Link from 'next/link'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

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

  const deltaString = props.content;
  const deltaObject = JSON.parse(deltaString);
  const converter = new QuillDeltaToHtmlConverter(deltaObject.ops, {});
  const html = converter.convert();



  return (
    <div className={styles.productContainer}>



      <div className={styles.infoContainer}>

              <div className={styles.productInfo}>
                <h2 className={styles.listName}>{props.productListName}</h2>
                <h1 className={styles.productName}>{props.productName}</h1>
                <h3 className={styles.price}>${props.price}</h3>
                <p className={styles.content} dangerouslySetInnerHTML={{ __html: html }} />
              </div>

              <div className={styles.imageAndButton}>
                <Image className={styles.image} src={props.productImage} alt={'product name'} width={100} height={100}/>
                <Link href={`/users/${props.userName}/lists/${props.productListName}/product/${props.productName}`}>
                <button className={styles.button}>View product</button>
                </Link>
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
