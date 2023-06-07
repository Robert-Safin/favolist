import { FC } from "react";
import Image from "next/image";
import styles from './SuggestedUser.module.css'
import { UserModelSchema } from "@/db/models/User";

interface Props {
  user: UserModelSchema
}

const SuggestedUser: FC<Props> = (props) => {
  return (
    <div className={styles.userContainer}>
      <Image className={styles.avatar} src={props.user.avatar!} alt={props.user.username} width={50} height={50} />


      <div className={styles.userStats}>
        <h1 className={styles.username}>{props.user.username}</h1>
        <p>{props.user.lists.length} lists . {props.user.products.length} products</p>
        <p>{props.user.followers.length} followers . {props.user.follows.length} following</p>
      </div>

      <button className={styles.followLink}>Follow</button>

    </div>
  )
}

export default SuggestedUser
