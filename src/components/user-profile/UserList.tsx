import { ProductModelSchema } from "@/db/models/Product";
import { FC } from "react";
import styles from "./UserList.module.css";
import Image from "next/image";

interface Props {
  title: string;
  products: ProductModelSchema[];
  about: string;
  shortAbout: string;
  thumbnail: string;
  onClick: (title: string) => void;
}

const UserList: FC<Props> = (props) => {




  return (
    <>
      <div className={styles.listContainer} onClick={() => props.onClick(props.title)}>
        <div className={styles.imageContainer}>
          <Image src={props.thumbnail} alt={props.title} width={500} height={500} className={styles.image} />
          <div className={styles.titles}>
            <p className={styles.products}>{props.products.length} products</p>
            <h1 className={styles.title}>{props.title}</h1>
          </div>
        </div>
        <p className={styles.about}>{props.shortAbout}</p>
      </div>
    </>
  );

};

export default UserList;
