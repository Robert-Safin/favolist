import { FC, useState } from "react";
import styles from "./Footer.module.css";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
import { GoSearch } from "react-icons/go";
import { BiHomeAlt2 } from "react-icons/bi";
import { RiAddFill } from "react-icons/ri";
import Link from 'next/link'
import { useSession } from "next-auth/react";
import CustomSession from "@/utils/Session";

import Modal from 'react-modal';
import { RxCross2 } from "react-icons/rx";
import { BsTrash } from "react-icons/bs";
import { useRouter } from "next/router";


const Footer: FC = () => {

  const { data: session, status } = useSession()
  const userSession = session as CustomSession
  const router = useRouter()
  const userSlug = router.query.usernameSlug

  Modal.setAppElement('#__next')
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  if (!userSession) {
    return <p>no session</p>
  }

  const handleNewProduct = () => {
    router.push(`/users/${userSlug}/lists/new-product`)
    setIsOpen(false)
  }
  const handleNewList = () => {
    router.push(`/users/${userSlug}/lists/new-list`)
    setIsOpen(false)
  }


  return (
    <div className={styles.footer}>
      <div className={styles.bottomNav}>
        <div className={styles.menuitem}>
          <Link href="/home" className={styles.menulink}> <BiHomeAlt2 /></Link>

        </div>
        <div className={styles.menuitem}>
          <Link href="/search" className={styles.menulink}><GoSearch /></Link>
        </div>
        <div className={styles.menuitem}>
          <Link href={`/users/${userSession.user.username}`} className={styles.menulink}><CgProfile /></Link>
        </div>
        <div className={styles.menuitem}>
          <Link href="/settings" className={styles.menulink}><AiOutlineSetting /></Link>
        </div>
        <div className={styles.menuitem}>

          <button className={styles.menulink} onClick={openModal}>
            <RiAddFill />
          </button>
          <div>

            <Modal className={styles.modal} isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal">

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
      </div>
    </div>
  );
};

export default Footer;
