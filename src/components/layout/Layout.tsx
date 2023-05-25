import { NextPage } from "next";
import Header from "./Header";
import Footer from "./Footer";
import  { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};


const Layout = ({ children }: LayoutProps) => {
  return (
    <div>

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
