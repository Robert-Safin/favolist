import { GetServerSideProps, NextPage } from "next";
import styles from './new-product.module.css'
import { FormEventHandler, useRef, useState } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { signIn } from "next-auth/react";
import CustomSession from "@/utils/Session";
import BackNavHeader from '@/components/back-nav-header/BackNavHeader'
import { BiImage } from 'react-icons/bi'



import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { connectDB } from "@/db/lib/connectDb";
import { User } from "@/db/models";
import Link from "next/link";


interface Props {
  userListTitles: string[]
}

const NewProduct: NextPage<Props> = (props) => {

  const { data: session, status } = useSession();
  const userSession = session as CustomSession
  const router = useRouter();
  const listSlug = router.query.listIdSlug

  const nameRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const shortContentRef = useRef<HTMLInputElement>(null)
  const specsRef = useRef<HTMLTextAreaElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const referralRef = useRef<HTMLInputElement>(null)
  const referralDescriptionRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLSelectElement>(null)

  const [buttonIsDisabled, setButtonIsDisbaled] = useState(false)

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
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

  if (!userSession) {
    return (
      <>
        <button onClick={() => signIn()}>Login</button>
      </>
    )
  }
  const username = userSession.user.username

  if (props.userListTitles.length === 0) {
    return (
      <>
        <h1>You have no lists</h1>
        <Link href={`/users/${userSession.user.username}/lists/new-list`}>Make list</Link>
      </>
    )
  }


  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault()
    console.log(listRef.current?.value);

    setButtonIsDisbaled(true)
    const enteredName = nameRef.current?.value
    //const enteredContent = contentRef.current?.value
    const enteredShortContent = shortContentRef.current?.value
    const enteredSpecs = specsRef.current?.value
    const enteredPrice = priceRef.current?.value
    const enteredReferral = referralRef.current?.value
    const enteredReferralDiscription = referralDescriptionRef.current?.value
    const enteredImage = imageRef.current?.files![0]
    const listName = listRef.current?.value


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
      productName: enteredName,
      enteredContent: JSON.stringify(quill?.getContents()),
      enteredShortContent: enteredShortContent,
      enteredSpecs: enteredSpecs,
      enteredPrice: enteredPrice,
      enteredReferral: enteredReferral,
      enteredReferralDiscription: enteredReferralDiscription,
      image: secureUrl,
      listName: listName,
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
        router.push(`/users/${username}/lists/${listName}`);
      }
    } catch (error) {
      console.log(error);
    }
  }










  return (
    <>
      <BackNavHeader title={"New listing"} />
      <form className={styles.form} onSubmit={handleSubmit}>

        <label htmlFor="name">Product</label>
        <input type="text" id='name' placeholder="Type the product name here..." ref={nameRef} />

        <label htmlFor="price">Price</label>
        <input type="number" id='price' placeholder="Enter product price..." ref={priceRef} />

        <label htmlFor="list">List</label>

        <select name="languages" id="lang" ref={listRef}>
          {props.userListTitles.map(title =>
            <option value={title} key={title}>
              {title}
            </option>
          )}
        </select>


        <label htmlFor="content">Review</label>
        <div ref={quillRef} />
        {/* <textarea id='content' placeholder="Write a review here..." ref={contentRef} /> */}


        <label htmlFor="shortContent">Short Content</label>
        <input id='shortContent' placeholder="Provide a seo content here" ref={shortContentRef} />


        <label htmlFor="specs">Description</label>
        <textarea id='specs' placeholder="Provide a product description here..." ref={specsRef} />

        <label htmlFor="referral">Referral</label>
        <input type="text" id='referral' placeholder="Copy your referral code or link here..." ref={referralRef} />

        <label htmlFor="referralDescription">Referral details</label>
        <input type="text" id='referralDescription' placeholder="Enter referral details..." ref={referralDescriptionRef} />

        <label htmlFor="image" className={styles.imageupload}>
          <BiImage className={styles.imageuploadicon} />
          <div>Upload product image...</div>
        </label>
        <input type="file" id='image' className="hidden" ref={imageRef} />

        <button className={styles.button} type="submit" disabled={buttonIsDisabled}>Submit</button>
      </form>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const usernameSlug = context.query.usernameSlug

  await connectDB()
  const userDoc = await User.findOne({ username: usernameSlug })
  await userDoc?.populate('lists')

  const userListTitles = userDoc?.lists.map(list => list.title)



  return {
    props: {
      userListTitles: userListTitles

    }
  }
}




export default NewProduct
