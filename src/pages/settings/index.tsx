import BackNavHeader from "@/components/back-nav-header/BackNavHeader"
import { NextPage } from "next"
import { AiOutlineRight } from "react-icons/ai"
import styles from './index.module.css'
import Link from "next/link"

const SettingPage: NextPage = () => {
  return (
    <>
      <BackNavHeader title={"Settings"} />

      <div className={styles.optionsBlock}>
        <h1 className={styles.header}>Account</h1>

        <div>
          <Link href={`/settings/edit-profile`} className={styles.optionContainer}>
            <p className={styles.optionText}>Edit profile</p>
            <AiOutlineRight className={styles.icon} />
          </Link>
        </div>

        <div>
          <Link href={`/settings/privacy`} className={styles.optionContainer}>
            <p className={styles.optionText}>Privacy</p>
            <AiOutlineRight className={styles.icon} />
          </Link>
        </div>

        <div>
          <Link href={`#`} className={styles.optionContainer}>
            <p className={styles.optionText}>Change password</p>
            <AiOutlineRight className={styles.icon} />
          </Link>
        </div>

        <div>
          <Link href={`#`} className={styles.optionContainer}>
            <p className={styles.optionText}>Push notifications</p>
            <button>One day I will be toggle button</button>
          </Link>
        </div>

        <div>
          <Link href={`#`} className={styles.optionContainer}>
            <p className={styles.optionText}>Dark mode</p>
            <button>One day I will be toggle button</button>
          </Link>
        </div>

      </div>





      <div className={styles.optionsBlock2}>

        <h1 className={styles.header}>More</h1>

        <div>
          <Link href={`#`} className={styles.optionContainer}>
            <p className={styles.optionText}>About us</p>
            <AiOutlineRight className={styles.icon} />
          </Link>
        </div>

        <div>
          <Link href={`#`} className={styles.optionContainer}>
            <p className={styles.optionText}>Privacy policy</p>
            <AiOutlineRight className={styles.icon} />
          </Link>
        </div>

        <div>
          <Link href={`#`} className={styles.optionContainer}>
            <p className={styles.optionText}>Terms & conditions</p>
            <AiOutlineRight className={styles.icon} />
          </Link>
        </div>


      </div>








    </>
  )
}

export default SettingPage
