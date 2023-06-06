import { FC } from 'react'
import styles from './UserReferral.module.css'
import Image from 'next/image'
import { MdOutlineCopyAll } from 'react-icons/md'
import { useState, useRef } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import CustomSession from '@/utils/Session';



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
  const { data: session, status } = useSession()
  const userSession = session as CustomSession


  const [copySuccess, setCopySuccess] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textRef.current!.innerText)
    setCopySuccess(true)
    setTimeout(() => {
      setCopySuccess(false)
    }, 2000);
  }

  return (
    <div className={styles.referralCard}>

      <div className={styles.textAndImage}>
            <div className={styles.refInfo}>
              <h1 className={styles.listName}>{props.listName}</h1>
              <h2 className={styles.title}>{props.title}</h2>
              <h3 className={styles.price}>${props.price}</h3>
              <p className={styles.referralDiscription}>{props.referralDiscription}</p>
            </div>
              <Link href={`/users/${userSession.user.username}/lists/${props.listName}/product/${props.title}`}>
            <Image className={styles.image} src={props.image} alt={props.title} width={300} height={300} />
              </Link>
      </div>

      <div>

        <div className={copySuccess ? styles.referralContainerCopy : styles.referralContainer} onClick={copyToClipboard}>
        {copySuccess ? <p className={styles.referral}>Copied to clipboard</p> : <p className={styles.referral} ref={textRef} >{props.referral}</p>}
        <MdOutlineCopyAll className={styles.copyIcon}/>
        </div>

      </div>

    </div>
  )
}

export default UserReferral
