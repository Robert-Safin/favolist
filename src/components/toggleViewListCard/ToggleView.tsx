import React from 'react'
import styles from './ToggleView.module.css'
import { MdOutlineList } from "react-icons/md";
import { BiCard } from "react-icons/bi";

const ToggleView = () => {
  return (
    <div className={styles.container}>
      <div className="text-gray-500">View:</div>
      <div className="flex items-center space-x-2">
        <button className="focus:outline-none">
          <BiCard className={styles.iconCard} />
        </button>
        <button className="focus:outline-none">
          <MdOutlineList className={styles.iconList} />
        </button>
      </div>
    </div>
  )
}

export default ToggleView
