
import { ProductModelSchema } from '@/db/models/Product'
import { ObjectId } from 'mongoose'
import { FC } from 'react'

interface Props {
  userId: ObjectId
  listId: ObjectId
  title: string
  thumbnail: string
  about: string
  products: ProductModelSchema[]
}

const FoundListCard: FC<Props> = (props) => {
  return (
    <>
      {props.userId}
      <br />
      {props.listId}
      <br />
      {props.title}
      <br />
      {props.thumbnail}
      <br />
      {props.about}
      <br />
      {props.products.length}
      <br />
    </>
  )
}

export default FoundListCard
