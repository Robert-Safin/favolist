import { FormEventHandler, useRef, useState } from 'react';
import { NextPage } from 'next';
import styles from './new-list.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import cloudinary from 'cloudinary';
import { BiImage } from 'react-icons/bi';

import CustomSession from '@/utils/Session';
import BackNavHeader from '@/components/back-nav-header/BackNavHeader';

const NewList: NextPage = () => {
  const { data: session, status } = useSession();
  const userSession = session as CustomSession;

  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);

  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [isImageAttached, setIsImageAttached] = useState(false);

  if (!userSession) {
    return (
      <>
        <button onClick={() => signIn()}>Login</button>
      </>
    );
  }

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setButtonIsDisabled(true);
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

      const responseData = await response.json();
      const secureUrl = responseData.secure_url;

      const data = {
        userEmail: userSession.user.email,
        listTitle: enteredTitle,
        secure_url: secureUrl,
        listAbout: enteredAbout,
      };

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
    }
  };

  const handleImageChange = () => {
    setIsImageAttached(true);
  };

  return (
    <>
      <BackNavHeader title={'New list'} />
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="title">List name</label>
          <input type="text" id="title" placeholder="Give your list a name..." ref={titleRef} />

          <label htmlFor="about">Description</label>
          <textarea
            id="about"
            placeholder="Enter a list description here..."
            ref={aboutRef}
          />

          <label htmlFor="image" className={styles.imageupload}>
            <BiImage className={styles.imageuploadicon} />
            <div>Upload list image...</div>
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            ref={imageRef}
            className="hidden"
            onChange={handleImageChange}
          />

          {isImageAttached && <p>Image attached</p>}

          <button type="submit" disabled={buttonIsDisabled}>
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default NewList;
