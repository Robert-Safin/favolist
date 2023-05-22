import { ProductModelSchema } from "@/db/models/Product";
import { FC, useState } from "react";
import styles from "./UserList.module.css";
import Image from "next/image";
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

interface Props {
  title: string;
  products: ProductModelSchema[];
  about: string;
  thumbnail: string;
  onClick: (title: string) => void;
}

const UserList: FC<Props> = (props) => {


  const deltaString = props.about;
  const deltaObject = JSON.parse(deltaString);
  const converter = new QuillDeltaToHtmlConverter(deltaObject.ops, {});
  const html = converter.convert();




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

        <div className={styles.about} dangerouslySetInnerHTML={{ __html: html }} />

      </div>
    </>
  );
};

export default UserList;
