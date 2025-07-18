import React, { useRef, useEffect, useState } from "react";

interface DeckProps {
  children: React.ReactNode[];
  scrollMode?: 'vertical' | 'horizontal';
}

export default function Deck({ children, scrollMode = 'horizontal' }: DeckProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation (optional)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (scrollMode === 'vertical') {
        if (e.key === "ArrowDown" && current < children.length - 1) {
          setCurrent((c) => Math.min(c + 1, children.length - 1));
        } else if (e.key === "ArrowUp" && current > 0) {
          setCurrent((c) => Math.max(c - 1, 0));
        }
      } else {
        if (e.key === "ArrowRight" && current < children.length - 1) {
          setCurrent((c) => Math.min(c + 1, children.length - 1));
        } else if (e.key === "ArrowLeft" && current > 0) {
          setCurrent((c) => Math.max(c - 1, 0));
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, children.length, scrollMode]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-[60vh] w-full h-[420px] md:h-[520px] select-none"
      style={{ touchAction: scrollMode === 'vertical' ? 'pan-y' : 'pan-x' }}
    >
      {/* Up button */}
      {scrollMode === 'vertical' && (
        <button
          className="absolute w-36 top-2 left-1/2 -translate-x-1/2 z-30 bg-emerald-500 text-white rounded-full p-2 shadow-md disabled:opacity-40"
          onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
          disabled={current === 0}
          aria-label="Previous card"
        >
          ▲
        </button>
      )}
      {children.map((child, idx) => {
        let styleClass = '';
        let style: React.CSSProperties = { pointerEvents: idx === current ? "auto" : "none" };
        if (idx === current - 1) {
          // Previous card: left (or above)
          styleClass = scrollMode === 'vertical'
            ? 'z-20 scale-95 opacity-25 translate-x-[-50%] translate-y-[-70%]'
            : 'z-20 scale-95 opacity-25 translate-x-[-110%] translate-y-[-50%]';
        } else if (idx === current) {
          // Current card: center, fully opaque, with shadow
          styleClass ='z-30 scale-100 opacity-100 translate-x-[-50%] translate-y-[-50%] shadow-2xl bg-white';
        } else if (idx === current + 1) {
          // Next card: right (or below)
          styleClass = scrollMode === 'vertical'
            ? 'z-20 scale-95 opacity-25 translate-x-[-50%] translate-y-[-30%]'
            : 'z-20 scale-95 opacity-25 translate-x-[10%] translate-y-[-50%]';
        } else {
          styleClass = 'hidden';
        }
        return (
          <div
            key={idx}
            className={`absolute left-1/2 top-1/2 w-full max-w-xl transition-all duration-500 ease-in-out ${styleClass}`}
            style={style}
          >
            {child}
          </div>
        );
      })}
      {/* Down button */}
      {scrollMode === 'vertical' && (
        <button
          className="absolute w-36 bottom-2 left-1/2 -translate-x-1/2 z-30 bg-emerald-500 text-white rounded-full p-2 shadow-md disabled:opacity-40"
          onClick={() => setCurrent((c) => Math.min(c + 1, children.length - 1))}
          disabled={current === children.length - 1}
          aria-label="Next card"
        >
          ▼
        </button>
      )}
    </div>
  );
}
