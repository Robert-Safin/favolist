import Card from "@/components/layout/Card";
import ToggleView from "@/components/toggleViewListCard/ToggleView";
import SearchBar from "@/components/searchBar.tsx/SearchBar";
import type { NextPage } from "next";
import styles from "./home.module.css";


const Home: NextPage = () => {
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
