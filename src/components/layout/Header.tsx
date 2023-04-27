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


        <motion.div
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}>
          <FaThList className={styles.logo} />
        </motion.div>


        <motion.div
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}>
          <h1 className={styles.title}>FavoList</h1>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}>
          <GiHamburgerMenu className={styles.burger} onClick={() => setIsShowMennu(!isShowMenu)} />
        </motion.div>

      </div>
      {isShowMenu &&
        <motion.div initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className={styles.links}>

          <div className={styles.linkItem}
            onMouseEnter={() => setShowSearch(true)}
            onMouseLeave={() => setShowSearch(false)}

          >
            <RxMagnifyingGlass
              className={styles.icon} />{showSearch && <motion.div
                initial={{ opacity: 0, scale: 0.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}>Search</motion.div>}
          </div>

          <div className={styles.linkItem}
            onMouseEnter={() => setShowAccount(true)}
            onMouseLeave={() => setShowAccount(false)}

          >
            <FaUser
              className={styles.icon} />{showAccount && <motion.div
                initial={{ opacity: 0, scale: 0.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}>Account</motion.div>}
          </div>

          <div className={styles.linkItem}
            onMouseEnter={() => setShowSettings(true)}
            onMouseLeave={() => setShowSettings(false)}

          >
            <AiFillSetting
              className={styles.icon} />{showSettings && <motion.div
                initial={{ opacity: 0, scale: 0.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}>Settings</motion.div>}
          </div>

          <div className={styles.linkItem}
            onMouseEnter={() => setShowAdd(true)}
            onMouseLeave={() => setShowAdd(false)}

          >
            <HiOutlinePlus
              className={styles.icon} />{showAdd && <motion.div
                initial={{ opacity: 0, scale: 0.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}>Add</motion.div>}
          </div>
        </motion.div>
      }

    </>
  )
}

export default Header
