import { FC, useEffect, useState } from "react";
import styles from './Suggested.module.css'
import { signIn, useSession } from "next-auth/react";
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
  console.log('suggestedUsers',suggestedUsers);
  console.log('suggestedList', suggestedList);
  console.log('suggestedListUser', suggestedListUser);




  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/suggestions/users');
      const data = await response.json();
      if(response.ok) {
        setSuggestedUsers(await JSON.parse(JSON.stringify(data)));
      } else {
        return
      }
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


  if (status === "loading") {
    return (
      <>
        <p>loading</p>
      </>
    );
  }
  if (!session) {
    return (
      <>
        <button onClick={() => signIn()}>Login</button>
      </>
    );
  }


  return (

    <div className={styles.suggestedContainer}>

      <h1 className={styles.title}>Suggested for you</h1>

      <div className={styles.suggestedUsers}>
        {suggestedUsers &&
          <h2 className={styles.subTitle}>Profile {usernameSlug} follows</h2>
        }
        {suggestedUsers && suggestedUsers.map(user =>
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
