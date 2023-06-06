
import ToggleView from "@/components/toggleViewListCard/ToggleView";
import SearchBar from "@/components/searchBar/SearchBar";
import type { GetServerSideProps, NextPage } from "next";
import styles from "./home.module.css";
import { getSession, signIn, useSession } from "next-auth/react";
import { useState, FormEventHandler } from "react";
import { connectDB } from "@/db/lib/connectDb";
import CustomSession from "@/utils/Session";
import { User } from "@/db/models";
import { ProductModelSchema } from "@/db/models/Product";
import UserProduct from "@/components/user-profile/UserProduct";
import HomepageProduct from "@/components/homepage/HomepageProduct";

interface Props {
  followedProducts: ProductModelSchema[]
}

const Home: NextPage<Props> = (props) => {
  const { data: session, status } = useSession()
  const userSession = session as CustomSession


  if (!session) {
    return (
      <>
        <button onClick={() => signIn()}>Login</button>
      </>
    );
  }






  return (
    <>
      <ToggleView />
      {/* to do logic for homefeed once follower relationship established */}
    </>
  );
};

export default Home;

// export const getServerSideProps:GetServerSideProps = async(context) => {
//   await connectDB()
//   const session = await getSession(context)
//   const userDoc = await User.findOne({email: session?.user?.email})

//   await userDoc?.populate('follows')

//   // if (!userDoc) {
//   //   return {
//   //     props: { error: 'User not found' }
//   //   }
//   // }
//   let followedProducts:ProductModelSchema[] = [];
//   for(let i = 0; i < userDoc!.follows.length; i++) {
//     let followedUser = await User.findById(userDoc!.follows[i]).populate('products');
//     followedProducts = [...followedProducts, ...followedUser!.products];
//   }

//   return {
//     props: {
//       followedProducts: followedProducts
//     }
//   }
// }
