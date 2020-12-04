import { css } from '@emotion/react';
import Link from 'next/link'
import xw from 'xwind';
import boldTransitionBefore from './boldtexttransition';

const LinkList = ({list}) => (
  <div css={[xw`container max-w-full`, css`width: 1280px;`]}>
    {
      list.map((link, i) => (
        <div key={i} css={xw`flex flex-row`}>
          <h1 css={xw`text-3xl font-light`}>
            {link.icon} |&nbsp;
          </h1>
          <div css={xw`flex flex-col items-start`}>
            {link.intra ? (
              <Link href={link.link}>
                <a css={[xw`cursor-pointer text-3xl font-medium hover:font-bold duration-200`, boldTransitionBefore(link.name, "700")]}>
                  {link.name}
                </a>
              </Link>
            ) : (
              <a href={link.link} css={[xw`cursor-pointer text-3xl font-medium hover:font-bold duration-200`, boldTransitionBefore(link.name, "700")]}>
                {link.name}
              </a>
            )}
            <h2 css={xw`text-base pt-2 text-gray-500`}>
              {link.description}
            </h2>
          </div>
        </div>
      ))
    }
  </div>
)

export default LinkList;