import { NextPage } from "next";
import Header from "./Header";
import Footer from "./Footer";
import  { ReactNode, FC } from 'react';

type LayoutProps = {
  children: ReactNode;
};


const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="md:container">

      <header>
        <Header/>
      </header>

      <main>{children}</main>

      <footer>
        <Footer/>
      </footer>

    </div>
  )
}

export default Layout
