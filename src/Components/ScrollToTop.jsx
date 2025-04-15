import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [pathname, scrollToTop]);

  return null;
}

export default ScrollToTop;
