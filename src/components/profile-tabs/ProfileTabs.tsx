import Link from 'next/link'
import styles from './ProfileTabs.module.css'
import { FC } from "react";

interface Props {
  text: string
  link: string
}

const ProfileTabs: FC<Props> = (props) => {

  return (
      <div className={styles.tab}>
        <Link href={props.link}><p>{props.text }</p></Link>
      </div>
  );
};

export default ProfileTabs;
