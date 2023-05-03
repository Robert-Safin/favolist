import SearchBar from '@/components/searchBar/SearchBar'
import {NextPage} from 'next'
import { FormEventHandler } from 'react'

interface Props {

}




const SearchPage: NextPage<Props> = (props) => {
  const handleSearch = async(query: string) => {
    try {
      const response = await fetch('/api/search', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query)
      })
      const data = await response.json()
      console.log(data);

    } catch(error) {
      console.log(error);
    }
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <SearchBar handleSubmit={handleSubmit} handleSearch={handleSearch} />
    </>
  );
};


export default SearchPage
