import { useEffect, useState } from "react";

export function checkDark() {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.querySelector('html').classList.add('dark')
  } else {
    document.querySelector('html').classList.remove('dark')
  }
}

export function toggleDark() {
  localStorage.theme = localStorage.theme === "light" ? "dark" : "light"
  checkDark();
}

export function isDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(localStorage.theme === "dark");
  }, []);

  function updateDark() {
    setIsDark(localStorage.theme === "dark");
  }

  return [isDark, updateDark];
}