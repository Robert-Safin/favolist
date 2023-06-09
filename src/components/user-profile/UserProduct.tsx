import { FC, useState } from 'react'
import styles from './UserProduct.module.css'
import Image from 'next/image'
import { BsBookmark, BsFillBookmarkFill, BsTrash } from 'react-icons/bs'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { FaRegComment } from 'react-icons/fa'

import { RxCross2, RxDotsHorizontal } from 'react-icons/rx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import CustomSession from '@/utils/Session'
import { ObjectId } from 'mongoose'
import { CommentModelSchema } from '@/db/models/Comment'
import { UserModelSchema } from '@/db/models/User'

import Modal from 'react-modal';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

interface Props {
  _id: ObjectId
  title: string
  price: number
  content: string
  referral: string
  listName: string
  image: string
  avatar: string
  username: string
  logo: string
  comments: CommentModelSchema[]
  bookmarkedBy: UserModelSchema[]
  currentUserId: ObjectId
  shortContent: string
}

const UserProduct: FC<Props> = (props) => {
  const router = useRouter()
  const userSlug = router.query.usernameSlug
  const listSlug = router.query.listIdSlug
  const { data: session, status } = useSession();
  const userSession = session as CustomSession

  Modal.setAppElement('#__next')
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const [popoverIsVisible, setPopoverIsVisible] = useState(false);

  const userIsProfileOwner = props.username === userSession.user.username

  // @ts-ignore ??????
  const currentUserAlreadyBookmarked = props.bookmarkedBy.includes(props.currentUserId)


  const deltaString = props.content;
  const deltaObject = JSON.parse(deltaString);
  const converter = new QuillDeltaToHtmlConverter(deltaObject.ops, {});
  const html = converter.convert();




  const managePopover = () => {
    setPopoverIsVisible(true)
    setTimeout(() => {
      setPopoverIsVisible(false)
    }, 4000);
  }

  const handleDeleteProduct = async () => {
    const data = {
      email: userSession.user.email,
      listName: props.listName,
      product: props.title,
    }
    const response = await fetch('/api/users/delete-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {

      router.push(`/users/${userSlug}/lists/${props.listName}`)
    }
  }

  const handleEditProduct = () => {
    router.push(`/users/${userSession.user.username}/lists/${props.listName}/product/${props.title}/edit`)
  }

  const handleAddBookmark = async () => {
    const data = {
      bookmarkedByEmail: userSession.user.email,
      productId: props._id,
    }
    const response = await fetch('/api/bookmarks/add-bookmark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      router.push(`/users/${userSlug}/lists/${listSlug}`)
    } else {
      console.log(await response.json());
    }
  }

  const handleRemoveBookmark = async () => {
    const data = {
      bookmarkedByEmail: userSession.user.email,
      productId: props._id,
    }
    const response = await fetch('/api/bookmarks/remove-bookmark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      router.push(`/users/${userSlug}/lists/${listSlug}`)
    } else {
      console.log(await response.json());
    }
  }


  return (
    <>


      <div>
        <Modal className={styles.modal} isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal">
          <RxCross2 className={styles.cross} onClick={closeModal} />
          <BsTrash className={styles.trash} />
          <h1 className={styles.modalHeading}>Are you sure you want to delete this listing?</h1>
          <p className={styles.modalWarning}>All related data including comments will be permanently deleted.</p>
          <button className={styles.deleteButton} onClick={handleDeleteProduct}>Yes, please delete</button>
          <button className={styles.abortButton} onClick={closeModal}>No, I want to keep this listing</button>
        </Modal>
      </div>








      <div className={styles.cardContainer}>

        {userIsProfileOwner &&
          <div className={styles.suspensionPoints}>
            <button>
              <RxDotsHorizontal onClick={managePopover} />
            </button>
            {popoverIsVisible &&
              <div className={styles.popover}>
                <div className={styles.popoverButtonContainer}>
                  <button className={styles.popoverButton} onClick={handleEditProduct}>Edit</button>
                  <button className={styles.popoverButton} onClick={openModal}>Delete</button>
                </div>
              </div>}
          </div>}





        <div className={styles.productContainer}>

          <div className={styles.productText}>
            <h1 className={styles.listName}>{props.listName}</h1>
            <h2 className={styles.title}>{props.title}</h2>
            <h3 className={styles.price}>${props.price}</h3>
            <p className={styles.content}>{props.shortContent} </p>
          </div>


          <div>
            <Link href={`/users/${userSlug}/lists/${props.listName}/product/${props.title}`}>
              <Image className={styles.image} src={props.image} alt={props.listName} width={80} height={80} />
            </Link>
          </div>



        </div>





        <div className={styles.cardActionsContainer}>

          <Link href={`/users/${props.username}`}>
            <div className={styles.userInfo}>
              <Image className={styles.avatar} src={props.avatar} alt='user avatar' width={40} height={40} />
              <p>{props.username}</p>
            </div>
          </Link>


          <div className={styles.iconsContainer}>

            {currentUserAlreadyBookmarked && <div className={styles.iconContainer}>
              <BsFillBookmarkFill className={styles.icons} onClick={handleRemoveBookmark} />
              <p>{props.bookmarkedBy.length}</p>
            </div>}

            {!currentUserAlreadyBookmarked && <div className={styles.iconContainer}>
              <BsBookmark className={styles.icons} onClick={handleAddBookmark} />
              <p>{props.bookmarkedBy.length}</p>
            </div>}



            <div className={styles.iconContainer}>
              <Link href={`/users/${userSlug}/lists/${props.listName}/product/${props.title}/comments`}><FaRegComment className={styles.icons} /></Link>
              <p>{props.comments.length}</p>
            </div>

          </div>

        </div>








      </div>
    </>
  )
}

export default UserProduct
