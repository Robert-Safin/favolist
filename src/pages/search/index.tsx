import SearchBar from '@/components/searchBar/SearchBar';
import { ListModelSchema } from '@/db/models/List';
import { ProductModelSchema } from '@/db/models/Product';
import { UserModelSchema } from '@/db/models/User';
import { NextPage } from 'next';
import { FormEventHandler, useState } from 'react';

interface Props {}

const SearchPage: NextPage<Props> = (props) => {
  // Add state for foundUsers, foundLists, and foundProducts
  const [foundUsers, setFoundUsers] = useState([]);
  const [foundLists, setFoundLists] = useState([]);
  const [foundProducts, setFoundProducts] = useState([]);

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      });
      const data = await response.json();

      // Update the state with the fetched data
      setFoundUsers(JSON.parse(data.foundUsers));
      setFoundLists(JSON.parse(data.foundLists));
      setFoundProducts(JSON.parse(data.foundProducts));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <SearchBar handleSubmit={handleSubmit} handleSearch={handleSearch} />
      <div>
        <h2>Users:</h2>
        {foundUsers.map((user:UserModelSchema) => (
          <div key={String(user._id)}>{user.username}</div>
        ))}
      </div>

      <div>
        <h2>Lists:</h2>
        {foundLists.map((list:ListModelSchema) => (
          <div key={String(list._id)}>{list.title}</div>
        ))}
      </div>

      <div>
        <h2>Products:</h2>
        {foundProducts.map((product:ProductModelSchema) => (
          <div key={String(product._id)}>{product.productName}</div>
        ))}
      </div>
    </>
  );
};

export default SearchPage;
