import { FC } from "react";
import styles from './Suggested.module.css'
import { useSession } from "next-auth/react";
import CustomSession from "@/utils/Session";
const Suggested:FC =() => {

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
    <h1>Suggestions for you</h1>
    </div>
  )
}

export default Suggested
