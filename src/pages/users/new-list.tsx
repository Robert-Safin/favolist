
import {FormEventHandler, useRef} from 'react'
import { NextPage } from "next"
import styles from './new-list.module.css'
import { useSession } from 'next-auth/react'

const NewList:NextPage = () => {
  const { data: session, status } = useSession()



  const titleRef = useRef<HTMLInputElement>(null)
  const enteredTitle = titleRef.current?.value

  const handleSubmit:FormEventHandler = async(event) => {
    event.preventDefault()
    const formData = {
      userEmail : session?.user?.email,
      listTitle : enteredTitle
    }

    try {
      const response = await fetch('/api/users/new-list', {
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

  if (!session) {
    return <p>no session</p>
  }

  return (
    <div className={styles.formContainer}>

      <h1 className={styles.title}>New List</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="title"> List title</label>
        <input type="text" id="title" placeholder='Hangover cures' ref={titleRef}/>
        <button type="submit">Create</button>
      </form>

    </div>
  )
}


export default NewList
