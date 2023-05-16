import { FormEventHandler, useRef } from 'react';
import { NextPage } from 'next';
import styles from './new-list.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import cloudinary from "cloudinary";

import CustomSession from '@/utils/Session';




const NewList: NextPage = () => {
  const { data: session, status } = useSession();
  const userSession = session as CustomSession

  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);

  if (!userSession) {
    return (
      <>
        <button onClick={() => signIn()}>Login</button>
      </>
    )
  }


  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const enteredTitle = titleRef.current?.value;
    const enteredAbout = aboutRef.current?.value;
    const enteredImage = imageRef.current?.files![0];

    if (enteredImage) {
      const formData = new FormData();
      formData.append('file', enteredImage);
      formData.append('upload_preset', 'favolist');

      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json()
      const secureUrl = responseData.secure_url




      const data = {
        userEmail: userSession.user.email,
        listTitle: enteredTitle,
        secure_url: secureUrl,
        listAbout: enteredAbout,
      }
      try {
        const response = await fetch('/api/users/new-list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {

          router.push(`/users/${userSession.user.username}`);
        }
      } catch (error) {
        console.log(error);

      }

    };
  }


  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>New List</h1>
      <form className={styles.form} onSubmit={handleSubmit}>

        <label htmlFor="title"> List title</label>
        <input type="text" id="title" placeholder="Hangover cures" ref={titleRef} />

        <label htmlFor="about"> About the list</label>
        <textarea id="about" placeholder="List of charcoal pills" ref={aboutRef} />

        <input type="file" accept="image/*" ref={imageRef} />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewList;
