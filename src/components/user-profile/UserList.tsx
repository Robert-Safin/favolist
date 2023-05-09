import { ProductModelSchema } from "@/db/models/Product";
import { FC } from "react";
import styles from "./UserList.module.css";
import Image from "next/image";
import Link from 'next'
interface Props {
  title: string;
  products: ProductModelSchema[];
  about: string;
  thumbnail: string;
  onClick: (title: string) => void;
}

const UserList: FC<Props> = (props) => {
  const maxAboutLength = 125;
  const truncatedAbout =
    props.about.length > maxAboutLength
      ? props.about.substring(0, maxAboutLength) + "..."
      : props.about;

  const maxTitleLength = 35
  const truncatedTitle =
    props.title.length > maxTitleLength
      ? props.title.substring(0, maxTitleLength) + "..."
      : props.title

  return (
    <div className={styles.listContainer} onClick={() => props.onClick(props.title)}>
      <div className={styles.imageContainer}>
        <Image src={props.thumbnail} alt={props.title} width={100} height={100} className={styles.image} />
        <h1 className={styles.title}>{truncatedTitle}</h1>
        <p className={styles.products}>{props.products.length} products</p>
      </div>
      <p className={styles.about}>{truncatedAbout}</p>
    </div>
  );
};

export default UserList;
