import { NextPage } from "next";
import styles from './new-product.module.css'

const NewProduct: NextPage = () => {
  return (
    <>
    <form action="">

    <label htmlFor="name">name</label>
    <input type="text" id='name'/>

    <label htmlFor="content">content</label>
    <textarea id='content'/>

    <label htmlFor="price">price</label>
    <input type="number" id='price'/>

    <label htmlFor="referral">referral</label>
    <input type="text" id='referral'/>

    <label htmlFor="image">image</label>
    <input type="file" id='image'/>

    </form>
    </>
  )
  }


  export default NewProduct
