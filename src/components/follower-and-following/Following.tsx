import { FC, useState } from "react"
import styles from './Following.module.css'
import Image from "next/image"
import { UserModelSchema } from "@/db/models/User"
import { ProductModelSchema } from "@/db/models/Product"
import { ListModelSchema } from "@/db/models/List"
import { useRouter } from "next/router"
import Link from "next/link"
import { useSession } from "next-auth/react"
import CustomSession from "@/utils/Session"
import { ObjectId } from "mongoose"
interface Props {
  avatar: string
  username: string
  lists: ListModelSchema[]
  products: ProductModelSchema[]
  followers: UserModelSchema[]
  follows: UserModelSchema[]
  _id: ObjectId
}

const FollowingCard: FC<Props> = (props) => {
  const router = useRouter()
  const { data: session } = useSession()
  const userSession = session as CustomSession



  if (!userSession) {
    return <p> no session</p>
  }

  const currentUserIsPageOwner = router.query.usernameSlug === userSession.user.username

  const handleUnfollow = async () => {
    const data = {
      currentUserEmail: userSession?.user.email,
      unfollowTargetID: props._id,
    }
    try {
      const response = await fetch("/api/users/unfollow", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      router.push(`/users/${userSession.user.username}/followers-and-following`)

    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className={styles.cardContainer}>
      <Link href={`/users/${props.username}`}>
        <Image className={styles.avatar} src={props.avatar!} alt={props.username} width={100} height={100} />
      </Link>

      <div className={styles.userInfo}>
        <h1 className={styles.username}>{props.username}</h1>
        <div className={styles.count}>{props.lists.length} lists . {props.products.length} products</div>
        <div className={styles.count}>{props.followers.length} followers . {props.follows.length} following</div>
      </div>

      {currentUserIsPageOwner && <button onClick={handleUnfollow} className={styles.button}>Unfollow</button>}

    </div>
  )
}

export default FollowingCard
