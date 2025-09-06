// Simple theme toggle script
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButtons = document.querySelectorAll('.theme-toggle');
  
  // Get current theme
  const getTheme = () => {
    const stored = localStorage.getItem('astro-ui-theme');
    if (stored && stored !== 'system') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  
  // Apply theme to DOM
  const applyTheme = (theme) => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute('data-theme', theme);
  };
  
  // Initialize theme
  const currentTheme = getTheme();
  applyTheme(currentTheme);
  
  // Update toggle buttons visual state
  const updateToggleButtons = (theme) => {
    themeToggleButtons.forEach(button => {
      const isDark = theme === 'dark';
      button.setAttribute('aria-checked', isDark);
      button.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
      
      // Update classes for styling
      if (isDark) {
        button.classList.add('dark-mode');
        button.classList.remove('light-mode');
      } else {
        button.classList.add('light-mode');
        button.classList.remove('dark-mode');
      }
    });
  };
  
  // Set up toggle functionality
  themeToggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const current = getTheme();
      const newTheme = current === 'dark' ? 'light' : 'dark';
      
      localStorage.setItem('astro-ui-theme', newTheme);
      applyTheme(newTheme);
      updateToggleButtons(newTheme);
    });
  });
  
  // Initial button state update
  updateToggleButtons(currentTheme);
});