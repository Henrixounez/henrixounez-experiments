import Link from 'next/link';
import { css } from '@emotion/css'
import tw from '@tailwindcssinjs/macro'
import { useState, useEffect } from 'react';

let lastScroll = 0;
let scrollWaiting = false;

export default function Header({currentPage}) {
  const [showHeader, setShowHeader] = useState(true);

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
    <div
      className={
        css(
          tw`p-2 fixed bg-white w-full duration-500`,
          `
            ${showHeader ? 
              'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);' :
              'transform: translateY(-5rem);'
            }
          `
        )
      }
    >
      <Link href='/'>
        <a className={css(tw`text-xl`, currentPage ? tw`font-normal` : tw`font-thin`)}>
          Henrixounez
        </a>
      </Link>
      {currentPage && (
        <span className={css(tw`text-xl font-thin`)}>
          &nbsp;| {currentPage}
        </span>
      )}
    </div>
  )
};