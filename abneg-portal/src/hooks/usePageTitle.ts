import { useEffect } from 'react';

/**
 * Custom hook to set the page title with ABNEG prefix
 * @param title - The page title (e.g., "Home", "Contact Us", "Payments")
 */
export const usePageTitle = (title: string) => {
  useEffect(() => {
    const fullTitle = `ABNEG - ${title}`;
    document.title = fullTitle;
    
    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = 'ABNEG';
    };
  }, [title]);
}; 