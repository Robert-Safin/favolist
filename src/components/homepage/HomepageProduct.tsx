import { NextPage } from "next";
import Image from "next/image";

interface Props {
  image: string
}

const HomepageProduct:NextPage<Props> = (props) => {
  return (
    <>
    <Image src={props.image} alt={'product image'}/>
    </>
  )
}

export default HomepageProduct
