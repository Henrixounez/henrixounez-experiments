import Head from 'next/head'
import { css } from '@emotion/css'
import tw from '@tailwindcssinjs/macro'
import Header from './header';

const Layout = ({children, title, showPage}) => (
  <div>
    <Head>
      <title>{title} | Henrixounez</title>
      <meta name="Description" content={title}/>
    </Head>
    <Header title={title} showPage={showPage}/>
    <main className={css(tw`flex flex-col justify-center items-center`)}>
      {children}
    </main>
  </div>
)
export default Layout;