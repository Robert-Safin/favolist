import { connectDB } from "@/db/lib/connectDb";
import { User } from "@/db/models";
import { UserModelSchema } from "@/db/models/User";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import styles from './followers-and-following.module.css'
import { useState } from "react";
import ToggleView from "@/components/toggleViewListCard/ToggleView";
import FollowerAndFollowingCard from "@/components/follower-and-following/Follower&Following";

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
      <div className={styles.user}>
        <Image className={styles.avatar} src={props.user.avatar!} alt={props.user.username} width={50} height={50} />
        <p>{props.user.username}</p>
      </div>

      <div className={styles.tabs}>
        <p className={followersIsActive ? styles.activeTab : styles.nonActiveTab} onClick={handleFollowingClick}>Followers</p>
        <p className={followingIsActive ? styles.activeTab : styles.nonActiveTab} onClick={handleFollowsClick}>Following</p>
      </div>

      <ToggleView />

      <div className={styles.followersContainer}>
        {followersIsActive && props.user.followers.map(user =>
          <FollowerAndFollowingCard
            key={String(user._id)}
            avatar={user.avatar!}
            username={user.username}
            lists={user.lists}
            products={user.products}
            followers={user.followers}
            follows={user.follows}
          />
        )}
      </div>

      <div className={styles.followingContainer}>
        {followingIsActive && props.user.follows.map(user =>
          <FollowerAndFollowingCard
            key={String(user._id)}
            avatar={user.avatar!}
            username={user.username}
            lists={user.lists}
            products={user.products}
            followers={user.followers}
            follows={user.follows}
          />
        )}
      </div>

    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const userSlug = context.params!.usernameSlug

  await connectDB()
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
