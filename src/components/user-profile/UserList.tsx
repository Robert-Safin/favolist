import { ProductModelSchema } from "@/db/models/Product";
import { FC, useState } from "react";
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

  const [isImageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className={styles.listContainer} onClick={() => props.onClick(props.title)}>

      <div className={styles.imageContainer}>
        {isImageLoading && <div className={styles.ldsCircle}><div></div></div>}
        <Image src={props.thumbnail} alt={props.title} width={500} height={500} className={styles.image} onLoad={handleImageLoad} />

        <div className={styles.titles}>
          <p className={styles.products}>{props.products.length} products</p>
          <h1 className={styles.title}>{props.title}</h1>
        </div>

      </div>

      <p className={styles.about}>{props.about}</p>

    </div>
  );
};

export default UserList;
