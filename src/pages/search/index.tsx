import FoundListCard from '@/components/search-results/FoundListCard';
import FoundProductCard from '@/components/search-results/FoundProductCard';
import FoundUserCard from '@/components/search-results/FoundUserCard';
import SearchBar from '@/components/searchBar/SearchBar';
import { ListModelSchema } from '@/db/models/List';
import { ProductModelSchema } from '@/db/models/Product';
import { UserModelSchema } from '@/db/models/User';
import { NextPage } from 'next';
import { FormEventHandler, useState } from 'react';
import styles from './index.module.css'
import { useSession } from 'next-auth/react';
import { ObjectId } from 'mongoose';
import CustomSession from '@/utils/Session';
import UserReferral from '@/components/user-profile/UserReferral';



interface Props { }

const SearchPage: NextPage<Props> = (props) => {
  const { data: session, status } = useSession()
  const userSession = session as CustomSession

  const [foundUsers, setFoundUsers] = useState<UserModelSchema[]>([]);
  const [foundLists, setFoundLists] = useState<ListModelSchema[]>([]);
  const [foundProducts, setFoundProducts] = useState<ProductModelSchema[]>([]);
  const [foundReferrals, setFoundReferrals] = useState<ProductModelSchema[]>([]);
  const [currentUser, setCurrentUser] = useState<UserModelSchema>();

  const [showProducts, setShowProducts] = useState(true)
  const [showLists, setShowLists] = useState(false)
  const [showReferrals, setShowReferrals] = useState(false)
  const [showUsers, setShowUsers] = useState(false)

  const handleShowProducts = () => {
    setShowProducts(true)
    setShowLists(false)
    setShowReferrals(false)
    setShowUsers(false)
  }

  const handleShowLists = () => {
    setShowProducts(false)
    setShowLists(true)
    setShowReferrals(false)
    setShowUsers(false)
  }

  const handleShowReferrals = () => {
    setShowProducts(false)
    setShowLists(false)
    setShowReferrals(true)
    setShowUsers(false)
  }

  const handleShowUsers = () => {
    setShowProducts(false)
    setShowLists(false)
    setShowReferrals(false)
    setShowUsers(true)
  }


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


      setFoundUsers(JSON.parse(data.foundUsers));
      setFoundLists(JSON.parse(data.foundLists));
      setFoundProducts(JSON.parse(data.foundProducts));
      setFoundReferrals(JSON.parse(data.foundReferrals));
      setCurrentUser(JSON.parse(data.currentUser));
    } catch (error) {
      console.log(error);
    }
  };



  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
  };

  const handleFollow = async (userId: ObjectId) => {
    const data = {
      currentUserEmail: userSession?.user.email,
      followTargetID: userId,
    }
    try {
      const response = fetch("/api/users/follow", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.log(error);

    }
  };

  const handleUnfollow = async (userId: ObjectId) => {
    const data = {
      currentUserEmail: userSession?.user.email,
      unfollowTargetID: userId,
    }
    try {
      const response = fetch("/api/users/unfollow", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.log(error);

    }
  }

  const isFollowed = (userId: ObjectId) => {
    // @ts-ignore too long to deal with
    return currentUser!.follows.map(user => user).includes(userId)
  }



  return (
    <>
      <SearchBar handleSubmit={handleSubmit} handleSearch={handleSearch} />
      <div className={styles.tabs}>
        <p onClick={handleShowProducts} className={showProducts ? styles.activeTab : styles.nonActiveTab}>Products</p>
        <p onClick={handleShowLists} className={showLists ? styles.activeTab : styles.nonActiveTab}>Lists</p>
        <p onClick={handleShowReferrals} className={showReferrals ? styles.activeTab : styles.nonActiveTab}>Referrals</p>
        <p onClick={handleShowUsers} className={showUsers ? styles.activeTab : styles.nonActiveTab}>Users</p>
      </div>





      {showUsers && <div className={styles.resultsContainer}>
        {foundUsers.map((user) => (
          <FoundUserCard
            userId={user._id}
            key={String(user._id)}
            username={user.username}
            avatar={user.avatar!}
            bio={user.bio}
            follows={user.follows}
            followers={user.followers}
            lists={user.lists}
            products={user.products}
            currentUsername={userSession?.user.username!}
            handleFollow={handleFollow}
            isFollowed={isFollowed}
            handleUnfollow={handleUnfollow}
          />
        ))}

      </div>}



      {showLists && <div className={styles.resultsContainer}>
        {foundLists.map((list: ListModelSchema) => (
          <FoundListCard
            key={String(list._id)}
            userId={list.user_id as UserModelSchema}
            listId={list._id}
            title={list.title}
            thumbnail={list.thumbnail}
            about={list.about}
            products={list.products}
          />
        ))}
      </div>}


      {showProducts && <div className={styles.resultsContainer}>
        {foundProducts.map((product: ProductModelSchema) => {
          const user = product.user_id as any;
          return (
            <FoundProductCard key={String(product._id)}
              productId={product._id}
              userId={product.user_id}
              listId={product.listId}
              productName={product.productName}
              productListName={product.productListName}
              productLogo={product.productLogo}
              productImage={product.productImage}
              content={product.content}
              price={product.price}
              referral={product.referral}
              userAvatar={user.avatar}
              userName={user.username}
            />
          )
        })}
      </div>}

        {showReferrals && <div className={styles.resultsContainer}>
          {foundReferrals.map((referral:ProductModelSchema) => {
            const user = referral.user_id as any;
            return (
              <UserReferral
              key={String(referral._id)}
              title={referral.productName}
              price={referral.price}
              content={referral.content}
              referral={referral.referral}
              referralDiscription={referral.referralDiscription}
              listName={referral.productListName}
              image={referral.productImage}
              avatar={user.avatar}
              username={user.username}
              />
            )

          })}
        </div> }

    </>
  );
};

export default SearchPage;
