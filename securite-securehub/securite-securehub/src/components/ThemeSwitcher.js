import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    localStorage.getItem('theme') === 'dark-mode'
  );

  useEffect(() => {
    const newTheme = isDarkMode ? 'dark-mode' : 'light-mode';
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  }, [isDarkMode]);

  return (
    <button 
      onClick={() => setIsDarkMode(!isDarkMode)} 
      style={{ fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer', color: 'black' }} // Ajout de la couleur noire
    >
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeSwitcher;
