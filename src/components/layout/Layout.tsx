import { NextPage } from "next";
import Header from "./Header";
import Footer from "./Footer";
import  { ReactNode } from 'react';
import NavBar from "./NavBar";
import Suggested from "./Suggested";

type LayoutProps = {
  children: ReactNode;
};


const Layout = ({ children }: LayoutProps) => {
  return (
    <div>

      <header>
        <NavBar/>
        <Header/>
      </header>

      <main>{children}</main>

      <footer>
        <Suggested/>
        <Footer/>
      </footer>

    </div>
  )
}

export default Layout
