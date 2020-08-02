import { useState, useEffect } from 'react';
import Link from 'next/link';
import { css } from '@emotion/css';
import tw from '@tailwindcssinjs/macro';
import Drawer from './drawer';
import Burger from './burger';

const links = [
  {link: '/about', name: 'About'},
];

let lastScroll = 0;
let scrollWaiting = false;

export default function Header({title, showPage}) {
  const [showHeader, setShowHeader] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  });
  const handleScroll = () => {
    if (scrollWaiting) return;
    const scrollDown = window.pageYOffset < lastScroll;
    lastScroll = window.pageYOffset;
    if (scrollDown === showHeader)
      return;
    setShowHeader(scrollDown);
    scrollWaiting = true;
    setTimeout(() => {
      scrollWaiting = false;
    }, 50);
  }

  return (
    <>
      <Drawer links={links} isOpen={drawerOpen}/>
      <div
        className={
          css(
            tw`p-2 fixed bg-white w-full duration-500 flex flex-row justify-between items-center`,
            `
              ${drawerOpen || showHeader ? 
                'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);' :
                'transform: translateY(-5rem);'
              }
            `
          )
        }
      >
        <div>
          <Link href='/'>
            <a className={css(tw`text-xl hover:font-semibold duration-200`, showPage ? tw`font-normal` : tw`font-thin`)}>
              Henrixounez
            </a>
          </Link>
          {showPage && (
            <span className={css(tw`text-xl font-thin`)}>
              &nbsp;| {title}
            </span>
          )}
        </div>
        <div className={css(tw`flex flex-row items-center justify-center`)}>
          <Burger open={drawerOpen} setOpen={setDrawerOpen}/>
          {!drawerOpen && (
            <div className={css(tw`hidden md:block`)}>
              {
                links.map((e, i) => (
                  <Link key={i} href={e.link}>
                    <a className={css(tw`text-xl font-normal hover:font-semibold duration-200 px-2`)}>
                      {e.name}
                    </a>
                  </Link>
                ))
              }
            </div>
          )}
        </div>
      </div>
    </>
  )
};