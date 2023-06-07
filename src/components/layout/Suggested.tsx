import { FC, useEffect, useState } from "react";
import styles from './Suggested.module.css'
import { useSession } from "next-auth/react";
import CustomSession from "@/utils/Session";
import SuggestedUser from "../suggested/SuggestedUser";
import { useRouter } from "next/router";



const Suggested: FC = () => {

  const { data: session, status } = useSession()
  const userSession = session as CustomSession
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const router = useRouter()
  const usernameSlug = router.query.usernameSlug

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('/api/suggestions/users');
      const data = await response.json();

      setSuggestedUsers(JSON.parse(JSON.stringify(data)));
    }

    fetchUsers();
  }, []);


  if (!session) {
    return (
      <>
      </>
    )
  }

  if (!usernameSlug) {
    return (
    <>
    </>
    )
  }
  return (

    <div className={styles.suggestedContainer}>
      <h1 className={styles.title}>Suggestioned for you</h1>

      <div className={styles.suggestedUsers}>
        <h2 className={styles.subTitle}>Profile {usernameSlug} follows</h2>
        {suggestedUsers.length > 0 && suggestedUsers.map(user =>
          <SuggestedUser key={user} user={user}/>
          )}
      </div>

      <div className={styles.suggestedLists}>
        <h2 className={styles.subTitle}>Lists</h2>
      </div>
    </div>


  )
}










export default Suggested
