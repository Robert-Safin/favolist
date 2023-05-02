import Image from 'next/image'
import styles from './ListItem.module.css'
import { FC } from 'react'
import { ListModelSchema } from '@/db/models/List'
import { ObjectId } from 'mongoose'

interface Props {
  alt: string,
  title: string,
  about: string,
  src: string
  _id: ObjectId
}

const ListItem: FC<Props> = (props) => {
  return (
    <>
      <Image src={props.src} alt={props.title} key={String(props._id)} width={200} height={200} />
      <h1>{props.title}</h1>
      <p>{props.about}</p>
    </>
  )
}


export default ListItem
