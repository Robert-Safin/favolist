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
      <h2 className="font-bold text-xl text-center mb-2">Oura Ring</h2>
      <Image className="w-full" width="300" height="200" alt="" src='https://ouraring-images.imgix.net/https%3A%2F%2Fs3.amazonaws.com%2Fouraring.com%2Fimages%2Fproduct%2Fsimple%2Fpdp-img-carousel-black-01-heritage%402x.png?ixlib=js-2.3.2&fm=webp&w=684&s=ba64f7df7020d604ae2f2a0acaae219c' />
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClick}
        >
          Read more
        </button>
      </div>
    </div>
  );
};



export default Card;
