
import Image from 'next/image'
import SearchBar from '@/components/searchBar.tsx/SearchBar'
import { NextPage } from 'next'
import styles from './index.module.css'
import { motion } from 'framer-motion'
import Card from '@/components/layout/Card'

const LandingPage: NextPage = () => {

  return (
    <>
      <SearchBar />

      <motion.div
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y:0 , opacity: 1}}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className={styles.rightCard}>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod saepe possimus inventore quis, perferendis non maiores sint repellat, mollitia dolore officia ipsum eos incidunt unde ducimus distinctio aliquam quibusdam pariatur!</p>
        <Image src={'landing-page-images/mobile.svg'} alt='mobile application' width={600} height={600}/>
      </motion.div>

      <motion.div
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className={styles.leftCard}>
        <Image src={'landing-page-images/browse.svg'} alt='browse products' width={600} height={600} />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod saepe possimus inventore quis, perferendis non maiores sint repellat, mollitia dolore officia ipsum eos incidunt unde ducimus distinctio aliquam quibusdam pariatur!</p>
      </motion.div>

      <motion.div
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y:0 , opacity: 1}}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className={styles.rightCard}>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod saepe possimus inventore quis, perferendis non maiores sint repellat, mollitia dolore officia ipsum eos incidunt unde ducimus distinctio aliquam quibusdam pariatur!</p>
        <Image src={'landing-page-images/charecteristics.svg'} alt='read reviews' width={600} height={600} />
      </motion.div>

      <motion.div
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className={styles.leftCard}>
        <Image src={'landing-page-images/refer.svg'} alt='refer friends' width={600} height={600} />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod saepe possimus inventore quis, perferendis non maiores sint repellat, mollitia dolore officia ipsum eos incidunt unde ducimus distinctio aliquam quibusdam pariatur!</p>
      </motion.div>

      <motion.div
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y:0 , opacity: 1}}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className={styles.rightCard}>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod saepe possimus inventore quis, perferendis non maiores sint repellat, mollitia dolore officia ipsum eos incidunt unde ducimus distinctio aliquam quibusdam pariatur!</p>
        <Image src={'landing-page-images/buy.svg'} alt='buy products' width={600} height={600} />
      </motion.div>
    </>



  )
}

export default LandingPage
