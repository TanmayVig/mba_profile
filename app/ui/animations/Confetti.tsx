"use client";
import React, { useEffect, useRef } from "react";

const COLORS = ["#FFC700", "#FF0000", "#2E3192", "#41BBC7", "#7CFC00", "#FF69B4"];
const CONFETTI_COUNT = 60;

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

const Confetti: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      const conf = document.createElement("div");
      conf.className = "confetti-piece";
      conf.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      conf.style.left = `${randomBetween(0, 100)}vw`;
      conf.style.animationDelay = `${randomBetween(0, 2)}s`;
      conf.style.width = `${randomBetween(6, 12)}px`;
      conf.style.height = `${randomBetween(12, 20)}px`;
      conf.style.opacity = String(randomBetween(0.7, 1));
      container.appendChild(conf);
    }
  }, []);

  return <div ref={containerRef} className="confetti-container" style={{ pointerEvents: "none", position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 10 }} />;
};

export default Confetti;
