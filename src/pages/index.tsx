
import Image from 'next/image'
import SearchBar from '@/components/searchBar.tsx/SearchBar'
import { NextPage } from 'next'


const LandingPage: NextPage = () => {
  return (
    <>
    <SearchBar/>

    <Image src={'landing-page-images/mobile.svg'} alt='some text' width={300} height={300}/>

    <Image src={'landing-page-images/browse.svg'} alt='some text' width={300} height={300}/>

    <Image src={'landing-page-images/charecteristics.svg'} alt='some text' width={300} height={300}/>

    <Image src={'landing-page-images/refer.svg'} alt='some text' width={300} height={300}/>

    <Image src={'landing-page-images/buy.svg'} alt='some text' width={300} height={300}/>

    </>



  )
}

export default LandingPage
