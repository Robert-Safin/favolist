import { FC } from "react";
import Image from "next/image";
import styles from './SuggestedUser.module.css'

const SeggestedUser:FC = () => {
  return (
    <div className={styles.userContainer}>
    <Image src={`/logo`} alt={`user`}/>

    <div className={styles.userStats}>
    <h1>Username</h1>
    <p>x lists . x products</p>
    <p>x followers . x following</p>
    </div>

    <button>follow</button>

    </div>
  )
}

export default SeggestedUser
