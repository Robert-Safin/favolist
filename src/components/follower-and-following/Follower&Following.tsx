import { FC } from "react"
import styles from './Follower&Following.module.css'
import Image from "next/image"
import { UserModelSchema } from "@/db/models/User"
import { ProductModelSchema } from "@/db/models/Product"
import { ListModelSchema } from "@/db/models/List"
import { useRouter } from "next/router"
import Link from "next/link"
interface Props {
  avatar : string
  username : string
  lists : ListModelSchema[]
  products : ProductModelSchema[]
  followers: UserModelSchema[]
  follows: UserModelSchema[]
  action: string
  handleDeleteUser: () => void
  handleReturnUser: () => void
  handleUnfollowUser: () => void
  handleFollowUser: () => void
}

const FollowerAndFollowingCard:FC<Props> = (props) => {

  return (
    <div className={styles.cardContainer}>
      <Link href={`/users/${props.username}`}>
      <Image className={styles.avatar} src={props.avatar!} alt={props.username} width={100} height={100}/>
      </Link>

      <div className={styles.userInfo}>
        <h1 className={styles.username}>{props.username}</h1>
        <div className={styles.count}>{props.lists.length} lists . {props.products.length} products</div>
        <div className={styles.count}>{props.followers.length} followers . {props.follows.length} following</div>
      </div>

      <button className={styles.button}>{props.action}</button>


    </div>
  )
}

export default FollowerAndFollowingCard
