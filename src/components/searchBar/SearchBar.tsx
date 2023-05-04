import { FC } from 'react';
import styles from './SearchBar.module.css';
import { GoSearch } from 'react-icons/go';

interface Props {
  handleSubmit: (event: React.FormEvent) => void;
  handleSearch: (value: string) => void;
}

const SearchBar: FC<Props> = ({ handleSubmit, handleSearch }) => {
  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button type="submit" className={styles.searchButton}>
          <GoSearch className={styles.zoomIcon} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
