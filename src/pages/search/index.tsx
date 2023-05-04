import FoundListCard from '@/components/search-results/FoundListCard';
import FoundProductCard from '@/components/search-results/FoundProductCard';
import FoundUserCard from '@/components/search-results/FoundUserCard';
import SearchBar from '@/components/searchBar/SearchBar';
import { ListModelSchema } from '@/db/models/List';
import { ProductModelSchema } from '@/db/models/Product';
import { UserModelSchema } from '@/db/models/User';
import { NextPage } from 'next';
import { FormEventHandler, useState } from 'react';
import styles from './index.module.css'
interface Props { }

const SearchPage: NextPage<Props> = (props) => {
  const [foundUsers, setFoundUsers] = useState<UserModelSchema[]>([]);
  const [foundLists, setFoundLists] = useState<ListModelSchema[]>([]);
  const [foundProducts, setFoundProducts] = useState<ProductModelSchema[]>([]);

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
      <div className={styles.resultsContainer}>
        <h2>Users:</h2>
        {foundUsers.map((user: UserModelSchema) => (
          <FoundUserCard
            userId={user._id}
            key={String(user._id)}
            username={user.username}
            avatar={user.avatar!}
            bio={user.bio}
            follows={user.follows}
            followers={user.followers}
            lists={user.lists}
            products={user.products}
          />
        ))}

      </div>

      <div className={styles.resultsContainer}>
        <h2>Lists:</h2>
        {foundLists.map((list: ListModelSchema) => (
          <FoundListCard
            key={String(list._id)}
            userId={list.user_id}
            listId={list._id}
            title={list.title}
            thumbnail={list.thumbnail}
            about={list.about}
            products={list.products}
          />
        ))}
      </div>

      <div className={styles.resultsContainer}>
        <h2>Products:</h2>
        {foundProducts.map((product: ProductModelSchema) => (
          <FoundProductCard key={String(product._id)}
          productId={product.id}
          userId={product.user_id}
          listId={product.listId}
          productListName={product.productListName}
          productLogo={product.productLogo}
          productImage={product.productImage}
          content={product.content}
          price={product.price}
          referral={product.referral}

          />
        ))}
      </div>
    </>
  );
};

export default SearchPage;
