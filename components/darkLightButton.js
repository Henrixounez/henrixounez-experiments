import xw from 'xwind';

import { isDark, toggleDark } from './dark_fn';
import boldTransitionBefore from './boldtexttransition';

export default function DarkLightButton() {
  const [dark, updateDark] = isDark();

  return (
    <button
      onClick={() => {
        toggleDark();
        updateDark();
      }}
      css={[xw`cursor-pointer text-xl font-semibold hover:font-bold duration-200 px-2`, boldTransitionBefore("Dark", "900")]}
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
