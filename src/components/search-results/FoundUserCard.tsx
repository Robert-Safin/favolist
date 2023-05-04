
import { ListModelSchema } from '@/db/models/List'
import { ProductModelSchema } from '@/db/models/Product'
import { ObjectId } from 'mongoose'
import { FC } from 'react'

interface Props {
  userId: ObjectId
  username: string,
  avatar: string,
  bio: string,
  follows: ObjectId[],
  followers: ObjectId[],
  lists: ListModelSchema[],
  products: ProductModelSchema[]

}

const FoundUserCard: FC<Props> = (props) => {
  return (
    <div>
      {props.avatar}


      {props.username}


      {props.bio}

      {props.follows.length}

      {props.followers.length}

      {props.lists.length}

      {props.products.length}
    </div>
  )
}

export default FoundUserCard
