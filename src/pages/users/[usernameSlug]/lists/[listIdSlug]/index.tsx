import { connectDB } from "@/db/lib/connectDb";

import { User } from "@/db/models";
import { UserModelSchema } from "@/db/models/User";
import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import styles from './index.module.css'
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import UserProduct from "@/components/user-profile/UserProduct";
import { MdOutlineArrowBackIos } from 'react-icons/md'
import ToggleView from "@/components/toggleViewListCard/ToggleView";


import CustomSession from "@/utils/Session";
import { getToken } from "next-auth/jwt";
import { useQuill } from "react-quilljs";


interface Props {
  user: UserModelSchema
  currentUser: UserModelSchema;
}

const ShowList: NextPage<Props> = (props) => {


  const { data: session, status } = useSession()
  const userSession = session as CustomSession
  const router = useRouter()
  const usernameSlug = router.query.usernameSlug
  const listIdSlug = router.query.listIdSlug

  const [showProducts, setShowProducts] = useState(true)
  const [showListAbout, setShowListAbout] = useState(false)


  const { quill, quillRef } = useQuill({readOnly: true,});
    const deltaString = props.user.lists[0].about;
    const deltaObject = JSON.parse(deltaString);
    quill?.setContents(deltaObject)

    useEffect(() => {
      if (quill) {
          const toolbar = quill.getModule('toolbar');
          if (toolbar && toolbar.container) {
              toolbar.container.style.display = 'none';
          }
      }
  }, [quill]);


  const listHasNoProducts = props.user.products.length === 0


  if (!userSession) {
    return (
      <>
        <button onClick={() => signIn()}>Login</button>
      </>
    )
  }


  const handleShowProducts = () => {
    setShowProducts(true)
    setShowListAbout(false)
  }

  const handleShowAbout = () => {
    setShowProducts(false)
    setShowListAbout(true)
  }




  return (

    <>
      <div className={styles.nav}>


        <Link href={`/users/${userSession.user.username}`} className={styles.backLink}><MdOutlineArrowBackIos /></Link>

        <div className={styles.userInfo}>
          <Image src={props.user.avatar!} alt={'user avatar'} className={styles.image} width={100} height={100} />
          {!listHasNoProducts && <h1 className={styles.lisTitle}>{props.user.lists[0].title}</h1>}
        </div>

      </div>

      <div className={styles.subNavigation}>
        <button className={showProducts ? styles.activeTab : styles.nonActiveTab} onClick={handleShowProducts}>Products</button>
        <button className={showListAbout ? styles.activeTab : styles.nonActiveTab} onClick={handleShowAbout}>List Description</button>
      </div>
      <ToggleView />



      {showProducts &&
        <>
          <div className={styles.buttonContainer}>
          </div>
          <div className={styles.productsContainer}>
            {listHasNoProducts && <p className={styles.listNoProducts}>No products in this list yet</p>}
            {props.user.products.map((product) =>
              <UserProduct
                key={String(product._id)}
                _id={product._id}
                title={product.productName}
                price={product.price}
                content={product.content}
                referral={product.referral}
                listName={product.productListName}
                image={product.productImage}
                avatar={props.user.avatar!}
                username={props.user.username}
                logo={product.productLogo}
                comments={product.comments}
                bookmarkedBy={product.bookmarkedBy}
                currentUserId={props.currentUser._id}

              />)}
          </div>
        </>}



      {showListAbout &&
        <div className={styles.listInfoContainer}>
          <Link href={`/users/${usernameSlug}/lists/${listIdSlug}/edit-description`}><button className={styles.button}>Edit list</button></Link>
          <h1 className={styles.listTitle}>{props.user.lists[0].title}</h1>
          <div ref={quillRef} />
        </div>}

    </>
  )
}

export default ShowList


export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB();

  const usernameSlug = context.params!.usernameSlug!
  const listIdSlug = context.params!.listIdSlug

  if (!usernameSlug || !listIdSlug) {
    // to do
    return {
      notFound: true,
    };
  }
  const token = await getToken(context)
  const currentUserEmail = token?.email

  const currentUserDoc  = await User.findOne({email:currentUserEmail})




  const userDoc = await User.findOne({ username: usernameSlug })


    await userDoc!.populate({
    path: 'products',
    match: { productListName: listIdSlug }
  });


  await userDoc?.populate({
    path: 'lists',
    match: { title: listIdSlug }
  })


  return {
    props: {
      user: JSON.parse(JSON.stringify(userDoc)),
      currentUser: JSON.parse(JSON.stringify(currentUserDoc))
    },
  };
};
