import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function SimpleThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Get initial theme
    const stored = localStorage.getItem('astro-ui-theme');
    const isDark = stored === 'dark' || 
                  (stored === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
                  (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Update localStorage
    localStorage.setItem('astro-ui-theme', newTheme);
    
    // Update DOM
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center justify-center w-[50px] h-[26px] rounded-full p-0.5 transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        isDark ? 'bg-slate-700' : 'bg-slate-200'
      }`}
    >
      <span className="sr-only">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
      
      {/* Sun Icon */}
      <span 
        className={`absolute left-[4px] transition-opacity duration-300 ease-in-out ${
          isDark ? 'opacity-50' : 'opacity-100'
        }`}
      >
        <Sun className="w-4 h-4 text-slate-800 dark:text-slate-300" />
      </span>
      
      {/* Moon Icon */}
      <span 
        className={`absolute right-[4px] transition-opacity duration-300 ease-in-out ${
          isDark ? 'opacity-100' : 'opacity-50'
        }`}
      >
        <Moon className="w-4 h-4 text-slate-800 dark:text-slate-300" />
      </span>
      
      {/* Toggle Slider */}
      <span
        className={`pointer-events-none inline-block w-[20px] h-[20px] transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out ${
          isDark ? 'translate-x-[12px]' : 'translate-x-[-12px]'
        }`}
      />
    </button>
  );
}