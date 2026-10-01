import { useState, useEffect, useCallback } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const handleSync = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    window.addEventListener('theme-changed', handleSync);
    window.addEventListener('storage', handleSync);

    // Also observe class mutations on html element
    const observer = new MutationObserver(handleSync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('theme-changed', handleSync);
      window.removeEventListener('storage', handleSync);
      observer.disconnect();
    };
  }, []);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const nextDark = !root.classList.contains('dark');
    if (nextDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setIsDark(nextDark);
    window.dispatchEvent(new Event('theme-changed'));
  }, []);

  return { isDark, toggle };
}

