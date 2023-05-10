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
import { useSession } from 'next-auth/react';
interface Props { }

const SearchPage: NextPage<Props> = (props) => {
  const { data: session, status } = useSession()
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


      setFoundUsers(JSON.parse(data.foundUsers));
      setFoundLists(JSON.parse(data.foundLists));
      setFoundProducts(JSON.parse(data.foundProducts));

    } catch (error) {
      console.log(error);
    }
  };

  const currentUsername = session?.user?.name



  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <SearchBar handleSubmit={handleSubmit} handleSearch={handleSearch} />
      <h2 className={styles.foundCategory}>Users found</h2>
      <div className={styles.resultsContainer}>
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
            currentUsername={currentUsername!}
          />
        ))}

      </div>

      <h2 className={styles.foundCategory}>Lists found</h2>
      <div className={styles.resultsContainer}>
        {foundLists.map((list: ListModelSchema) => (
          <FoundListCard
            key={String(list._id)}
            userId={list.user_id as UserModelSchema}
            listId={list._id}
            title={list.title}
            thumbnail={list.thumbnail}
            about={list.about}
            products={list.products}
          />
        ))}
      </div>

      <h2 className={styles.foundCategory}>Products found</h2>
      <div className={styles.resultsContainer}>
        {foundProducts.map((product: ProductModelSchema) => {
          const user = product.user_id as any;
          return (
            <FoundProductCard key={String(product._id)}
              productId={product._id}
              userId={product.user_id}
              listId={product.listId}
              productName={product.productName}
              productListName={product.productListName}
              productLogo={product.productLogo}
              productImage={product.productImage}
              content={product.content}
              price={product.price}
              referral={product.referral}
              userAvatar={user.avatar}
              userName={user.username}
            />
          )
        })}


      </div>
    </>
  );
};

export default SearchPage;
