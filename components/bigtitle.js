import { css } from '@emotion/css'
import tw from '@tailwindcssinjs/macro'
import mq from './breakpoints';

const BigTitle = ({children, height='0'}) => (
  <div
    className={
      css(
        tw`flex items-center justify-center`,
        `
          min-height: 60vh;
          ${mq[1]} {
            min-height: 70vh;
          }
        `
      )
    }
  >
    <h1
      className={
        css(
          tw`
            p-2 font-black text-center
            sm:text-5rem sm:leading-5rem
            lg:text-7rem lg:leading-7rem
          `,
          `
            font-size: 10vw;
            line-height: 10vw;
          `
        )
      }
    >
      {children}
    </h1>
  </div>
)

export default BigTitle;