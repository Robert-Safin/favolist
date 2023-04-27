import { FC } from 'react'
import styles from './Header.module.css'
import { FaThList } from 'react-icons/fa'
import { RxMagnifyingGlass } from 'react-icons/rx'
import { FaUser } from 'react-icons/fa'
import { AiFillSetting } from 'react-icons/ai'
import { HiOutlinePlus } from 'react-icons/hi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react'
const Header: FC = () => {

  const [isShowMenu, setIsShowMennu] = useState(false)

  return (
    <>
    <div className={styles.nav}>



      <FaThList className={styles.logo} />



      <h1 className={styles.title}>FavoList</h1>


      <GiHamburgerMenu className={styles.burger} onClick={() => setIsShowMennu(!isShowMenu)} />

    </div>
      {isShowMenu &&
        <div className={styles.links}>
          <div className={styles.linkItem}><RxMagnifyingGlass className={styles.icon} /><p>Search</p></div>
          <div className={styles.linkItem}><FaUser className={styles.icon} /><p>Account</p></div>
          <div className={styles.linkItem}><AiFillSetting className={styles.icon} /><p>Settings</p></div>
          <div className={styles.linkItem}><HiOutlinePlus className={styles.icon} /><p>Add</p></div>
        </div>
      }

      </>
  )
}

export default Header
