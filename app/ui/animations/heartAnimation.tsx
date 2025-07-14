import React, { useEffect } from "react";

export default function HeartsAnimation({ onComplete }: Readonly<{ onComplete: () => void }>) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500); // Animation duration
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent pointer-events-none">
      {[...Array(20)].map((_, i) => {
        const size = Math.random() * 2 + 2; // random size between 2rem and 4rem
        return (
          <span
            key={i}
            className="absolute animate-heart"
            style={{
              fontSize: `${size}rem`,
              top: `${Math.random() * 80 + 10}%`,
              left: "100%",
              animationDelay: `${i * 0.1}s`,
              color: `hsl(${Math.random() * 360},80%,70%)`,
            }}
          >
            ❤️
          </span>
        );
      })}
      <style jsx>{`
        .animate-heart {
          animation: heart-move 2s linear forwards;
        }
        @keyframes heart-move {
          from {
            left: 100%;
            opacity: 1;
            transform: scale(1) rotate(-10deg);
          }
          to {
            left: -10%;
            opacity: 0.2;
            transform: scale(1.5) rotate(20deg);
          }
        }
      `}</style>
    </div>
  );
}