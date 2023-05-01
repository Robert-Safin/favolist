
import { NextPage } from "next"
import { FormEventHandler, useRef } from "react"
import styles from './edit.module.css'

const EditProfile: NextPage = () => {

  // const avatarRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const bioRef = useRef<HTMLTextAreaElement>(null)




  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault()
    const formData = {
      // newAvatar: avatarRef.current?.value,
      newUsername: usernameRef.current?.value,
      newBio: bioRef.current?.value,
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

        {/* <label htmlFor="avatar" className={styles.formLabel}>Avatar</label>
        <input type="file" id="avatar" ref={avatarRef} className={styles.formInput} /> */}

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
