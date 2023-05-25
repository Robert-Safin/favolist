
import { ListModelSchema } from "@/db/models/List";
import { ProductModelSchema } from "@/db/models/Product";
import { connectDB } from "@/db/lib/connectDb";
import { User } from "@/db/models";
import { GetServerSideProps, NextPage } from "next";
import { signIn } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import ToggleView from "@/components/toggleViewListCard/ToggleView";

import UserList from "@/components/user-profile/UserList";
import { useState, useEffect } from "react";

import UserProduct from "@/components/user-profile/UserProduct";
import UserReferral from "@/components/user-profile/UserReferral";

import { useSession } from "next-auth/react";
import CustomSession from "@/utils/Session";
import { UserModelSchema } from "@/db/models/User";
import { ObjectId } from "mongoose";
import { MdThumbUp } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Social, { SocialModelSchema } from "@/db/models/Social";




interface UserProfileProps {
  user: {
    _id: ObjectId;
    email: string;
    avatar: string;
    username: string;
    bio: string;
    following: UserModelSchema[]
    followers: UserModelSchema[]
    lists: ListModelSchema[];
    products: ProductModelSchema[]
    userLists: ListModelSchema[]
    socials: SocialModelSchema,
  }
}


const UserProfile: NextPage<UserProfileProps> = (props) => {

  const { data: session, status } = useSession()
  const userSession = session as CustomSession

  const router = useRouter()
  const usernameSlug = router.query.usernameSlug
  const userIsProfileOwner = usernameSlug === userSession?.user.username

  const userHasLists = props.user.lists.length > 0
  const userHasProducts = props.user.products.length > 0
  const userIsAlreadyFollowed = props.user.followers && userSession && userSession.user && props.user.followers.some(follower => follower && follower.username === userSession.user.username);

  const [productIsActive, setProductIsActive] = useState(false)
  const [listIsActive, setListIsActive] = useState(true)
  const [accountIsActive, setAccountIsActive] = useState(false)
  const [referralIsActive, setReferralIsActive] = useState(false)
  const [alreadyFollowed, setAlreadyFollowed] = useState(false)

  const [showPopupFollow, setShowPopupFollow] = useState(false)
  const [showPopupUnfollow, setShowPopupUnfollow] = useState(false)

  useEffect(() => {
    if (userIsAlreadyFollowed === true) {
      setAlreadyFollowed(true)
    } else {
      setAlreadyFollowed(false)
    }
  }, [userIsAlreadyFollowed])

  if (!session) {
    return (
      <>
        <button onClick={() => signIn()}>Login</button>
      </>
    )
  }


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




  const handleClick = (title: string) => {
    router.push(`/users/${usernameSlug}/lists/${title}`)
  };


  const productsWithReferrals = props.user.products.filter(product => {
    return product.referral.length > 0
  })




  const handleFollow = async () => {
    const data = {
      currentUserEmail: userSession?.user.email,
      followTargetID: props.user._id,
    }
    try {
      const response = await fetch("/api/users/follow", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        setAlreadyFollowed(true)
        setShowPopupFollow(true)
        setTimeout(() => {
          setShowPopupFollow(false)
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUnfollow = async () => {
    const data = {
      currentUserEmail: userSession?.user.email,
      unfollowTargetID: props.user._id,
    }
    try {
      const response = await fetch("/api/users/unfollow", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        setAlreadyFollowed(false)
        setShowPopupUnfollow(true)
        setTimeout(() => {
          setShowPopupUnfollow(false)
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }




  return (

    <div>

      <div className={styles.containerDiv}>
        <div className={styles.userCard}>

            <Image className={styles.avatar} src={props.user.avatar!} alt='user avatar' width={64} height={64} />


          <div className={styles.userStats}>
            <h1 className={styles.username}>{props.user.username}</h1>

            <div className={styles.listProducts}>
              <p>{props.user.lists.length} lists</p>
              <p>·</p>
              <p>{props.user.products.length}</p>
              <p>products</p>
            </div>

            <div className={styles.followersFollowing}>
              <Link href={`/users/${props.user.username}/followers-and-following`}>
                <p>{props.user.followers.length} followers</p>
              </Link>
              <p>·</p>
              <Link href={`/users/${props.user.username}/followers-and-following`}>
                <p>{props.user.following.length} following</p>
              </Link>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            {userIsProfileOwner && <Link href={`/settings/edit-profile`} className={styles.button}>Edit profile</Link>}
            {!userIsProfileOwner && !alreadyFollowed && <button onClick={handleFollow} className={styles.button}>Follow</button>}
            {!userIsProfileOwner && alreadyFollowed && <button onClick={handleUnfollow} className={styles.button}>Unfollow</button>}

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
        {!userHasProducts && productIsActive && <h1 className={styles.userHasNoThing}>{props.user.username} has no products</h1>}
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
            logo={product.productLogo}
            username={props.user.username}
            comments={product.comments}
            _id={product._id}
            bookmarkedBy={product.bookmarkedBy}
            currentUserId={props.user._id}
          />
        )}
      </div>






      <div className={styles.listsContainer}>
        {!userHasLists && listIsActive && <h1 className={styles.userHasNoThing}>{props.user.username} has no lists</h1>}
        {userHasLists && listIsActive && props.user.lists.map(list =>
          <UserList
            key={String(list._id)}
            title={list.title}
            products={list.products}
            about={list.about}
            shortAbout={list.shortAbout}
            thumbnail={list.thumbnail}
            onClick={() => handleClick(list.title)}
          />)}
      </div>


      <div className={styles.referralContainer}>
        {productsWithReferrals.length === 0 && referralIsActive && <h1 className={styles.userHasNoThing}>{props.user.username} has no referrals</h1>}
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
            //@ts-ignore
            bookmarkedBy={product.bookmarkedBy}
            currentUserId={props.user._id}
          />
        )}
      </div>




      <div className={styles.accountContainer}>
        {accountIsActive &&
          <>
            <h1 className={styles.userBioTitle}>Bio</h1>
            <p className={styles.userBio}>{props.user.bio}</p>
            <h1 className={styles.userSocialsTitle}>Socials</h1>

            <div className={styles.socialsContainer}>


              {props.user.socials.facebook.length > 0 &&
              <div>
                <a href={props.user.socials.facebook} target="_blank" rel="noopener noreferrer">
                <Image className={styles.socialIcon} src={`/socials/facebook-icon.svg`} alt={'facebook'} height={50} width={50}/>
                </a>

              </div> }






              {props.user.socials.github.length > 0 &&
              <div>
                <a href={props.user.socials.github} target="_blank" rel="noopener noreferrer">
                <Image className={styles.socialIcon} src={`/socials/github-icon.svg`} alt={'github'} height={50} width={50}/>
                </a>

              </div> }





              {props.user.socials.instagram.length > 0 &&
              <div>
                <a href={props.user.socials.instagram} target="_blank" rel="noopener noreferrer">
                <Image className={styles.socialIcon} src={`/socials/instagram-icon.png`} alt={'instagram'} height={50} width={50}/>
                </a>

              </div> }





              {props.user.socials.linkedin.length > 0 &&
              <div>
                <a href={props.user.socials.linkedin} target="_blank" rel="noopener noreferrer">
                <Image className={styles.socialIcon} src={`/socials/linkedin-icon.svg`} alt={'linkedin'} height={50} width={50}/>
                </a>

              </div> }





              {props.user.socials.medium.length > 0 &&
              <div>
                <a href={props.user.socials.medium} target="_blank" rel="noopener noreferrer">
                <Image className={styles.socialIcon} src={`/socials/medium-icon.svg`} alt={'medium'} height={50} width={50}/>
                </a>

              </div> }



              {props.user.socials.patreon.length > 0 &&
              <div>
                <a href={props.user.socials.patreon} target="_blank" rel="noopener noreferrer">
                <Image className={styles.socialIcon} src={`/socials/patreon-icon.svg`} alt={'patreon'} height={50} width={50}/>
                </a>

              </div> }



              {props.user.socials.snapchat.length > 0 &&
              <div>
                <a href={props.user.socials.snapchat} target="_blank" rel="noopener noreferrer">
                <Image className={styles.socialIcon} src={`/socials/snapchat-icon.png`} alt={'snapchat'} height={50} width={50}/>
                </a>

              </div> }



              {props.user.socials.tiktok.length > 0 &&
              <div>
                <a href={props.user.socials.tiktok} target="_blank" rel="noopener noreferrer">
                <Image className={styles.socialIcon} src={`/socials/tiktok-icon.svg`} alt={'tiktok'} height={50} width={50}/>
                </a>

              </div> }



              {props.user.socials.twitch.length > 0 &&
              <div>
                <a href={props.user.socials.twitch} target="_blank" rel="noopener noreferrer">
                <Image className={styles.socialIcon} src={`/socials/twitch-icon.png`} alt={'twitch'} height={50} width={50}/>
                </a>

              </div> }


              {props.user.socials.twitter.length > 0 &&
              <div>
                <a href={props.user.socials.twitter} target="_blank" rel="noopener noreferrer">
                <Image className={styles.socialIcon} src={`/socials/twitter-icon.png`} alt={'twitter'} height={50} width={50}/>
                </a>

              </div> }


              {props.user.socials.youtube.length > 0 &&
              <div>
                <a href={props.user.socials.youtube} target="_blank" rel="noopener noreferrer">
                <Image className={styles.socialIcon} src={`/socials/youtube-icon.svg`} alt={'youtube'} height={50} width={50}/>
                </a>

              </div> }




            </div>



          </>
        }






      </div>
      {showPopupFollow && <div className={styles.popupFollow}>
        <MdThumbUp />
        <p className={styles.popupText}>You now follow {props.user.username}</p>
        <RxCross2 />
      </div>}

      {showPopupUnfollow && <div className={styles.popupUnfollow}>
        <MdThumbUp />
        <p className={styles.popupText}>You unfollowed {props.user.username}</p>
        <RxCross2 />
      </div>}

    </div>
  )


};


export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB();
  const username = context.params!.usernameSlug

  const userDoc = await User.findOne({ username: username });

  if (!userDoc) {
    // to do
    return {
      notFound: true,
    };
  }
  await userDoc.populate('lists')
  await userDoc.populate('products')
  await userDoc.populate("followers")
  await userDoc.populate("follows")

  const socialDoc = await Social.findOne({ userId: userDoc._id })



  return {
    props: {
      user: {
        email: userDoc.email,
        avatar: userDoc.avatar,
        username: userDoc.username,
        bio: userDoc.bio,
        _id: await JSON.parse(JSON.stringify(userDoc._id)),
        followers: await JSON.parse(JSON.stringify(userDoc.followers)),
        following: await JSON.parse(JSON.stringify(userDoc.follows)),
        lists: await JSON.parse(JSON.stringify(userDoc.lists)),
        products: await JSON.parse(JSON.stringify(userDoc.products)),
        socials: await JSON.parse(JSON.stringify(socialDoc)),
      }
    },
  };
};



export default UserProfile
