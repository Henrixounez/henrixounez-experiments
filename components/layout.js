import Head from 'next/head'
import { css } from '@emotion/css'
import tw from '@tailwindcssinjs/macro'
import Header from './header';

const Layout = ({children, title, currentPage, description}) => (
  <div>
    <Head>
      <title>{title} | Henrixounez</title>
      <meta name="Description" content={description}/>
    </Head>
    <Header currentPage={currentPage}/>
    <main className={css(tw`flex flex-col justify-center items-center`)}>
      {children}
    </main>
  </div>
)
export default Layout;