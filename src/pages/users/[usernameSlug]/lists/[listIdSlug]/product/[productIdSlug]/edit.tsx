import { GetServerSideProps, NextPage } from "next"

import styles from './edit.module.css'
import { connectDB } from "@/db/lib/connectDb"
import { User } from "@/db/models"
import Product, { ProductModelSchema } from "@/db/models/Product"
import { EventHandler, FormEventHandler, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import CustomSession from "@/utils/Session"
import { useRouter } from "next/router"


interface Props {
  product: ProductModelSchema
}

const EditProduct: NextPage<Props> = (props) => {
  const { data: session, status } = useSession();
  const userSession = session as CustomSession

  const router = useRouter()
  const usernameSlug = router.query.usernameSlug
  const listSlug = router.query.listIdSlug



  const titleRef = useRef<HTMLInputElement>(null)
  const reviewRef = useRef<HTMLTextAreaElement>(null)
  const specsRef = useRef<HTMLTextAreaElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const referralRef = useRef<HTMLInputElement>(null)
  const referralLinkRef = useRef<HTMLInputElement>(null)






  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    const enteredTitle = titleRef.current?.value
    const enteredReview = reviewRef.current?.value
    const enteredSpecs = specsRef.current?.value
    const enteredPrice = priceRef.current?.value
    const enteredReferral = referralRef.current?.value
    const enteredReferralLink = referralLinkRef.current?.value

    const data = {
      email: userSession.user.email,
      productId: props.product._id,
      title: enteredTitle,
      review: enteredReview,
      specs: enteredSpecs,
      price: enteredPrice,
      referral: enteredReferral,
      referralLink: enteredReferralLink,
    }

    try {
      const response = await fetch('/api/users/update-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        router.push(`/users/${usernameSlug}/lists/${listSlug}`)
      }
    } catch (error) {
      console.log(error);

    }

  }
  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Edit product</h1>

        <label htmlFor="title">Product Title</label>
        <input className={styles.input} type="text" id="title" defaultValue={props.product.productName} ref={titleRef} />

        <label htmlFor="review">Review</label>
        <textarea className={styles.textarea} id="review" defaultValue={props.product.content} ref={reviewRef} />

        <label htmlFor="specs">Specs</label>
        <textarea className={styles.textarea} id="specs" defaultValue={props.product.specs} ref={specsRef} />

        <label htmlFor="price">Price</label>
        <input className={styles.input} type="number" id="price" defaultValue={props.product.price} ref={priceRef} />

        <label htmlFor="referral">Referral</label>
        <input className={styles.input} type="text" id="referral" defaultValue={props.product.referralDiscription} ref={referralRef} />

        <label htmlFor="referral-link">Referral Link</label>
        <input className={styles.input} type="text" id="referral-link" defaultValue={props.product.referral} ref={referralLinkRef} />


        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const usernameSlug = context.query.usernameSlug
  const listSlug = context.query.listIdSlug
  const productSlug = context.query.productIdSlug

  await connectDB()


  const userDoc = await User.findOne({ username: usernameSlug })
  await userDoc?.populate('products')
  const targetProduct = userDoc?.products.find(product => product.productName === productSlug)





  return {
    props: {
      product: JSON.parse(JSON.stringify(targetProduct))
    }
  }
}


export default EditProduct
