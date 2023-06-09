
import { ProductModelSchema } from '@/db/models/Product'
import { ObjectId } from 'mongoose'
import { FC } from 'react'
import Image from 'next/image'
import styles from './FoundListCard.module.css'
import { UserModelSchema } from '@/db/models/User'
import Link from 'next/link'
interface Props {
  userId: UserModelSchema
  listId: ObjectId
  title: string
  thumbnail: string
  about: string
  products: ProductModelSchema[]
}

const FoundListCard: FC<Props> = (props) => {



  return (
    <div className={styles.cardContainer}>


      <div className={styles.listInfo}>
        <Link href={`/users/${props.userId.username}/lists/${props.title}`}>
          <Image src={props.thumbnail} alt={props.title} className={styles.image} width={1000} height={1000} />
        <div className={styles.textItems}>
          <p className={styles.cardText}>{props.title}</p>
          <p className={styles.cardProductLength}>{props.products.length} products</p>
        </div>
        </Link>
      </div>






      <div className={styles.userInfo} >
        <div className={styles.avatarContainer}>
          <Image src={props.userId.avatar!} alt={'user avatar'} className={styles.userAvatar} width={50} height={50} />
          <h1 className={styles.username}>{props.userId.username}</h1>
        </div>
        <h2 className={styles.followers}>{props.userId.followers.length} followers</h2>
      </div>

    </div>
  )
}

export default FoundListCard
