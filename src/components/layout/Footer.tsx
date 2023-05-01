import { FC, useState, useEffect } from "react";
import styles from "./Footer.module.css";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
import { GoSearch } from "react-icons/go";
import { BiHomeAlt2 } from "react-icons/bi";
import { RiAddFill } from "react-icons/ri";

const Footer: FC = () => {


  return (
    <div className={styles.footer}>
      <div className={styles.bottomNav}>
        <div className={styles.menuitem}>
          <a href="#"><BiHomeAlt2 /></a>
        </div>
        <div className={styles.menuitem}>
          <a href="#" className={styles.menulink}><GoSearch /></a>
        </div>
        <div className={styles.menuitem}>
          <a href="#" className={styles.menulink}><CgProfile /></a>
        </div>
        <div className={styles.menuitem}>
          <a href="#" className={styles.menulink}><AiOutlineSetting /></a>
        </div>
        <div className={styles.menuitem}>
          <a href="#"><RiAddFill /></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
