import Link from 'next/link'
import styles from './ProfileTabs.module.css'
import { FC } from "react";

interface Props {
  text: string
}

const ProfileTabs: FC<Props> = (props) => {

  return (
      <div className={styles.tab}>
        <button>{props.text}</button>
      </div>
  );
};

export default ProfileTabs;
