import Link from 'next/link';
import { css } from "@emotion/css";
import tw from '@tailwindcssinjs/macro';

const Drawer = ({isOpen, links}) => (
  <div className={css(tw`fixed bg-white duration-1000 w-full pt-16 overflow-hidden`, `${isOpen ? 'height: 100vh;' : 'height: 0vh;'}`)}>
    <div className={css(tw`duration-1000 flex flex-col items-center`, `${isOpen ? 'opacity: 1;' : 'opacity: 0;'}`)}>
      {
        links.map((e, i) => (
          <Link key={i} href={e.link}>
            <a className={css(tw`text-xl font-bold py-3`)}>
              {e.name}
            </a>
          </Link>  
        ))
      }
    </div>
  </div>
)

export default Drawer