
import { ProductModelSchema } from '@/db/models/Product'
import { ObjectId } from 'mongoose'
import { FC } from 'react'
import Image from 'next/image'
import styles from './FoundListCard.module.css'
import { UserModelSchema } from '@/db/models/User'
interface Props {
  userId: UserModelSchema
  listId: ObjectId
  title: string
  thumbnail: string
  about: string
  products: ProductModelSchema[]
}

const FoundListCard: FC<Props> = (props) => {

  const maxTitleLength = 80

  return (
    <div className={styles.cardContainer}>


      <div className={styles.imageContainer}>
        <Image src={props.thumbnail} alt={props.title} fill  className={styles.image}/>

        <div className={styles.textItems}>
      <p className={styles.cardText}>{props.title.substring(0, maxTitleLength)}</p>
      <p className={styles.cardProductLength}>{props.products.length} products</p>
        </div>

      </div>






      <div className={styles.userInfo} >


            <div className={styles.avatarContainer}>
              <Image src={props.userId.avatar!} alt={'user avatar'} className={styles.userAvatar} width={50} height={50}/>
               <h1 className={styles.username}>{props.userId.username}</h1>
            </div>


        <h2 className={styles.followers}>{props.userId.followers.length} followers</h2>

      </div>

    </div>
  )
}

export default FoundListCard
