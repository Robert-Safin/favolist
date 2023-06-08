import { FC, useEffect } from "react";
import styles from './SuggestedList.module.css'
import Image from "next/image";
import { ListModelSchema } from "@/db/models/List";
import { UserModelSchema } from "@/db/models/User";


interface Props {
  list: ListModelSchema
  user: UserModelSchema
}

const SuggestedList: FC<Props> = (props) => {


  return (
    <div className={styles.mainContainer}>


      <div className={styles.list}>
        <Image className={styles.image} src={props.list.thumbnail} alt={`sugested list`} width={400} height={400} />
        <h2 className={styles.listLength}>{props.list.products.length} products</h2>
        <h1 className={styles.listTitle}>{props.list.title}</h1>
      </div>

      <div className={styles.userInfo}>
        <div className={styles.avatarAndUsername}>
          <Image className={styles.avatar} src={props.user.avatar!} alt={`user avatat`} width={50} height={50} />
          <p>{props.user.username}</p>
        </div>
          <p>{props.user.followers.length} followers</p>
      </div>
    </div>
  )
}

export default SuggestedList
