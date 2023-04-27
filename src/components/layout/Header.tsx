import { FC } from 'react'
import styles from './Header.module.css'
import { FaThList } from 'react-icons/fa'
import { RxMagnifyingGlass } from 'react-icons/rx'
import { FaUser } from 'react-icons/fa'
import { AiFillSetting } from 'react-icons/ai'
import { HiOutlinePlus } from 'react-icons/hi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react'
import { motion } from "framer-motion"

const Header: FC = () => {

  const [isShowMenu, setIsShowMennu] = useState(false)

  const [showSearch, setShowSearch] = useState(false)
  const [showAccount, setShowAccount] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showAdd, setShowAdd] = useState(false)

  return (
    <>
      <div className={styles.nav}>



        <FaThList className={styles.logo} />



        <h1 className={styles.title}>FavoList</h1>


        <GiHamburgerMenu className={styles.burger} onClick={() => setIsShowMennu(!isShowMenu)} />

      </div>
      {isShowMenu &&
        <motion.div initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={styles.links}>

          <div className={styles.linkItem}
            onMouseEnter={() => setShowSearch(true)}
            onMouseLeave={() => setShowSearch(false)}

          >
            <RxMagnifyingGlass
              className={styles.icon} />{showSearch && <p>Search</p>}
          </div>

          <div className={styles.linkItem}
            onMouseEnter={() => setShowAccount(true)}
            onMouseLeave={() => setShowAccount(false)}

          >
            <FaUser
              className={styles.icon} />{showAccount && <p>Account</p>}
          </div>

          <div className={styles.linkItem}
            onMouseEnter={() => setShowSettings(true)}
            onMouseLeave={() => setShowSettings(false)}

          >
            <AiFillSetting
              className={styles.icon} />{showSettings && <p>Settings</p>}
          </div>

          <div className={styles.linkItem}
            onMouseEnter={() => setShowAdd(true)}
            onMouseLeave={() => setShowAdd(false)}

          >
            <HiOutlinePlus
              className={styles.icon} />{showAdd && <p>Add</p>}
          </div>
        </motion.div>
      }

    </>
  )
}

export default Header
