import { GetServerSideProps, NextPage } from "next";
import styles from './edit-description.module.css'
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import CustomSession from "@/utils/Session";
import { useRouter } from "next/router";
import { connectDB } from "@/db/lib/connectDb";
import { User } from "@/db/models";
import { ListModelSchema } from "@/db/models/List";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

import dynamic from 'next/dynamic';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
	})


interface Props {
  list : ListModelSchema
}





const EditListDescription:NextPage<Props> = (props) => {
  const { data: session, status } = useSession();
  const userSession = session as CustomSession

  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(props.list.title)
  const [about, setAbout] = useState(props.list.about)
  //const [thumbnail, setThumbnail] = useState(props.list.thumbnail)

  const [quillValue, setQuillValue] = useState(JSON.parse(props.list.about));

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
      ['link', 'video'],
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
    'video',
  ]



const handleSubmit: FormEventHandler = async (event) => {
  event.preventDefault();

  const enteredTitle = titleRef.current?.value;
  const enteredImage = imageRef.current?.files![0];
  const enteredAbout = JSON.stringify(quillValue)



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
        listId: props.list._id,
        listTitle: enteredTitle,
        listAbout: enteredAbout,
        image: secureUrl,
      };

      try {
        const response = await fetch('/api/users/update-list-description', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        router.push(`/users/${userSession.user.username}`);

      } catch (error) {
        // to do
        console.log(error);
      }

};
  return (
    <>
    <form className={styles.form} onSubmit={handleSubmit}>
    <h1>Edit List Description</h1>

      <label htmlFor="title">Title</label>
      <input className={styles.input} type="text" id="title" defaultValue={title} ref={titleRef}/>

      <label htmlFor="about">About</label>
      <QuillNoSSRWrapper modules={modules} formats={formats} value={quillValue} onChange={setQuillValue}  theme="snow" />

      {/* <textarea className={styles.input} id="about" defaultValue={about} ref={aboutRef}/> */}

      <label htmlFor="thumbnail">Thumbnail</label>
      <input className={styles.input} type="file" id="thumbnail" ref={imageRef}/>

      <button type="submit">Submit</button>
    </form>
    </>
  )
}





export const getServerSideProps:GetServerSideProps = async(context) => {
  const userSlug = context.params!.usernameSlug
  const listSlug = context.params!.listIdSlug

  await connectDB()

  const userDoc = await User.findOne({username: userSlug})
  const userDocWithLists = await userDoc?.populate('lists')
  const list = userDocWithLists?.lists.find(list => list.title === listSlug)

  return {
    props: {
      list : JSON.parse(JSON.stringify(list))
    }
  }
}


export default EditListDescription
