import React, { FC } from 'react'
import { FiChevronLeft } from "react-icons/fi"
import styles from './BackNavHeader.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router';


interface Props {
  title: string
}

const BackNavHeader: FC<Props> = (props) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <button className={styles.backbutton}>
          <div onClick={handleGoBack}><FiChevronLeft className={styles.iconCard} /></div>
        </button>
      </div>
      <div className={styles.titlecontainer}>
        <h1 className={styles.header}>{props.title}</h1>
      </div>
    </div>
  )
}

export default BackNavHeader
