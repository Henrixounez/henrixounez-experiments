import Head from 'next/head'
import xw from 'xwind';
import Header from './header';

const Layout = ({children, title, showPage}) => (
  <div>
    <Head>
      <title>{title} | Henrixounez</title>
      <meta name="Description" content={title}/>
    </Head>
    <Header title={title} showPage={showPage}/>
    <main css={xw`py-20 flex flex-col justify-center items-center max-w-full`}>
      {children}
    </main>
  </div>
)
export default Layout;