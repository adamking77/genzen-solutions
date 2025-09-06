import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeContextState {
  theme: Theme;
  actualTheme: 'dark' | 'light';
  setTheme: (theme: Theme) => void;
}

const defaultContextState: ThemeContextState = {
  theme: 'system',
  actualTheme: 'light',
  setTheme: () => {},
};

const ThemeProviderContext = createContext<ThemeContextState>(defaultContextState);

export function ThemeProvider({ 
  children, 
  defaultTheme = 'system', 
  storageKey = 'astro-ui-theme' 
}: ThemeProviderProps) {
  // Initialize theme from localStorage or default
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      return (stored as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  // Calculate actual theme based on preference and system setting
  const [actualTheme, setActualTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'light';
    
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  });

  // Update theme handler
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
    }
  };

  // Apply theme to DOM and handle system changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateActualTheme = () => {
      let newActualTheme: 'dark' | 'light';
      
      if (theme === 'system') {
        newActualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        newActualTheme = theme;
      }

      // Update DOM
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(newActualTheme);
      root.setAttribute('data-theme', newActualTheme);
      
      setActualTheme(newActualTheme);
    };

    // Initial update
    updateActualTheme();

    // Listen for system theme changes when in system mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (theme === 'system') {
        updateActualTheme();
      }
    };

    if (theme === 'system') {
      mediaQuery.addEventListener('change', handleSystemChange);
      return () => mediaQuery.removeEventListener('change', handleSystemChange);
    }
  }, [theme]);

  const contextValue: ThemeContextState = {
    theme,
    actualTheme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider value={contextValue}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};