import { FormEventHandler, useRef } from 'react';
import { NextPage } from 'next';
import styles from './new-list.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const NewList: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session) {
    // to do
  }

  const titleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const enteredTitle = titleRef.current?.value;
    const enteredImage = imageRef.current?.files;

    if (enteredImage && enteredImage.length > 0) {
      // to do: validate file type
      const reader = new FileReader();
      reader.onloadend = async (e) => {
        const base64 = e.target!.result;
        const data = {
          userEmail: session?.user?.email,
          listTitle: enteredTitle,
          image: base64,
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
            router.push(`/users/${session?.user?.email}`);
          }
        } catch (error) {
          // to do
          console.log(error);
        }
      };
      reader.readAsDataURL(enteredImage[0]);
    } else {
      console.log('missing image');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>New List</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="title"> List title</label>
        <input type="text" id="title" placeholder="Hangover cures" ref={titleRef} />
        <input type="file" accept="image/*" ref={imageRef} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewList;
