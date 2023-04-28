import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout/Layout'
import { SessionProvider } from "next-auth/react";
import { Session } from 'next-auth';

interface Props {
  session? : Session
}

export default function App({ Component, pageProps }: AppProps<Props>) {
  return (
    <SessionProvider session={pageProps.session}>
    <Layout>
    <Component {...pageProps} />
    </Layout>
    </SessionProvider>
  )
}
