
import { ListModelSchema } from '@/db/models/List'
import { ProductModelSchema } from '@/db/models/Product'
import { ObjectId } from 'mongoose'
import Image from 'next/image'
import { FC } from 'react'
import styles from './FoundUserCard.module.css'
interface Props {
  userId: ObjectId
  username: string,
  avatar: string,
  bio: string,
  follows: ObjectId[],
  followers: ObjectId[],
  lists: ListModelSchema[],
  products: ProductModelSchema[]
  currentUsername: string

}

const FoundUserCard: FC<Props> = (props) => {


  const isCurrentUser = props.currentUsername.replace(/ /g, "-") === props.username

  const userHasBio = props.bio.length > 0





  return (
    <div className={styles.userContainer}>





      <div className={styles.userInfo}>

              <Image className={styles.avatar} src={props.avatar} alt={'user avatar'} width={30} height={30}/>

              <div className={styles.userStats}>
                  <p className={styles.username}>{props.username}</p>
                  <p className={styles.userTrackers}>{props.lists.length} lists . {props.products.length} products</p>
                  <p className={styles.userTrackers}>{props.followers.length} followers . {props.follows.length} following</p>
              </div>

              {!isCurrentUser && <button className={styles.button}>Follow</button>}


      </div>

      {userHasBio && <p className={styles.bio}>{props.bio}</p>}




    </div>
  )
}

export default FoundUserCard
