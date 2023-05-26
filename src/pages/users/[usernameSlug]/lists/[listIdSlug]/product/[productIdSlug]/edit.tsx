import { GetServerSideProps, NextPage } from "next"

import styles from './edit.module.css'
import { connectDB } from "@/db/lib/connectDb"
import { User } from "@/db/models"
import Product, { ProductModelSchema } from "@/db/models/Product"
import { EventHandler, FormEventHandler, useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import CustomSession from "@/utils/Session"
import { useRouter } from "next/router"

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import BackNavHeader from "@/components/back-nav-header/BackNavHeader"
import { BiImage } from "react-icons/bi"

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
  const imageRef= useRef<HTMLInputElement>(null)

  const [isImageAttached, setIsImageAttached] = useState(false);


  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        //[{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],
        ['link', 'video', 'image']
      ],
    },
  });

  useEffect(() => {
    if (quill) {
      const delta = JSON.parse(props.product.content);
      quill.setContents(delta);
    }
  }, [quill, props.product.content]);




  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    const enteredTitle = titleRef.current?.value
    //const enteredReview = reviewRef.current?.value
    const enteredReview = JSON.stringify(quill?.getContents())
    const enteredSpecs = specsRef.current?.value
    const enteredPrice = priceRef.current?.value
    const enteredReferral = referralRef.current?.value
    const enteredReferralLink = referralLinkRef.current?.value
    const enteredImage = imageRef.current?.files![0]


    const formData = new FormData();
    formData.append('file', enteredImage!);
    formData.append('upload_preset', 'favolist');

    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`, {
      method: 'POST',
      body: formData,
    });


    const responseData = await response.json()

    const secureUrl = responseData.secure_url


    const data = {
      email: userSession.user.email,
      productId: props.product._id,
      title: enteredTitle,
      review: enteredReview,
      specs: enteredSpecs,
      price: enteredPrice,
      referral: enteredReferral,
      referralLink: enteredReferralLink,
      productImage: secureUrl,
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

  const handleImageChange = () => {
    setIsImageAttached(true);
  };

  return (
    <>
    <BackNavHeader title={'New product'}/>
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>

        <label htmlFor="title">Product Title</label>
        <input className={styles.input} type="text" id="title" defaultValue={props.product.productName} ref={titleRef} />

        <label htmlFor="review">Review</label>
        <div ref={quillRef} />
        {/* <textarea className={styles.textarea} id="review" defaultValue={props.product.content} ref={reviewRef} /> */}

        <label htmlFor="specs">Specs</label>
        <textarea className={styles.textarea} id="specs" defaultValue={props.product.specs} ref={specsRef} />

        <label htmlFor="price">Price</label>
        <input className={styles.input} type="number" id="price" defaultValue={props.product.price} ref={priceRef} />

        <label htmlFor="referral">Referral</label>
        <input className={styles.input} type="text" id="referral" defaultValue={props.product.referralDiscription} ref={referralRef} />

        <label htmlFor="referral-link">Referral Link</label>
        <input className={styles.input} type="text" id="referral-link" defaultValue={props.product.referral} ref={referralLinkRef} />

        <label htmlFor="image" className={styles.imageupload}>Upload product image..
        <BiImage className={styles.imageuploadicon} />
        </label>
        <input className={styles.hideInput} type="file" id="image" ref={imageRef}  onChange={handleImageChange} />

        {isImageAttached && <p>Image attached</p>}
        <button className={styles.button} type="submit">Create</button>
      </form>
    </div>
    </>
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
