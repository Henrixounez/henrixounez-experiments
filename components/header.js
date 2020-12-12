import { useState, useEffect } from 'react';
import Link from 'next/link';
import xw from 'xwind';
import Drawer from './drawer';
import Burger from './burger';
import boldTransitionBefore from './boldtexttransition';
import { css } from '@emotion/react';
import DarkLightButton from './darkLightButton';

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
        css={[
          xw`p-2 fixed w-full duration-500 flex flex-row justify-center items-center z-10`,
          css`
            ${drawerOpen || showHeader ? 
              // 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);' :
              '' :
              'transform: translateY(-5rem);'
            }
          `
        ]}
      >
        <div css={[xw`max-w-full flex flex-row justify-between items-center`, css`width: 1280px`]}>
          <div>
            <Link href='/'>
              <a css={[xw`cursor-pointer text-xl hover:font-semibold duration-200`, showPage ? xw`font-normal` : xw`font-thin`, boldTransitionBefore("Henrixounez", "600")]}>
                Henrixounez
              </a>
            </Link>
            {showPage && (
              <span css={xw`text-xl font-thin`}>
                &nbsp;| {title}
              </span>
            )}
          </div>
          <div css={xw`flex flex-row items-center justify-center`}>
            <Burger open={drawerOpen} setOpen={setDrawerOpen}/>
            {!drawerOpen && (
              <div css={xw`hidden md:block`}>
                {
                  links.map((e, i) => (
                    <Link key={i} href={e.link}>
                      <a css={[xw`cursor-pointer text-xl font-semibold hover:font-bold duration-200 px-2`, boldTransitionBefore(e.name, "700")]}>
                        {e.name}
                      </a>
                    </Link>
                  ))
                }
                <DarkLightButton/>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
};