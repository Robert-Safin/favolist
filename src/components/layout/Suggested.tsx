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
  console.log('suggestedUsers', suggestedUsers);
  console.log('suggestedList', suggestedList);
  console.log('suggestedListUser', suggestedListUser);




  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/suggestions/users');
        const data = await response.json();

        setSuggestedUsers(await JSON.parse(JSON.stringify(data.filteredFollows)));

      } catch (error) {
        console.log(error);

      }

    }

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch('/api/suggestions/list');

        const data = await response.json();
        console.log(response);

        setSuggestedList(JSON.parse(JSON.stringify(data.listDoc)));
        setSuggestedListUser(JSON.parse(JSON.stringify(data.userDoc)))

      } catch (error) {
        console.log(error);

      }

    }
    fetchList()
  }, [])


  if (status === "loading") {
    return (
      <>

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
        {suggestedUsers && suggestedUsers.map(user =>
          <SuggestedUser key={user} user={user} />
        )}
      </div>

      <div className={styles.suggestedLists}>
        {suggestedList && suggestedListUser &&
          <h2 className={styles.subTitle}>List</h2>
        }
        {suggestedList && suggestedListUser &&
          <SuggestedList list={suggestedList!} user={suggestedListUser!} />
        }
      </div>
    </div>


  )
}










export default Suggested
