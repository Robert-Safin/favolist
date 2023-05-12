import { NextPage } from "next";
import styles from './new-product.module.css'
import { FormEventHandler, useRef } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { signIn } from "next-auth/react";
import CustomSession from "@/utils/Session";






const NewProduct: NextPage = () => {

  const { data: session, status } = useSession();
  const userSession = session as CustomSession
  const router = useRouter();
  const listSlug = router.query.listIdSlug

  const nameRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const referralRef = useRef<HTMLInputElement>(null)
  const referralDescriptionRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)



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
    const enteredName = nameRef.current?.value
    const enteredContent = contentRef.current?.value
    const enteredPrice = priceRef.current?.value
    const enteredReferral = referralRef.current?.value
    const enteredReferralDiscription = referralDescriptionRef.current?.value
    const enteredImage = imageRef.current?.files


    // to do valiadation
    if (enteredImage && enteredImage.length > 0) {
      const reader = new FileReader();
      reader.onloadend = async (e) => {
        const base64 = e.target!.result;
        const data = {
          userEmail: userSession.user.email,
          listName: listSlug,
          productName: enteredName,
          enteredContent: enteredContent,
          enteredPrice: enteredPrice,
          enteredReferral: enteredReferral,
          enteredReferralDiscription: enteredReferralDiscription,

          image: base64,
        };

        try {
          const response = await fetch('/api/users/new-product', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          const status = await response.json()
          console.log(status);




          if (response.ok) {
            router.push(`/users/${username}`);
          }
        } catch (error) {
          console.log(error);
        }
      };
      reader.readAsDataURL(enteredImage[0]);
    }
  }










  return (
    <>
      <form action="" className={styles.form} onSubmit={handleSubmit}>

        <label htmlFor="name">name</label>
        <input type="text" id='name' ref={nameRef} />

        <label htmlFor="content">content</label>
        <textarea id='content' ref={contentRef} />

        <label htmlFor="price">price</label>
        <input type="number" id='price' ref={priceRef} />

        <label htmlFor="referral">referral</label>
        <input type="text" id='referral' ref={referralRef} />

        <label htmlFor="referralDescription">referral description</label>
        <input type="text" id='referralDescription' ref={referralDescriptionRef} />

        <label htmlFor="image">image</label>
        <input type="file" id='image' ref={imageRef} />

        <button type="submit">Submit</button>
      </form>
    </>
  )
}


export default NewProduct
