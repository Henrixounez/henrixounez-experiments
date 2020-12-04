import { css } from '@emotion/react';
import Link from 'next/link';
import xw from 'xwind';

const Drawer = ({isOpen, links}) => (
  <div css={[xw`fixed bg-white duration-1000 w-full pt-16 overflow-hidden z-10`, css`${isOpen ? 'height: 100vh;' : 'transform: translateY(-100px); height: 0vh;'}`]}>
    <div css={[xw`duration-1000 flex flex-col items-center`, css`${isOpen ? 'opacity: 1;' : 'opacity: 0;'}`]}>
      {
        links.map((e, i) => (
          <Link key={i} href={e.link}>
            <a css={xw`text-xl font-bold py-3`}>
              {e.name}
            </a>
          </Link>  
        ))
      }
    </div>
  </div>
)

export default Drawer