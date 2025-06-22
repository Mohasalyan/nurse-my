import { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Check if at bottom (within 20px margin)
      const isBottom = Math.ceil(scrollTop + windowHeight) >= documentHeight - 20;
      setIsAtBottom(isBottom);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isAtBottom ? (
    <div className="end-indicator">
      End of page
    </div>
  ) : null;
};

export default Footer; 