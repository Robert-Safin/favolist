
import { NextPage } from "next"
import { FormEventHandler, useRef } from "react"
import styles from './edit.module.css'
import { useSession } from 'next-auth/react'
import { UserProfileUpdateForm } from "../api/users/edit"

const EditProfile: NextPage = () => {
  const { data: session, status } = useSession()

  console.log(session);


  const usernameRef = useRef<HTMLInputElement>(null)
  const bioRef = useRef<HTMLTextAreaElement>(null)




  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault()
    const formData: UserProfileUpdateForm = {
      newUsername: usernameRef.current?.value as string,
      newBio: bioRef.current?.value as string,
      userEmail: session?.user?.email as string
    }
    try {
      const response = await fetch('/api/users/edit', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
    } catch (error) {
      console.log(error);

    }
  }



  return (

    <div className={styles.formContainer}>

      <h1 className={styles.title}>Update Profile</h1>

      <form onSubmit={handleSubmit} className={styles.form}>

        <label htmlFor="username" className={styles.formLabel}>Username</label>
        <input type="text" id="username" ref={usernameRef} className={styles.formInput} />

        <label htmlFor="bio" className={styles.formLabel}>Bio</label>
        <textarea id="bio" ref={bioRef} className={styles.formInput} />

        <button type="submit" className={styles.submitButton}> Submit</button>
      </form>

    </div>
  )
}

export default EditProfile
