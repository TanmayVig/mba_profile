'use client';
import { useEffect, useState } from 'react';

export default function RunButton({text}: Readonly<{text:string}>) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    const button = document.getElementById('run-button');
    if (button) {
      const buttonRect = button.getBoundingClientRect();
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;

      const distanceX = e.clientX - buttonCenterX;
      const distanceY = e.clientY - buttonCenterY;

      const distance = Math.hypot(distanceX, distanceY);

      if (distance < 100) {
        const newTop = Math.max(0, Math.random() * 200)%window.outerHeight;
        const newLeft = Math.max(0, Math.random() * 200)%window.outerWidth;

        // Smoothly transition to the new position
        button.style.transition = 'top 1s ease, left 1s ease';
        setPosition({
          top: newTop,
          left: newLeft,
        });
      }
    }
  };

  useEffect(() => {
    globalThis.addEventListener('mousemove', handleMouseMove);
    return () => {
      globalThis.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="flex justify-center" style={{ position: 'relative', top: position.top, left: position.left }}>
      <button
        id="run-button"
        className={`bg-red-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95 ${isHovered ? 'scale-25' : 'scale-100'} `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={true} // Disable the button to prevent clicks
      >
        <span className="text-lg">{text}</span>
      </button>
    </div>
  );
}