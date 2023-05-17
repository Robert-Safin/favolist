import { FC } from "react";
import styles from './Comment.module.css'
import { UserModelSchema } from "@/db/models/User";
import Image from "next/image";



interface Props {
  content: string;
  username: string;
  avatar: string;
  timestamp: string;


}
const Comment:FC<Props> = (props) => {
  return (
    <div className={styles.commentContainer}>

          <div className={styles.mainAvatarContainer}>
              <Image className={styles.mainAvatar} src={props.avatar} alt={`user avatar`} width={300} height={300}/>
          </div>

          <div className={styles.commentContent}>
                <h3 className={styles.mainUsername}>{props.username}</h3>
                <p className={styles.mainComment}>{props.content}</p>

                <div className={styles.actions}>
                    <p>{props.timestamp}</p>
                    <p>Reply</p>
                    <p>Like</p>
                </div>
          </div>



    </div>
  )
}

export default Comment
