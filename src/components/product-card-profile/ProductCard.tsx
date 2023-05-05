import {FC} from 'react'
import styles from './ProductCard.module.css'
import Image from 'next/image'
interface Props {
  title: string
  price: number
  content: string
  referral: string
  listName:string
  image: string
}

const ProductCardProfile:FC<Props> = (props) => {
  return (
    <>
    <h1>{props.listName}</h1>
    <Image src={props.image} alt={props.listName} width={50} height={50}/>
    <h2>{props.title}</h2>
    <h3>{props.price}</h3>
    <p>{props.content}</p>
    <p>{props.referral}</p>
    </>
  )
}

export default ProductCardProfile
