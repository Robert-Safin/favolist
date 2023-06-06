import { FC } from "react";
import styles from './NavBar.module.css'
import { BiHomeAlt2 } from "react-icons/bi";
import { GoSearch } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
import { RiAddFill } from "react-icons/ri";
import Image from "next/image";
const NavBar: FC = () => {
  return (
    <div className={styles.nav}>

      <div className={styles.logo}>
        <Image src={`/logo.png`} width={50} height={50} alt={`Fabolist Logo`}/>
        <h1 className={styles.title}>FAVOLIST</h1>
      </div>



      <div className={styles.navTab}>
        <BiHomeAlt2 className={styles.icon}/>
        <h1>Home</h1>
      </div>

      <div className={styles.navTab}>
        < CgProfile className={styles.icon}/>
        <h1>Profile</h1>
      </div>

      <div className={styles.navTab}>
        <AiOutlineSetting className={styles.icon}/>
        <h1>Settings</h1>
      </div>

      <div className={styles.navTab}>
        <RiAddFill className={styles.icon}/>
        <h1>Add</h1>
      </div>

      <div className={styles.navTab}>
        <GoSearch className={styles.icon}/>
        <h1>Search</h1>
      </div>



    </div>
  )
}

export default NavBar
