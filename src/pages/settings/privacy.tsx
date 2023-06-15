import { NextPage } from "next";
import styles from './privacy.module.css'
import BackNavHeader from "@/components/back-nav-header/BackNavHeader";
const PrivacyPage:NextPage = () => {
  return (
    <>
      <BackNavHeader title={`Privacy`}/>
    <div className={styles.mainContainer}>
    <h1 className={styles.title}>Thanks for your data ;)</h1>
    </div>
    </>
  )
}

export default PrivacyPage
