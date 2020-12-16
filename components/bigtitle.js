import { css } from '@emotion/react';
import xw from 'xwind';
import mq from './breakpoints';

const BigTitle = ({children, height=70}) => (
  <div
    css={[
      xw`flex items-center justify-center`,
      css`
        min-height: ${height - 10}vh;
        ${mq[1]} {
          min-height: ${height}vh;
        }
      `
    ]}
  >
    <h1
      css={[
        xw`
          p-2 font-black text-center
          sm:text-5rem sm:leading-5rem
          lg:text-7rem lg:leading-7rem
        `, css`
          font-size: 10vw;
          line-height: 10vw;
        `
      ]}
    >
      {children}
    </h1>
  </div>
)

export default BigTitle;