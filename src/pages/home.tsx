import Card from "@/components/layout/Card";
import ToggleView from "@/components/toggleViewListCard/ToggleView";
import SearchBar from "@/components/searchBar.tsx/SearchBar";
import type { NextPage } from "next";
import styles from "./home.module.css";
import { signIn } from "next-auth/react";
import { getSession, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  if (!session) {
    return (
      <>
        <button onClick={() => signIn()}>Login</button>
      </>
    )
  }
  return (
    <>
    <SearchBar />
    <ToggleView />
    <Card onClick={() => {}}  />
    <Card onClick={() => {}}  />
    <Card onClick={() => {}}  />
    </>
  )

}

export default Home;
