import React from 'react';
import Image from 'next/image';
import styles from './avatar.module.css';

interface Props {
  alt?: string;
}

const Avatar: React.FC<Props> = ({ alt }) => {
  return (
    <div className={styles.avatar}>
      <Image
        className={styles.image}
        alt=""
        width={350}
        height={350}
        src="https://speaking.com/wp-content/uploads/2018/10/Tim-Ferriss.jpeg"
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
};

export default Avatar;
