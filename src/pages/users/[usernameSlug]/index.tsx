import SearchBar from "@/components/searchBar/SearchBar";
import { connectDB } from "@/db/lib/connectDb";
import { ListModelSchema } from "@/db/models/List";

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ProductModelSchema } from "@/db/models/Product";

import User from "@/db/models/User";
import { GetServerSideProps, NextPage } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from "react";
import styles from './index.module.css';
import ToggleView from "@/components/toggleViewListCard/ToggleView";



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

  const [foundUsers, setFoundUsers] = useState([]);
  const [foundLists, setFoundLists] = useState([]);
  const [foundProducts, setFoundProducts] = useState([]);

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      });
      const data = await response.json();

      // Update the state with the fetched data
      setFoundUsers(JSON.parse(data.foundUsers));
      setFoundLists(JSON.parse(data.foundLists));
      setFoundProducts(JSON.parse(data.foundProducts));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
  };

  if (!session) {
    return (
      <>
        <button onClick={() => signIn()}>Login</button>
      </>
    )
  }




  return (

    <div>
      <SearchBar handleSubmit={handleSubmit} handleSearch={handleSearch} />
        <div className={styles.containerDiv}>
          <div className={styles.userCard}>
            <Link href={`/users/edit`} className={styles.link}>
              <Image  className={styles.avatar} src={props.avatar!} alt='user avatar' width={64} height={64} />
            </Link>

            <div className={styles.userStats}>
              <h1 className={styles.username}>{props.username}</h1>

              <div className={styles.listProducts}>
                <Link href={`${session?.user?.name}/lists`}><p>{props.lists.length} lists</p></Link>
                <p>·</p>
                <p>8 products</p>
              </div>
              <div className={styles.followersFollowing}>
                <p>{props.followers.length} followers</p>
                <p>·</p>
                <p>{props.follows.length} following</p>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <Link href={`#`} className={styles.button}>Follow</Link>
            </div>
          </div>
        </div>

          <div className={styles.tabs}>
            <div className={styles.tab}>
              <Link href={`#`}><p>Products</p></Link>
            </div>
            <div className={styles.tabActive}>
              <Link href={`#`}><p>Lists</p></Link>
            </div>
            <div className={styles.tab}>
              <Link href={`#`}><p>Referrals</p></Link>
            </div>
            <div className={styles.tab}>
              <Link href={`#`}><p>Profile</p></Link>
            </div>
          </div>
 {props.userLists.map(list => <p key={list.title}>title: {list.title} image_url: {list.thumbnail} about: {list.about} products: {list.products.length}</p> )}
          <ToggleView />




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
  const userListsDoc = await user.populate('lists')

  const lists = JSON.parse(JSON.stringify(user.lists))
  const products = JSON.parse(JSON.stringify(user.products))
  const userLists = JSON.parse(JSON.stringify(userListsDoc.lists))





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
