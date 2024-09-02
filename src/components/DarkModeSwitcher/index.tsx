import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DarkmodeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      window.document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const handleClick = () => {
    if (isDarkMode) {
      window.document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
      window.document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      className="text-gray-400 hover:bg-slate-200 p-1 mx-2 flex items-center justify-center rounded-md dark:hover:bg-slate-800"
      onClick={handleClick}
      aria-label={`Toggle ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
}
