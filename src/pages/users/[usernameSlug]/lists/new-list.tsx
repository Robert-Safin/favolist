import { FormEventHandler, useRef, useState } from 'react';
import { NextPage } from 'next';
import styles from './new-list.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

import { BiImage } from 'react-icons/bi';

import CustomSession from '@/utils/Session';
import BackNavHeader from '@/components/back-nav-header/BackNavHeader';


import "quill/dist/quill.snow.css";
import dynamic from 'next/dynamic';
import Modal from 'react-modal';
import { RxCross2 } from 'react-icons/rx';
import { BsTrash } from 'react-icons/bs';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const NewList: NextPage = () => {
  Modal.setAppElement('#__next')
  const [modalIsOpen, setIsOpen] = useState(false);

  const { data: session, status } = useSession();
  const userSession = session as CustomSession;

  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const shortAboutRef = useRef<HTMLTextAreaElement>(null);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [isImageAttached, setIsImageAttached] = useState(false);

  const [quillValue, setQuillValue] = useState('');

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    //'image',
    //'video',
  ]

  if (!userSession) {
    return (
      <>
        <button onClick={() => signIn()}>Login</button>
      </>
    );
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setButtonIsDisabled(true);
    const enteredTitle = titleRef.current?.value;
    const enteredShortAbout = shortAboutRef.current?.value
    const enteredImage = imageRef.current?.files![0];


    if (enteredImage && enteredTitle?.trim().length! > 0 && enteredShortAbout?.trim().length! > 0) {
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
        listAbout: JSON.stringify(quillValue),
        shortAbout: enteredShortAbout,
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
    } else {

      setButtonIsDisabled(false);

      setIsOpen(true)
      setTimeout(() => {
        setIsOpen(false)
      }, 1000);
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
          <label htmlFor="title">List name*</label>
          <input type="text" id="title" placeholder="Give your list a name..." ref={titleRef} />

          <label htmlFor="about">Description*</label>

          <QuillNoSSRWrapper modules={modules} formats={formats} value={quillValue} onChange={setQuillValue} theme="snow" />


          <label htmlFor="shortAbout">Short Description*</label>
          <textarea id="shortAbout" placeholder='Short descripion...' ref={shortAboutRef} />

          <label htmlFor="image" className={styles.imageupload}>
            <BiImage className={styles.imageuploadicon} />
            <div>Upload list image</div>
          </label>
          <input className={styles.hide}
            type="file"
            id="image"
            accept="image/*"
            ref={imageRef}
            onChange={handleImageChange}
          />

          {isImageAttached && <p className={styles.imageAttached}>Image attached</p>}

          <button type="submit" disabled={buttonIsDisabled} className={styles.button}>
            Create
          </button>
        </form>
      </div>





      <div>
        <Modal className={styles.modal} isOpen={modalIsOpen} onRequestClose={closeModal}>
          <h1 className={styles.modalHeading}>Invalid inputs</h1>
        </Modal>
      </div>
    </>
  );
};

export default NewList;
