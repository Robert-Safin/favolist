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

import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const Header: FC = () => {

  const [isShowMenu, setIsShowMennu] = useState(false)

  const [showSearch, setShowSearch] = useState(false)
  const [showAccount, setShowAccount] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showAdd, setShowAdd] = useState(false)

  const dropdownVariants = {
    open: { opacity: 1, height: 'auto' },
    closed: { opacity: 0, height: 0 },
  };

  const { data: session, status } = useSession()
  const isAuth = status === "authenticated"
  const notAuth = status === "unauthenticated"


  return (
    <>
      <div className={isShowMenu ? styles.navOpen : styles.navClosed}>


        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}>
          <FaThList className={styles.logo} />
        </motion.div>


        <motion.div
          whileHover={{ scale: 1.1, color: '#FC467D' }}
          whileTap={{ scale: 0.9 }}>
          <h1 className={styles.title}>FavoList</h1>
        </motion.div>


        <div className={styles.burgerLogin}>
          <motion.div
            whileHover={{ scale: 1.1, color: '#FC467D' }}
            whileTap={{ scale: 0.9 }}>
            <GiHamburgerMenu className={styles.burger} onClick={() => setIsShowMennu(!isShowMenu)} />
          </motion.div>

          {notAuth && <motion.button
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.9}}
          className={styles.authButton} onClick={() => signIn()}>Login</motion.button>}

          {isAuth && <motion.button
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.9}}
          className={styles.authButton} onClick={() => signOut()}>SignOut</motion.button>}

        </div>



      </div>
      {isShowMenu &&
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={dropdownVariants}
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
