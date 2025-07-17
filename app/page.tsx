"use client";
import React, { useRef } from "react";
import Image from "next/image";
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
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-2 items-center justify-center place-content-stretch relative z-10">
        {/* Image Section */}
        <div className="flex justify-center items-center min-h-[180px]">
          <img
            src={`https://bzehms51fkes2tfe.public.blob.vercel-storage.com/home.png`}
            alt="Home Illustration"
            width={300}
            height={300}
          />
        </div>
        {/* Text Section */}
        <div className="flex flex-col justify-center items-center col-span-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center break-words leading-tight text-emerald-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Happy Anniversry to Us, BabeG!!
          </h1>
          <div className="flex justify-center m-3 col-span-3">
            <SwipeButton
              url="youandme"
              text="Idhar dekho!❤️"
              onSwipe={handleSwipeWithAnimation}
            />
          </div>
        </div>
        {/* Button centered below both sections */}
        <div className="flex justify-center items-center min-h-[100px] col-span-1 md:col-span-3">
          <img
            src="/static/images/shinchan_dance.webp"
            alt="Happy Dance 1"
            className="h-44"
          />
        </div>
      </div>
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
