import React from 'react';
import styles from './Card.module.css';
import {FC} from 'react';
import Image from 'next/image';

interface Props {
  title?: string;
  imageUrl?: string;
  description?: string;
  onClick: () => void;
}

const Card:FC<Props> = ({ title, imageUrl, description, onClick }) => {

  return (
    <div className={styles.container}>
      <h2 className={styles.category}>Sleep Enhancers</h2>
      <h2 className={styles.title}>Oura Ring 3.0</h2>
      <h2 className={styles.price}>$300</h2>
      <div className={styles.imgContainer}>
       <Image className={styles.image}
        fill
        style={{ objectFit: 'contain' }}
        alt=''
        src='https://ouraring-images.imgix.net/https%3A%2F%2Fs3.amazonaws.com%2Fouraring.com%2Fimages%2Fproduct%2Fsimple%2Fpdp-img-carousel-black-01-heritage%402x.png?ixlib=js-2.3.2&fm=webp&w=684&s=ba64f7df7020d604ae2f2a0acaae219c'
        />
      </div>
      <div className={styles.descriptionContainer}>
        <p className={styles.descriptionList}>
          Each style has identical technical and hardware capabilities.
          Water resistant up to 100 m (more than 328 ft.)
          Lighter than a conventional ring (4 to 6 grams)
          Titanium: durable and wearable
          Includes size-specific charger and USB-C cable
          With daily wear, the ring may develop scratches

          Ring sensors should be on the palm side of your finger for the most accurate reading. To help ensure optimal positioning, Oura Horizon has a sleek, uninterrupted circular design with a pill-shaped dimple on the bottom, and Oura Heritage has a classic, plateau design with a flat surface on top.</p>
      </div>

    </div>
  );
};

export default Card;
