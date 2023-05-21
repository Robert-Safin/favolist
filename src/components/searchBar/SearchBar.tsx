import { FC } from 'react';
import styles from './SearchBar.module.css';
import { GoSearch } from 'react-icons/go';

interface Props {
  handleSearch: (event: React.FormEvent) => void;
  setSearchInput: (value: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

const SearchBar: FC<Props> = ({ handleSearch, setSearchInput }) => {
  return (
    <form className={styles.searchForm} onSubmit={handleSearch}>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" className={styles.searchButton}>
          <GoSearch className={styles.zoomIcon} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar
