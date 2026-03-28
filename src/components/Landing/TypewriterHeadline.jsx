import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

const MM_FONTS = [
  'MyanmarKhyay',
  'MasterpieceYayChanZin',
  'MyanmarSansPro',
  'MyanmarAngoun',
  'MyanmarSabae',
];

const EN_FONTS = [
  'Inter',
  'SpaceGrotesk',
  'Oswald',
  'Orbitron',
];

const TYPING_SPEED = 25;
const DELETING_SPEED = 8;
const PAUSE_AFTER_TYPED = 900;
const PAUSE_AFTER_DELETED = 100;

export function TypewriterHeadline({ text }) {
  const { language } = useLanguage();
  const fonts = language === 'my' ? MM_FONTS : EN_FONTS;

  const [displayed, setDisplayed] = useState('');
  const [fontIndex, setFontIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  const currentFont = fonts[fontIndex];

  const tick = useCallback(() => {
    if (!isDeleting) {
      // Typing
      if (displayed.length < text.length) {
        setDisplayed(text.slice(0, displayed.length + 1));
        timeoutRef.current = setTimeout(tick, TYPING_SPEED);
      } else {
        // Finished typing → pause then start deleting
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
          timeoutRef.current = setTimeout(tick, DELETING_SPEED);
        }, PAUSE_AFTER_TYPED);
      }
    } else {
      // Deleting
      if (displayed.length > 0) {
        setDisplayed(text.slice(0, displayed.length - 1));
        timeoutRef.current = setTimeout(tick, DELETING_SPEED);
      } else {
        // Finished deleting → switch font, then start typing
        setIsDeleting(false);
        setFontIndex((prev) => (prev + 1) % fonts.length);
        timeoutRef.current = setTimeout(tick, PAUSE_AFTER_DELETED);
      }
    }
  }, [displayed, isDeleting, text, fonts]);

  // Reset when text or language changes
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    setDisplayed('');
    setFontIndex(0);
    setIsDeleting(false);
  }, [text, language]);

  // Start the loop
  useEffect(() => {
    timeoutRef.current = setTimeout(tick, PAUSE_AFTER_DELETED);
    return () => clearTimeout(timeoutRef.current);
  }, [tick]);

  return (
    <h1 className="typewriter-headline">
      <span
        className="typewriter-text"
        style={{ fontFamily: `'${currentFont}', sans-serif` }}
      >
        {displayed}
      </span>
      {/* <span className="typewriter-cursor" aria-hidden="true">|</span> */}
      {/* <span className="typewriter-font-label">{currentFont}</span> */}
    </h1>
  );
}
