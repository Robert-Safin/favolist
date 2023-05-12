import { FC, useState, useEffect } from "react";
import styles from "./Footer.module.css";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
import { GoSearch } from "react-icons/go";
import { BiHomeAlt2 } from "react-icons/bi";
import { RiAddFill } from "react-icons/ri";
import Link from 'next/link'
import { useSession } from "next-auth/react";

const Footer: FC = () => {

  const { data: session, status } = useSession()
  const username = session?.user?.name!.replace(/ /g, "-")

  if (!session) {
    return <p>no session</p>
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
          <Link href={`/users/${username}`} className={styles.menulink}><CgProfile /></Link>
        </div>
        <div className={styles.menuitem}>
          <Link href="/users/edit" className={styles.menulink}><AiOutlineSetting /></Link>
        </div>
        <div className={styles.menuitem}>
          <Link href={`/users/${username}/lists/new-list`} className={styles.menulink}><RiAddFill /></Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
