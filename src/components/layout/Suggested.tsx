import { FC, useEffect, useState } from "react";
import styles from './Suggested.module.css'
import { useSession } from "next-auth/react";
import CustomSession from "@/utils/Session";
import SuggestedUser from "../suggested/SuggestedUser";
import { useRouter } from "next/router";
import SuggestedList from "../suggested/SuggestedList";



const Suggested: FC = () => {

  const { data: session, status } = useSession()
  const userSession = session as CustomSession
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [suggestedList, setSuggestedList] = useState(null);
  const [suggestedListUser, setSuggestedListUser] = useState(null);

  const router = useRouter()
  const usernameSlug = router.query.usernameSlug

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/suggestions/users');
      const data = await response.json();

      setSuggestedUsers(JSON.parse(JSON.stringify(data)));
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchList = async () => {
      const response = await fetch('/api/suggestions/list');

      if (response.ok) {
        const data = await response.json();
        setSuggestedList(data.listDoc);
        setSuggestedListUser(data.userDoc)
      } else {
        return
      }
    }
    fetchList()
  }, [])


  if (!session) {
    return (
      <>
      </>
    )
  }


  return (

    <div className={styles.suggestedContainer}>

      <h1 className={styles.title}>Suggested for you</h1>

      <div className={styles.suggestedUsers}>
        {suggestedUsers.length > 0 &&
          <h2 className={styles.subTitle}>Profile {usernameSlug} follows</h2>
        }
        {suggestedUsers.length > 0 && suggestedUsers.map(user =>
          <SuggestedUser key={user} user={user} />
        )}
      </div>

      <div className={styles.suggestedLists}>
        {suggestedList && suggestedListUser &&
        <h2 className={styles.subTitle}>List</h2>
        }
        {suggestedList && suggestedListUser &&
        <SuggestedList list={suggestedList!} user={suggestedListUser!}/>
        }
      </div>
    </div>


  )
}










export default Suggested
