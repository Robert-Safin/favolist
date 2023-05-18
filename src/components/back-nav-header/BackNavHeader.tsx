import React, { FC } from 'react'
import { FiChevronLeft } from "react-icons/fi"
import styles from './BackNavHeader.module.css'
import Link from 'next/link'

interface Props {
  title: string
  link : string
 }
const BackNavHeader:FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <div className="flex relative items-center space-x-2">
        <button className={styles.backbutton}>
         <Link href={props.link}><FiChevronLeft className={styles.iconCard} /></Link>
        </button>
      </div>
      <div className={styles.titlecontainer}>
       <h1 className={styles.header}>{props.title}</h1>
      </div>
    </div>
  )
}

export default BackNavHeader
