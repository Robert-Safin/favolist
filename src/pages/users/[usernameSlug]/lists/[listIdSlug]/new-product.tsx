import { NextPage } from "next";
import styles from './new-product.module.css'
import { FormEventHandler, useRef, useState } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { signIn } from "next-auth/react";
import CustomSession from "@/utils/Session";
import  BackNavHeader  from '@/components/back-nav-header/BackNavHeader'








const NewProduct: NextPage = () => {

  const { data: session, status } = useSession();
  const userSession = session as CustomSession
  const router = useRouter();
  const listSlug = router.query.listIdSlug

  const nameRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const specsRef = useRef<HTMLTextAreaElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const referralRef = useRef<HTMLInputElement>(null)
  const referralDescriptionRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)

  const [buttonIsDisabled, setButtonIsDisbaled] = useState(false)

  if (!userSession) {
    return (
      <>
        <button onClick={() => signIn()}>Login</button>
      </>
    )
  }
  const username = userSession.user.username




  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault()
    setButtonIsDisbaled(true)
    const enteredName = nameRef.current?.value
    const enteredContent = contentRef.current?.value
    const enteredSpecs = specsRef.current?.value
    const enteredPrice = priceRef.current?.value
    const enteredReferral = referralRef.current?.value
    const enteredReferralDiscription = referralDescriptionRef.current?.value
    const enteredImage = imageRef.current?.files![0]


    // to do valiadation

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
      userEmail: userSession.user.email,
      listName: listSlug,
      productName: enteredName,
      enteredContent: enteredContent,
      enteredSpecs: enteredSpecs,
      enteredPrice: enteredPrice,
      enteredReferral: enteredReferral,
      enteredReferralDiscription: enteredReferralDiscription,
      image: secureUrl,
    }

    try {
      const response = await fetch('/api/users/new-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const status = await response.json()

      if (response.ok) {
        router.push(`/users/${username}/lists/${listSlug}`);
      }
    } catch (error) {
      console.log(error);
    }
  }










  return (
    <>
    <BackNavHeader title={"Title"} link={"#"}/>
      <form className={styles.form} onSubmit={handleSubmit}>

        <label htmlFor="name">Product</label>
        <input type="text" id='name' ref={nameRef} />

        <label htmlFor="price">Price</label>
        <input type="number" id='price' ref={priceRef} />

        {/* <label htmlFor="list">List</label>
        <select name="languages" id="lang">
          <option value="someList" className={styles.placeholder}>Select a list...</option>
          <option value="someList">list 1</option>
          <option value="someOtherList">list 2 </option>
          <option value="robsBananas">robs bananas</option>
        </select> */}

        <label htmlFor="content">Review</label>
        <textarea id='content' ref={contentRef} />

        <label htmlFor="specs">Description</label>
        <textarea id='specs' ref={specsRef} />

        <label htmlFor="referral">Referral</label>
        <input type="text" id='referral' ref={referralRef} />

        <label htmlFor="referralDescription">Referral details</label>
        <input type="text" id='referralDescription' ref={referralDescriptionRef} />

        <label htmlFor="image">Product image</label>
        <input type="file" id='image' ref={imageRef} />

        <button type="submit" disabled={buttonIsDisabled}>Submit</button>
      </form>
    </>
  )
}


export default NewProduct
