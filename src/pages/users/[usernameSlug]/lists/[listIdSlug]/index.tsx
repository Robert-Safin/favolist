import { connectDB } from "@/db/lib/connectDb";

import { User, List, Product } from "@/db/models";
import  { ListModelSchema } from "@/db/models/List";
import { UserModelSchema } from "@/db/models/User";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import styles from './index.module.css'
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductCardProfile from "@/components/product-card-profile/ProductCard";
import {MdOutlineArrowBackIos} from 'react-icons/md'
interface Props {
  user: UserModelSchema
}

const ShowList: NextPage<Props> = (props) => {

  const { data: session, status } = useSession()
  const router = useRouter()
  const usernameSlug = router.query.usernameSlug
  const listIdSlug = router.query.listIdSlug

  const [showProducts, setShowProducts] = useState(false)
  const [showListAbout, setShowListAbout] = useState(true)

  const listHasNoProducts = props.user.products.length === 0




  if (!session) {
    return (
      <>
        <button onClick={() => signIn()}>Login</button>
      </>
    )
  }

  const handleClick = () => {
    router.push(`/users/${usernameSlug}/lists/${listIdSlug}/new-product`)
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


        <Link href={`/users/${session.user?.name}`} className={styles.backLink}><MdOutlineArrowBackIos/></Link>

        <div className={styles.userInfo}>
          <Image src={props.user.avatar!} alt={'user avatar'} className={styles.image} width={100} height={100} />
          <h1 className={styles.lisTitle}>{props.user.lists[0].title}</h1>
        </div>

      </div>

      <div className={styles.subNavigation}>
        <h1 onClick={handleShowProducts}>product</h1>
        <h1 onClick={handleShowAbout}>list info</h1>
      </div>

      {showProducts &&
        <div className={styles.productsContainer}>
          <button onClick={handleClick} className={styles.button}>add product</button>
          {listHasNoProducts && <p className={styles.listNoProducts}>No products in this list yet</p>}
          {props.user.products.map((product) => <ProductCardProfile key={product.id}
            title={product.productName}
            price={product.price}
            content={product.content}
            referral={product.referral}
            listName={product.productListName}
            image={product.productImage}
            avatar={props.user.avatar!}
            username={props.user.username}
          />)}
        </div>}

      {showListAbout &&
        <div className={styles.listInfoContainer}>
          <h1 className={styles.listTitle}>{props.user.lists[0].title}</h1>
          <p className={styles.listAbout}>{props.user.lists[0].about}</p>
        </div>}

    </>
  )
}

export default ShowList


export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB();

  const usernameSlug = context.params!.usernameSlug
  const listIdSlug = context.params!.listIdSlug

  const session = await getSession(context)
  const userEmail = session?.user?.email







  if (!usernameSlug || !listIdSlug) {
    // to do
    return {
      notFound: true,
    };
  }


  const userDoc = await User.findOne({ email: userEmail })
  console.log(userDoc);




  if (userDoc?.lists.length! > 0) {
    await userDoc?.populate("lists")
  }

  if (userDoc?.products.length! > 0) {
    await userDoc?.populate("products")
  }





  return {
    props: {
      user: JSON.parse(JSON.stringify(userDoc)),
    },
  };
};
