
import { ObjectId } from 'mongoose'
import { FC } from 'react'

interface Props {
  productId: ObjectId
  userId: ObjectId
  listId: ObjectId
  productListName: string
  productLogo: string
  productImage: string
  content: string
  price: number
  referral: string
}

const FoundProductCard: FC<Props> = (props) => {
  return (
    <>
      {props.productId}
      <br />
      {props.userId}
      <br />
      {props.listId}
      <br />
      {props.productListName}
      <br />
      {props.productLogo}
      <br />
      {props.productImage}
      <br />
      {props.content}
      <br />
      {props.price}
      <br />
      {props.referral}
      <br />
    </>
  )
}

export default FoundProductCard
