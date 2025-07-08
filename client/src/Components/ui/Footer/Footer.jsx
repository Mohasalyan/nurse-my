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

  return (
    <footer className="footer">
      {isAtBottom && <div className="end-indicator">סוף העמוד</div>}
      <div className="disclaimer-container">
        <div className="disclaimer hebrew" dir="rtl">
          ⚠️ מערכת זו פותחה לצרכים לימודיים בלבד. המפתחים, צוות הקורס והמוסד האקדמי אינם נושאים באחריות לכל שימוש לא תקין, דליפת מידע או החלטה רפואית שגויה.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 