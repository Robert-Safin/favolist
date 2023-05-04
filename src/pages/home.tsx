import Card from "@/components/layout/Card";
import ToggleView from "@/components/toggleViewListCard/ToggleView";
import SearchBar from "@/components/searchBar/SearchBar";
import type { NextPage } from "next";
import styles from "./home.module.css";
import { signIn } from "next-auth/react";
import { getSession, useSession } from "next-auth/react";
import { useState, FormEventHandler } from "react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

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


  if (!session) {
    return (
      <>
        <button onClick={() => signIn()}>Login</button>
      </>
    );
  }

  return (
    <>
      <SearchBar handleSubmit={handleSubmit} handleSearch={handleSearch} />
      <ToggleView />
      <Card onClick={() => {}} />
      <Card onClick={() => {}} />
      <Card onClick={() => {}} />
    </>
  );
};

export default Home;
