import { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import {  GetServerSideProps } from "next";
import { connectDB } from "@/db/lib/connectDb";
import User from "@/db/models/User";
import Image from 'next/image'
interface Props {
  userEmail:string,
  userAvatar:string,
  username:string,
}


const UserProfile:NextPage<Props> = (props) => {
  const { data: session,status } = useSession()

  if (!session) {
    return <p>no sesh</p>;
  }




  return (
    <>
    <p>Welcome from mongo :{props.username}!</p>
    <Image src={props.userAvatar} alt='user avatar' width={100} height={100}/>
    </>
  )


};


export const getServerSideProps:GetServerSideProps = async(context) => {

  await connectDB()
  const session = await getSession(context)
  const userEmail = session?.user?.email
  const user = await User.findOne({email:userEmail})


  return {
    props: {
      userEmail: user!.email,
      userAvatar: user!.avatar,
      username: user!.username
    }
  }

}


export default UserProfile
