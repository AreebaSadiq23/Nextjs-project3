// components/DynamicBackground.tsx
'use client'

import React, { useState } from 'react';

const themes = [
  { name: 'Party Decorations', background: 'url(/images/party-decorations.jpg)' },
  { name: 'Colorful Gradient', background: 'linear-gradient(to right, #FF6B6B, #FFD93D)' },
  { name: 'Confetti', background: 'url(/images/confetti.jpg)' }
];

const DynamicBackground: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  const changeTheme = (theme: typeof themes[0]) => {
    setCurrentTheme(theme);
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: currentTheme.background }}
    >
      <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
        <h1 className="text-4xl font-bold text-white mb-4">Happy Birthday!</h1>
        <button
          onClick={() => changeTheme(themes[0])}
          className="bg-white text-black p-2 rounded mb-2"
        >
          Party Decorations
        </button>
        <button
          onClick={() => changeTheme(themes[1])}
          className="bg-white text-black p-2 rounded mb-2"
        >
          Colorful Gradient
        </button>
        <button
          onClick={() => changeTheme(themes[2])}
          className="bg-white text-black p-2 rounded"
        >
          Confetti
        </button>
      </div>
    </div>
  );
};

export default themes;
