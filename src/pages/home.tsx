
import ToggleView from "@/components/toggleViewListCard/ToggleView";
import type { GetServerSideProps, NextPage } from "next";
import styles from "./home.module.css";
import { getSession, signIn, useSession } from "next-auth/react";
import { connectDB } from "@/db/lib/connectDb";
import CustomSession from "@/utils/Session";
import { User } from "@/db/models";
import { ProductModelSchema } from "@/db/models/Product";
import FeedProductCard from "@/components/product-feed/FeedCard";
import BackNavHeader from "@/components/back-nav-header/BackNavHeader";
import { UserModelSchema } from "@/db/models/User";

interface Props {
  populatedSortedProducts: ProductModelSchema[]
  currentUserDoc: UserModelSchema
}

const Home: NextPage<Props> = (props) => {
  const { data: session, status } = useSession()
  const userSession = session as CustomSession


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
    <>
    <BackNavHeader title={'Home Feed'}/>
    <div className={styles.mainContainer}>
      <ToggleView />
        {props.populatedSortedProducts.map(product =>
          <FeedProductCard
          key={String(product._id)}
          id={product._id}
          userId={product.user_id}
          productImage={product.productImage}
          productListName={product.productListName}
          productName={product.productName}
          shortContent={product.shortContent}
          price={product.price}
          referral={product.referral}
          currentUserDoc={props.currentUserDoc}
          comments={product.comments}
          // @ts-ignore
          user={product.user_id}
          // @ts-ignore
          bookmarkedBy={product.bookmarkedBy}
          />
          )}
    </div>
    </>
  );
};

export default Home;

export const getServerSideProps:GetServerSideProps = async(context) => {


  await connectDB()
  const session = await getSession(context)

  // if (session === null) {
  //   return {
  //     props: {
  //       populatedSortedProducts: 0,
  //       currentUserDoc: 0,
  //     }
  //   }
  // }

  const userDoc = await User.findOne({email: session?.user?.email})

  await userDoc?.populate('follows')
  await userDoc?.populate('products')

  let followedProducts:ProductModelSchema[] = [];

  for(let i = 0; i < userDoc!.follows.length; i++) {
    let followedUser = await User.findById(userDoc!.follows[i]).populate('products').limit(50);
    followedProducts = [...followedProducts, ...followedUser!.products];
  }

  followedProducts = [ ...userDoc!.products]


  const productsSortedByDate = followedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const populatedSortedProductsPromises = productsSortedByDate.map(async product => {
    await product.populate('user_id');
    return product;
  });
  const populatedSortedProducts = await Promise.all(populatedSortedProductsPromises);


  const currentUserDoc = await User.findOne({email: session?.user?.email})


  return {
    props: {
      populatedSortedProducts: await JSON.parse(JSON.stringify(populatedSortedProducts)),
      currentUserDoc: await JSON.parse(JSON.stringify(currentUserDoc))
    }
  }
}
