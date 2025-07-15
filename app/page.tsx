"use client";
import React, { useRef } from "react";
import SwipeButton from "@/app/ui/SwipeButton";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  function handleSwipeWithAnimation(url: string) {
    if (containerRef.current) {
      containerRef.current.classList.add("slide-left");
      setTimeout(() => {
        window.location.href = `/${url}`;
      }, 500); // match animation duration
    }
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-[60vh] px-2 relative transition-all duration-500"
      style={{ willChange: "transform, opacity" }}
    >
      <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-center break-words leading-tight">
        Happy Anniversry to Us, BabeG!!
      </h1>
      <SwipeButton
        url="youandme"
        text="idhar dekho!❤️"
        onSwipe={handleSwipeWithAnimation}
      />
      <style jsx global>{`
        .slide-left {
          transform: translateX(-100vw) !important;
          opacity: 0.5 !important;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
      `}</style>
    </div>
  );
}
