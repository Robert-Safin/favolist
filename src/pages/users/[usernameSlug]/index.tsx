
import { ListModelSchema } from "@/db/models/List";
import { ProductModelSchema } from "@/db/models/Product";
import { connectDB } from "@/db/lib/connectDb";
import { User, List, Product } from "@/db/models";
import { GetServerSideProps, NextPage } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ProfileTabs from "@/components/profile-tabs/ProfileTabs";
import styles from './index.module.css';
import ToggleView from "@/components/toggleViewListCard/ToggleView";


import UserList from "@/components/user-profile/UserList";
import { useState } from "react";


interface UserProfileProps {
  email: string;
  avatar: string;
  username: string;
  bio: string;
  follows: string[];
  followers: string[];
  lists: string[];
  products: ProductModelSchema[]
  userLists: ListModelSchema[]
}


const UserProfile: NextPage<UserProfileProps> = (props) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const usernameSlug = router.query.usernameSlug
  const userIsProfileOwner = usernameSlug === session?.user?.name
  const userHasLists = props.lists.length > 0


  const [productIsActive, setProductIsActive] = useState(false)
  const [listIsActive, setListIsActive] = useState(true)
  const [accountIsActive, setAccountIsActive] = useState(false)

  const handleProductClick = () => {
    setProductIsActive(true)
    setListIsActive(false)
    setAccountIsActive(false)
  }
  const handleListClick = () => {
    setProductIsActive(false)
    setListIsActive(true)
    setAccountIsActive(false)
  }
  const handleProfileClick = () => {
    setProductIsActive(false)
    setListIsActive(false)
    setAccountIsActive(true)
  }
  if (!session) {
    return (
      <>
        <button onClick={() => signIn()}>Login</button>
      </>
    )
  }

  const handleClick = (title: string) => {
    router.push(`/users/${usernameSlug}/lists/${title}`)
  };





  return (

    <div>

      <div className={styles.containerDiv}>
        <div className={styles.userCard}>
          <Link href={`/users/edit`} className={styles.link}>
            <Image className={styles.avatar} src={props.avatar!} alt='user avatar' width={64} height={64} />
          </Link>

          <div className={styles.userStats}>
            <h1 className={styles.username}>{props.username}</h1>

            <div className={styles.listProducts}>
              <p>{props.lists.length} lists</p>
              <p>·</p>
              <p>{props.products.length}</p>
              <p>products</p>
            </div>
            <div className={styles.followersFollowing}>
              <p>{props.followers.length} followers</p>
              <p>·</p>
              <p>{props.follows.length} following</p>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            {userIsProfileOwner && <Link href={`#`} className={styles.button}>Edit profile</Link>}
            {!userIsProfileOwner && <Link href={`#`} className={styles.button}>Follow</Link>}
          </div>
        </div>
      </div>

      <div className={styles.tabContainer}>
        <button className={productIsActive ? styles.activeTab : styles.tabLink} onClick={handleProductClick}>Products</button>
        <button className={listIsActive ? styles.activeTab : styles.tabLink} onClick={handleListClick}>Lists</button>
        <button className={accountIsActive ? styles.activeTab : styles.tabLink} onClick={handleProfileClick}>Profile</button>
      </div>

      <ToggleView />


      <div className={styles.listsContainer}>
        {!userHasLists && <h1 className={styles.userHasNoLists}>User has no lists.<Link href={`/users/${session.user?.name}/lists/new-list`} className={styles.listLink}> Make new list</Link> </h1>}
        {userHasLists && props.userLists.map(list =>
          <UserList
          key={String(list._id)}
          title={list.title}
          products={list.products}
          about={list.about}
          thumbnail={list.thumbnail}
          onClick={() => handleClick(list.title)}
        />)}
      </div>




    </div>
  )


};


export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB();
  const session = await getSession(context);
  const userEmail = session?.user?.email;
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    // to do
    return {
      notFound: true,
    };
  }
  const userListsDoc = await user.populate({ path: 'lists', model: List });
  //console.log(userListsDoc);




  const lists = await JSON.parse(JSON.stringify(user.lists))
  const products = await JSON.parse(JSON.stringify(user.products))
  const userLists = await JSON.parse(JSON.stringify(userListsDoc.lists))





  return {
    props: {
      email: user.email,
      avatar: user.avatar,
      username: user.username,
      bio: user.bio,
      follows: user.follows,
      followers: user.followers,
      lists: lists,
      products: products,
      userLists: userLists,
    },
  };
};



export default UserProfile
