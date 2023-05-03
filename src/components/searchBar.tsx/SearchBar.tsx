import {FC} from 'react'
import styles from './SearchBar.module.css'
import {GoSearch} from 'react-icons/go'
interface Props {

}

const SearchBar:FC<Props> = () => {
  return (
    <form className={styles.searchForm}>
      <div className={styles.container}>
        <input type="text" placeholder='Search...' className={styles.searchInput}/>
        <GoSearch className={styles.zoomIcon} />
      </div>
    </form>

  )
}

export default SearchBar
