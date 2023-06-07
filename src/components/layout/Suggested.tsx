import { FC } from "react";
import styles from './Suggested.module.css'
import { useSession } from "next-auth/react";
import CustomSession from "@/utils/Session";
const Suggested: FC = () => {

  const { data: session, status } = useSession()
  const userSession = session as CustomSession

  if (!session) {
    return (
      <>
      </>
    )
  }
  return (
    <div className={styles.suggestedContainer}>
      <h1 className={styles.title}>Suggestioned for you</h1>

      <div className={styles.suggestedUsers}>
        <h2>Users</h2>
        <Suggested/>
      </div>

      <div className={styles.suggestedLists}>
        <h2>Lists</h2>
      </div>
    </div>


  )
}

export default Suggested
