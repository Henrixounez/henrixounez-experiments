import Link from 'next/link'
import { css } from '@emotion/css'
import tw from '@tailwindcssinjs/macro'

import Layout from '../components/layout'
import BigTitle from '../components/bigtitle'

const pages = [
  {link: '/spacetracker', name: 'Space Tracker', description: 'Space events calendar', emoji: '🚀'}
]

const Index = () => (
  <Layout title='Home'>
    <BigTitle height='70'>
      Welcome to<br/>
      Henrixounez<br/>
      Experiments
    </BigTitle>
    <div className={css(tw`container`)}>
      {
        pages.map((page, i) => (
          <div key={i} className={css(tw`flex flex-row`)}>
            <h1 className={css(tw`text-3xl font-light`)}>
              {page.emoji} |&nbsp;
            </h1>
            <div className={css(tw`flex flex-col items-start`)}>
              <Link href={page.link}>
                <a className={css(tw`text-3xl font-medium hover:font-bold duration-200`)}>
                  {page.name}
                </a>
              </Link>
              <h2 className={css(tw`text-base pt-2 text-gray-500`)}>
                {page.description}
              </h2>
            </div>
          </div>
        ))
      }
    </div>
  </Layout>
)

export default Index
