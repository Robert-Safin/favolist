
import { GetServerSideProps, NextPage } from "next"
import { FormEventHandler, useRef } from "react"
import styles from './edit-profile.module.css'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import CustomSession from "@/utils/Session"
import { User } from "@/db/models"
import Image from "next/image"

interface Props {
  bio: string
}


const EditProfile: NextPage<Props> = (props) => {
  const { data: session, status } = useSession()
  const userSession = session as CustomSession
  const router = useRouter()
  const bioRef = useRef<HTMLTextAreaElement>(null)

  const facebookRef = useRef<HTMLInputElement>(null)
  const instagramRef = useRef<HTMLInputElement>(null)
  const linkedinRef = useRef<HTMLInputElement>(null)
  const meduimRef = useRef<HTMLInputElement>(null)
  const patreonRef = useRef<HTMLInputElement>(null)
  const snapchatRef = useRef<HTMLInputElement>(null)
  const twitchRef = useRef<HTMLInputElement>(null)
  const twitterRef = useRef<HTMLInputElement>(null)
  const youtubeRef = useRef<HTMLInputElement>(null)

  if (!userSession) {
    return (
      <>
        <button onClick={() => signIn()}>Login</button>
      </>
    )
  }



  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault()


    const facebook = facebookRef.current?.value.trim()
    const instagram = instagramRef.current?.value.trim()
    const linkedin = linkedinRef.current?.value.trim()
    const meduim = meduimRef.current?.value.trim()
    const patreon = patreonRef.current?.value.trim()
    const snapchat = snapchatRef.current?.value.trim()
    const twitch = twitchRef.current?.value.trim()
    const twitter = twitterRef.current?.value.trim()
    const youtube = youtubeRef.current?.value.trim()



    const formData = {
      newBio: bioRef.current?.value,
      userEmail: userSession.user.email,
      facebook: facebook,
      instagram: instagram,
      linkedin: linkedin,
      meduim: meduim,
      patreon: patreon,
      snapchat: snapchat,
      twitch: twitch,
      twitter: twitter,
      youtube: youtube

    }
    try {
      const response = await fetch('/api/users/edit', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        router.push(`/users/${userSession.user.username}`)
      }
    } catch (error) {
      console.log(error);

    }
  }



  return (

    <div className={styles.formContainer}>

      <h1 className={styles.title}>Update Profile</h1>

      <form onSubmit={handleSubmit} className={styles.form}>

        <div className={styles.bioContainer}>
          <label htmlFor="bio" className={styles.formLabel}>Bio</label>
          <textarea id="bio" ref={bioRef} className={styles.formInput} defaultValue={props.bio} />
        </div>


        <div className={styles.socialMainContainer}>
          <h1>Add your socials links</h1>
          <div className={styles.socialContainer}>
            <Image className={styles.logo} src={'/socials/facebook-icon.svg'} alt={'facebook'} width={50} height={50} />
            <input type="text" ref={facebookRef} />
          </div>

          <div className={styles.socialContainer}>
            <Image className={styles.logo} src={'/socials/instagram-icon.png'} alt={'instagram'} width={50} height={50} />
            <input type="text" ref={instagramRef} />
          </div>

          <div className={styles.socialContainer}>
            <Image className={styles.logo} src={'/socials/linkedin-icon.svg'} alt={'linkedin'} width={50} height={50} />
            <input type="text" ref={linkedinRef} />
          </div>

          <div className={styles.socialContainer}>
            <Image className={styles.logo} src={'/socials/medium-icon.svg'} alt={'medium'} width={50} height={50} />
            <input type="text" ref={meduimRef} />
          </div>

          <div className={styles.socialContainer}>
            <Image className={styles.logo} src={'/socials/patreon-icon.svg'} alt={'patreon'} width={50} height={50} />
            <input type="text" ref={patreonRef} />
          </div>

          <div className={styles.socialContainer}>
            <Image className={styles.logo} src={'/socials/snapchat-icon.png'} alt={'snapchat'} width={50} height={50} />
            <input type="text" ref={snapchatRef} />
          </div>

          <div className={styles.socialContainer}>
            <Image className={styles.logo} src={'/socials/twitch-icon.png'} alt={'twitch'} width={50} height={50} />
            <input type="text" ref={twitchRef} />
          </div>

          <div className={styles.socialContainer}>
            <Image className={styles.logo} src={'/socials/twitter-icon.png'} alt={'twitter'} width={50} height={50} />
            <input type="text" ref={twitterRef} />
          </div>

          <div className={styles.socialContainer}>
            <Image className={styles.logo} src={'/socials/youtube-icon.svg'} alt={'youtube'} width={50} height={50} />
            <input type="text" ref={youtubeRef} />
          </div>


        </div>

        <button type="submit" className={styles.submitButton}> Submit</button>
      </form>
    </div>
  )
}




export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession(context)
  const userEmail = session?.user?.email

  const userDoc = await User.findOne({ email: userEmail })
  const userBio = userDoc?.bio



  return {
    props: {
      bio: userBio
    }
  }
}







export default EditProfile
