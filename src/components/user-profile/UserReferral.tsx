import { FC } from 'react'
import styles from './UserReferral.module.css'
import Image from 'next/image'
import { MdOutlineCopyAll } from 'react-icons/md'



interface Props {
  title: string
  price: number
  content: string
  referral: string
  referralDiscription: string
  listName: string
  image: string
  avatar: string
  username: string
}



const UserReferral: FC<Props> = (props) => {
  return (
    <div className={styles.referralCard}>

      <div className={styles.textAndImage}>
            <div>
              <h1 className={styles.listName}>{props.listName}</h1>
              <h2 className={styles.title}>{props.title}</h2>
              <h3 className={styles.price}>${props.price}</h3>
              <p>{props.referralDiscription}</p>
            </div>

            <Image className={styles.image} src={props.image} alt={props.title} width={300} height={300} />
      </div>

      <div>

        <div className={styles.referralContainer}>
        <p className={styles.referral}>{props.referral}</p>
        <MdOutlineCopyAll className={styles.copyIcon}/>
        </div>

      </div>

    </div>
  )
}

export default UserReferral
