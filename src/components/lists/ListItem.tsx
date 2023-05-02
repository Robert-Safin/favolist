import Image from 'next/image'
import styles from './ListItem.module.css'
import { FC } from 'react'
import { ListModelSchema } from '@/db/models/List'
import { ObjectId } from 'mongoose'
import { ProductModelSchema } from '@/db/models/Product'

interface Props {
  alt: string,
  title: string,
  about: string,
  src: string,
  _id: ObjectId,
  products: ProductModelSchema[],
  onClick: () => void


}

const ListItem: FC<Props> = (props) => {



  return (
    <div onClick={props.onClick}>
      <Image src={props.src}
        alt={props.title}
        key={String(props._id)}
        width={200}
        height={200}
        id={String(props._id)}

      />
      <h1>{props.title}</h1>
      <p>{props.about}</p>
      <p>{props.products.length} products</p>

    </div>
  )
}


export default ListItem
