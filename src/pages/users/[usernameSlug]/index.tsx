import { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { connectDB } from "@/db/lib/connectDb";
import User from "@/db/models/User";
import Image from 'next/image'
import styles from './index.module.css'
import Link from 'next/link'
import { ListModelSchema } from "@/db/models/List";
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ProductModelSchema } from "@/db/models/Product";
interface UserProfileProps {
  email: string;
  avatar: string;
  username: string;
  bio: string;
  follows: string[];
  followers: string[];
  lists: ListModelSchema[];
  products: ProductModelSchema[]
}


const UserProfile: NextPage<UserProfileProps> = (props) => {
  const { data: session, status } = useSession()
  const router = useRouter()


  if (!session) {
    return (
      <>
        <button onClick={() => signIn()}>Login</button>
      </>
    )
  }




  return (
    <div className={styles.containerDiv}>


      <h1 className={styles.username}>{props.username}</h1>


      <div className={styles.userCard}>
        <Image src={props.avatar!} alt='user avatar' width={100} height={100} />

        <div className={styles.userStats}>
          <h1 className={styles.username}>{props.username}</h1>
          <Link href={`${session?.user?.name}/lists`}><p>{props.lists.length} lists</p></Link>
          <p>{props.products.length} products</p>
          <p>{props.followers.length} followers</p>
          <p>{props.follows.length} following</p>
        </div>

        <div className={styles.buttonContainer}>
          <Link href={`/users/edit`} className={styles.button}>Edit profile</Link>
          <Link href={``} className={styles.button}>Follow</Link>
        </div>
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

  const lists = JSON.parse(JSON.stringify(user.lists))
  const products = JSON.parse(JSON.stringify(user.products))



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
    },
  };
};



export default UserProfile
