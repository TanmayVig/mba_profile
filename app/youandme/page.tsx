"use client";
import React, { useEffect, useState } from "react";
import HeartsAnimation from "@/app/ui/animations/heartAnimation";


export default function YouAndMePage() {
  const [showContent, setShowContent] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (showContent) {
      const timer = setTimeout(() => setFadeIn(true), 50); // slight delay for fade-in
      return () => clearTimeout(timer);
    }
  }, [showContent]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-2 relative">
      {!showContent && <HeartsAnimation onComplete={() => setShowContent(true)} />}
      {showContent && (
        <div
          className={`transition-opacity duration-700 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <p
            className={`text-lg sm:text-xl font-bold text-center fixed left-0 right-0 mx-auto px-4`}
            style={{
              top: fadeIn ? "96px" : "50%",
              maxWidth: "100vw",
              width: "100vw",
              wordBreak: "break-word",
              whiteSpace: "pre-line",
              overflowWrap: "break-word",
              transform: fadeIn ? "scale(1.2) translateY(0)" : "scale(1) translateY(-50%)",
              transition: "top 1s cubic-bezier(.4,0,.2,1), transform 1s cubic-bezier(.4,0,.2,1)",
              zIndex: 10,
            }}
          >
            {"Here's to many more years of love and happiness together!"}
          </p>
          <div className={`text-lg sm:text-xl font-bold text-center fixed left-0 right-0 mx-auto px-4 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
            <p>Babe G I love you!! and I would have to mean anything in this world... this will be that thing. Here's to us </p>
          </div>
        </div>
      )}
    </div>
  );
}