import Link from 'next/link'
import { css } from '@emotion/css'
import tw from '@tailwindcssinjs/macro'
import boldTransitionBefore from './boldtexttransition';

const LinkList = ({list}) => (
  <div className={css(tw`container max-w-full`, `width: 1280px;`)}>
    {
      list.map((link, i) => (
        <div key={i} className={css(tw`flex flex-row`)}>
          <h1 className={css(tw`text-3xl font-light`)}>
            {link.icon} |&nbsp;
          </h1>
          <div className={css(tw`flex flex-col items-start`)}>
            {link.intra ? (
              <Link href={link.link}>
                <a className={css(tw`text-3xl font-medium hover:font-bold duration-200`, boldTransitionBefore(link.name, "700"))}>
                  {link.name}
                </a>
              </Link>
            ) : (
              <a href={link.link} className={css(tw`text-3xl font-medium hover:font-bold duration-200`, boldTransitionBefore(link.name, "700"))}>
                {link.name}
              </a>
            )}
            <h2 className={css(tw`text-base pt-2 text-gray-500`)}>
              {link.description}
            </h2>
          </div>
        </div>
      ))
    }
  </div>
)

export default LinkList;