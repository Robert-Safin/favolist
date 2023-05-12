
import { ListModelSchema } from "@/db/models/List";
import { ProductModelSchema } from "@/db/models/Product";
import { connectDB } from "@/db/lib/connectDb";
import { User, List } from "@/db/models";
import { GetServerSideProps, NextPage } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import ToggleView from "@/components/toggleViewListCard/ToggleView";


import UserList from "@/components/user-profile/UserList";
import { useState } from "react";

import UserProduct from "@/components/user-profile/UserProduct";
import UserReferral from "@/components/user-profile/UserReferral";



interface UserProfileProps {
  user: {
    email: string;
    avatar: string;
    username: string;
    bio: string;
    following: string[];
    followers: string[];
    lists: ListModelSchema[];
    products: ProductModelSchema[]
    userLists: ListModelSchema[]
  }
}


const UserProfile: NextPage<UserProfileProps> = (props) => {
  const { data: session, status } = useSession()

  const router = useRouter()
  const usernameSlug = router.query.usernameSlug
  const userIsProfileOwner = usernameSlug === session?.user?.name
  const userHasLists = props.user.lists.length > 0
  const userHasProducts = props.user.products.length > 0


  const [productIsActive, setProductIsActive] = useState(false)
  const [listIsActive, setListIsActive] = useState(true)
  const [accountIsActive, setAccountIsActive] = useState(false)
  const [referralIsActive, setReferralIsActive] = useState(false)

  const handleProductClick = () => {
    setProductIsActive(true)
    setListIsActive(false)
    setAccountIsActive(false)
    setReferralIsActive(false)
  }
  const handleListClick = () => {
    setProductIsActive(false)
    setListIsActive(true)
    setAccountIsActive(false)
    setReferralIsActive(false)

  }
  const handleProfileClick = () => {
    setProductIsActive(false)
    setListIsActive(false)
    setAccountIsActive(true)
    setReferralIsActive(false)
  }

  const handleReferralClick = () => {
    setProductIsActive(false)
    setListIsActive(false)
    setAccountIsActive(false)
    setReferralIsActive(true)
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


  const productsWithReferrals = props.user.products.filter(product => {
    return product.referral.length > 0
  })



  return (

    <div>

      <div className={styles.containerDiv}>
        <div className={styles.userCard}>
          <Link href={`/users/edit`} className={styles.link}>
            <Image className={styles.avatar} src={props.user.avatar!} alt='user avatar' width={64} height={64} />
          </Link>

          <div className={styles.userStats}>
            <h1 className={styles.username}>{props.user.username}</h1>

            <div className={styles.listProducts}>
              <p>{props.user.lists.length} lists</p>
              <p>·</p>
              <p>{props.user.products.length}</p>
              <p>products</p>
            </div>
            <div className={styles.followersFollowing}>
              <p>{props.user.followers.length} followers</p>
              <p>·</p>
              <p>{props.user.following.length} following</p>
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
        <button className={referralIsActive ? styles.activeTab : styles.tabLink} onClick={handleReferralClick}>Referral</button>
        <button className={accountIsActive ? styles.activeTab : styles.tabLink} onClick={handleProfileClick}>Profile</button>

      </div>

      <ToggleView />


      <div className={styles.productsContainer}>
        {!userHasProducts && productIsActive && <h1 className={styles.userHasNoLists}>User has no products</h1>}
        {userHasProducts && productIsActive && props.user.products.map(product =>
          <UserProduct
            key={String(product._id)}
            title={product.productName}
            price={product.price}
            content={product.content}
            referral={product.referral}
            listName={product.productListName}
            image={product.productImage}
            avatar={props.user.avatar}
            username={props.user.username}
          />
        )}
      </div>






      <div className={styles.listsContainer}>
        {!userHasLists && <h1 className={styles.userHasNoLists}>User has no lists.<Link href={`/users/${session.user?.name}/lists/new-list`} className={styles.listLink}> Make new list</Link> </h1>}
        {userHasLists && listIsActive && props.user.lists.map(list =>
          <UserList
            key={String(list._id)}
            title={list.title}
            products={list.products}
            about={list.about}
            thumbnail={list.thumbnail}
            onClick={() => handleClick(list.title)}
          />)}
      </div>


      <div className={styles.referralContainer}>
        {userHasProducts && referralIsActive && productsWithReferrals.map(product =>
          <UserReferral
            key={String(product._id)}
            title={product.productName}
            price={product.price}
            content={product.content}
            referral={product.referral}
            referralDiscription={product.referralDiscription}
            listName={product.productListName}
            image={product.productImage}
            avatar={props.user.avatar}
            username={props.user.username}
          />
        )}

      </div>

      <div className={styles.accountContainer}>
        {accountIsActive &&
          <>
            <h1 className={styles.userBioTitle}>Bio</h1>
            <p className={styles.userBio}>{props.user.bio}</p>
            <h1 className={styles.userSocialsTitle}>Socials</h1>
          </>
        }
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
  const userWithLists = await user.populate('lists')
  const fullyPopulatedUser = await user.populate('products')







  return {
    props: {
      user: {
        email: fullyPopulatedUser.email,
        avatar: fullyPopulatedUser.avatar,
        username: fullyPopulatedUser.username,
        bio: fullyPopulatedUser.bio,
        followers: await JSON.parse(JSON.stringify(fullyPopulatedUser.followers)),
        following: await JSON.parse(JSON.stringify(fullyPopulatedUser.follows)),
        lists: await JSON.parse(JSON.stringify(fullyPopulatedUser.lists)),
        products: await JSON.parse(JSON.stringify(fullyPopulatedUser.products))
      }
    },
  };
};



export default UserProfile
