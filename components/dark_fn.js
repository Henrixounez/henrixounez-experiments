import { useEffect, useState } from "react";

export function checkDark() {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.querySelector('html').classList.add('dark')
  } else {
    document.querySelector('html').classList.remove('dark')
  }
}

export function setTheme(theme) {
  localStorage.theme = theme;
  window.dispatchEvent(new Event('storage'));
  checkDark();
}

export function maybeForceDark() {
  if (localStorage.theme === undefined) {
    setTheme('dark');
  }
}

export function toggleDark() {
  setTheme(localStorage.theme === "light" ? "dark" : "light");
}

export function isDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(localStorage.theme === "dark");
    window.addEventListener('storage', updateDark, false);
    return () => {
      window.removeEventListener('storage', updateDark);
    }
  }, []);

  function updateDark() {
    setIsDark(localStorage.theme === "dark");
  }

  return [isDark, updateDark];
}