import React from "react";
import SwipeButton from "@/app/ui/SwipeButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-2 relative">
      <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-center break-words leading-tight">
        Happy Anniversry to Us, BabeG!!
      </h1>
      <SwipeButton url="youandme" text="idhar dekho!❤️" />
    </div>
  );
}
