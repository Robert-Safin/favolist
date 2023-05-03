import { FC } from 'react'
import styles from './SearchBar.module.css'
import { useRef } from 'react'
interface Props {
  handleSubmit: (event: React.FormEvent) => void;
  handleSearch: (query: string) => void;
}

const SearchBar: FC<Props> = (props) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchRef.current) {
      props.handleSearch(searchRef.current.value);
    }
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className={styles.searchInput}
        ref={searchRef}
      />
    </form>
  );
};

export default SearchBar
