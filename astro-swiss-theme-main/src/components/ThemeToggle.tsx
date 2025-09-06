import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider.tsx';

export function ThemeToggle() {
  const { actualTheme, setTheme } = useTheme();
  const isDark = actualTheme === 'dark';

  const handleToggle = () => {
    // Simple toggle between light and dark (no system mode from toggle)
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={cn(
        "relative inline-flex items-center justify-center w-[50px] h-[26px] rounded-full p-0.5 transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isDark ? "bg-slate-700" : "bg-slate-200"
      )}
    >
      <span className="sr-only">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
      
      {/* Sun Icon */}
      <span 
        aria-hidden="true" 
        className={cn(
          "absolute left-[4px] transition-opacity duration-300 ease-in-out",
          isDark ? "opacity-50" : "opacity-100"
        )}
      >
        <Sun className="w-4 h-4 text-slate-800 dark:text-slate-300" />
      </span>
      
      {/* Moon Icon */}
      <span 
        aria-hidden="true" 
        className={cn(
          "absolute right-[4px] transition-opacity duration-300 ease-in-out",
          isDark ? "opacity-100" : "opacity-50"
        )}
      >
        <Moon className="w-4 h-4 text-slate-800 dark:text-slate-300" />
      </span>
      
      {/* Toggle Slider */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block w-[20px] h-[20px] transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out",
          isDark ? "translate-x-[12px]" : "translate-x-[-12px]"
        )}
      />
    </button>
  );
}