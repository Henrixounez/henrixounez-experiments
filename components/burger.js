import { css } from '@emotion/css';
import styled from '@emotion/styled';
import tw from '@tailwindcssinjs/macro';

const burgerLine = `
  height: 1px;
  width: 25px;
  border-radius: 2.5px;
  background-color: black;
  content: "";
  display: block;
  transition: 200ms;
`

const BurgerButton = styled('div')`
  ${burgerLine}
  ${({open}) => open ? `
    background-color: transparent;
    transform: rotate(45deg);
  ` : `
    transform: rotate(0deg);
  `}
  &:before {
    ${burgerLine}
    position: absolute;
    ${({open}) => open ? `
      transform: translateY(0px) rotate(0deg);
    ` : `
      transform: translateY(-8px) rotate(0deg);
    `}
  }
  &:after {
    ${burgerLine}
    position: absolute;
    ${({open}) => open ? `
      transform: translateY(0px) rotate(-90deg);
    ` : `
      transform: translateY(8px) rotate(0deg);
    `}
  }
`;

const Burger = ({open, setOpen}) => (
  <div className={css(tw`md:hidden flex items-center justify-center cursor-pointer`, `height:30px; width: 30px;`)} onClick={() => setOpen(!open)}>
    <BurgerButton open={open}/>
  </div>
)

export default Burger;