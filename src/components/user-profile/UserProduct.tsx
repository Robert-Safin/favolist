import { FC, useState } from 'react'
import styles from './UserProduct.module.css'
import Image from 'next/image'
import { BsBookmark } from 'react-icons/bs'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { FaRegComment } from 'react-icons/fa'

import { RxDotsHorizontal } from 'react-icons/rx'
import Link from 'next/link'
import { useRouter } from 'next/router'
interface Props {
  title: string
  price: number
  content: string
  referral: string
  listName: string
  image: string
  avatar: string
  username: string
}

const UserProduct: FC<Props> = (props) => {
  const router = useRouter()
  const userSlug =  router.query.usernameSlug
  const listSlug = router.query.listIdSlug



  const [isImageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };


  return (
    <>
      {isImageLoading && <div className={styles.ldsGrid}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
      <div className={styles.cardContainer}>


        <div className={styles.suspensionPoints}>
          <button>
            <RxDotsHorizontal />
          </button>
        </div>




        <div className={styles.productContainer}>

          <div className={styles.productText}>
            <h1 className={styles.listName}>{props.listName}</h1>
            <h2 className={styles.title}>{props.title}</h2>
            <h3 className={styles.price}>${props.price}</h3>
            <p className={styles.content}>{props.content}</p>
          </div>


          <div>
            <Link href={`/users/${userSlug}/lists/${listSlug}/product/${props.title}`}>
            <Image className={styles.image} src={props.image} alt={props.listName} width={80} height={80} onLoad={handleImageLoad} />
            </Link>
          </div>



        </div>





        <div className={styles.cardActionsContainer}>

          <div className={styles.userInfo}>
            <Image className={styles.avatar} src={props.avatar} alt='user avatar' width={40} height={40} />
            <p>{props.username}</p>
          </div>

          <div className={styles.iconsContainer}>

            <div className={styles.iconContainer}>
              <BsBookmark />
              <p>0</p>
            </div>

            <div className={styles.iconContainer}>
              <IoMdAddCircleOutline />
              <p>1</p>
            </div>

            <div className={styles.iconContainer}>
              <FaRegComment />
              <p>3</p>
            </div>

          </div>

        </div>








      </div>
    </>
  )
}

export default UserProduct
