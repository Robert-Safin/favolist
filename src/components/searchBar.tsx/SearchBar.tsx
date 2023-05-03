import {FC} from 'react'
import styles from './SearchBar.module.css'
interface Props {

}

const SearchBar:FC<Props> = () => {
  return (
    <form className={styles.searchForm}>
      <input type="text" placeholder='Search...' className={styles.searchInput}/>
    </form>

  )
}

export default SearchBar
