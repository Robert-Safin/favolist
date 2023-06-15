import { FC, useState } from "react";
import styles from './NavBar.module.css'
import { BiHomeAlt2 } from "react-icons/bi";
import { GoSearch } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
import { RiAddFill } from "react-icons/ri";
import Image from "next/image";
import { useSession } from "next-auth/react";
import CustomSession from "@/utils/Session";
import Modal from 'react-modal';
import { useRouter } from "next/router";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
const NavBar: FC = () => {

  const { data: session, status } = useSession()
  const userSession = session as CustomSession
  const router = useRouter()

  Modal.setAppElement('#__next')
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }


  if (!session) {
    return (
      <>
      </>
    )
  }

  const handleNewProduct = () => {
    router.push(`/users/${userSession.user.username}/lists/new-product`)
    setIsOpen(false)
  }
  const handleNewList = () => {
    router.push(`/users/${userSession.user.username}/lists/new-list`)
    setIsOpen(false)
  }


  return (
    <div className={styles.nav}>

      <div>
        <Link href={'/'} className={styles.logo}>
          <Image src={`/logo.png`} width={50} height={50} alt={`Fabolist Logo`} />
          <h1 className={styles.title}>FAVOLIST</h1>
        </Link>
      </div>


      <Link href={`/home`}>
        <div className={styles.navTab}>
          <BiHomeAlt2 className={styles.icon} />
          <h1>Home</h1>
        </div>
      </Link>

      <Link href={`/users/${userSession.user.username}`}>
        <div className={styles.navTab}>
          < CgProfile className={styles.icon} />
          <h1>Profile</h1>
        </div>
      </Link>

      <Link href={`/settings`}>
        <div className={styles.navTab}>
          <AiOutlineSetting className={styles.icon} />
          <h1>Settings</h1>
        </div>
      </Link>


      <div className={styles.navTab} onClick={openModal}>
        <RiAddFill className={styles.icon} />
        <h1>Add</h1>
      </div>


      <Link href={`/search`}>
        <div className={styles.navTab}>
          <GoSearch className={styles.icon} />
          <h1>Search</h1>
        </div>
      </Link>
      <div>

        <Modal className={styles.modal} isOpen={modalIsOpen} onRequestClose={closeModal}>

          <div className={styles.titleAndClose}>
            <RxCross2 className={styles.cross} onClick={closeModal} />
            <h1 className={styles.title}>What do you want to create?</h1>
          </div>
          <div className={styles.modalButton}>
            <button className={styles.actionButton} onClick={handleNewProduct}>Product</button>
            <button className={styles.actionButton} onClick={handleNewList}>List</button>
          </div>

        </Modal>
      </div>


    </div>
  )
}

export default NavBar
