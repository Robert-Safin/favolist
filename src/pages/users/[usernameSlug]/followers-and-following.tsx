import { connectDB } from "@/db/lib/connectDb";
import { User } from "@/db/models";
import { UserModelSchema } from "@/db/models/User";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import styles from './followers-and-following.module.css'
import { useState } from "react";
import ToggleView from "@/components/toggleViewListCard/ToggleView";
import BackNavHeader from "@/components/back-nav-header/BackNavHeader";
import FollowerCard from "@/components/follower-and-following/Follower";
import FollowingCard from "@/components/follower-and-following/Following";

interface Props {
  user: UserModelSchema
}

const FollowingPage: NextPage<Props> = (props) => {
  const [followersIsActive, setFollowersIsActive] = useState(false)
  const [followingIsActive, setFollowingIsActive] = useState(true)

  const handleFollowingClick = () => {
    setFollowersIsActive(true)
    setFollowingIsActive(false)
  }

  const handleFollowsClick = () => {
    setFollowersIsActive(false)
    setFollowingIsActive(true)
  }



  return (
    <>
    <BackNavHeader title={`Followers & Following`}/>
      <div className={styles.user}>
        <Image className={styles.avatar} src={props.user.avatar!} alt={props.user.username} width={50} height={50} />
        <p>{props.user.username}</p>
      </div>

      <div className={styles.tabs}>
        <p className={followersIsActive ? styles.activeTab : styles.nonActiveTab} onClick={handleFollowingClick}>Followers</p>
        <p className={followingIsActive ? styles.activeTab : styles.nonActiveTab} onClick={handleFollowsClick}>Following</p>
      </div>



      <div className={styles.followersContainer}>
        {followersIsActive && props.user.followers.map(user =>
          <FollowerCard
            key={String(user._id)}
            avatar={user.avatar!}
            username={user.username}
            lists={user.lists}
            products={user.products}
            followers={user.followers}
            follows={user.follows}
            _id={user._id}
          />
        )}
      </div>

      <div className={styles.followingContainer}>
        {followingIsActive && props.user.follows.map(user =>
          <FollowingCard
            key={String(user._id)}
            avatar={user.avatar!}
            username={user.username}
            lists={user.lists}
            products={user.products}
            followers={user.followers}
            follows={user.follows}
            _id={user._id}

          />
        )}
      </div>

    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB();
  const userSlug = context.params!.usernameSlug


  const userDoc = await User.findOne({ username: userSlug })

  if (userDoc?.follows.length! > 0) {
    await userDoc?.populate('follows')
  }

  if (userDoc?.followers.length! > 0) {
    await userDoc?.populate('followers')
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(userDoc))
    }
  }
}

export default FollowingPage
