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

  return (
    <div className={styles.listContainer} onClick={() => props.onClick(props.title)}>
      <div className={styles.imageContainer}>
        <Image src={props.thumbnail} alt={props.title} width={100} height={100} className={styles.image} />
        <h1 className={styles.title}>{props.title}</h1>
        <p className={styles.products}>{props.products.length} products</p>
      </div>
      <p className={styles.about}>{props.about}</p>
    </div>
  );
};

export default UserList;
