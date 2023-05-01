import { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { connectDB } from "@/db/lib/connectDb";
import User from "@/db/models/User";
import Image from 'next/image'
import { UserModelSchema } from "@/db/models/User";
import Link from 'next/link'
import { ListModelSchema } from "@/db/models/List";

interface UserProfileProps {
  email: string;
  avatar: string;
  username: string;
  bio: string;
  follows: string[];
  followers: string[];
  lists: ListModelSchema[];
}


const UserProfile: NextPage<UserProfileProps> = (props) => {
  const { data: session, status } = useSession()

  if (!session) {
    // to do
  }




  return (
    <>
      <h1>Welcome {props.username}!</h1>
      <Image src={props.avatar!} alt='user avatar' width={100} height={100} />
      <p>{props.bio}</p>
      <p>My lists: {props.lists.length}</p>
      <p>My followers: {props.followers.length}</p>
      <p>My following {props.follows.length}</p>
      <Link href={`/users/edit`}>Edit profile</Link>
    </>
  )


};


export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB();
  const session = await getSession(context);
  const userEmail = session?.user?.email;
  const userDoc = await User.findOne({ email: userEmail });

  if (!userDoc) {
    // to do
    return {
      notFound: true,
    };
  }


  const user = userDoc


  const lists = JSON.parse(JSON.stringify(user.lists))


  return {
    props: {
      email: user.email,
      avatar: user.avatar,
      username: user.username,
      bio: user.bio,
      follows: user.follows,
      followers: user.followers,
      lists: lists,
    },
  };
};



export default UserProfile
