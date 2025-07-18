"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import HeartsAnimation from "@/app/ui/animations/heartAnimation";
import Deck from "@/app/ui/Deck";

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
    <div className="flex flex-col items-center justify-start min-h-[60vh] px-2 relative w-full">
      {!showContent && (
        <HeartsAnimation onComplete={() => setShowContent(true)} />
      )}
      {showContent && (
        <div
          className={`transition-opacity duration-700 ${
            fadeIn ? "opacity-100" : "opacity-0"
          } w-full`}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center break-words leading-tight text-emerald-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Ye hai hamari kahani 👨🏼‍🤝‍👩🏼
          </h1>
          <Deck scrollMode="vertical">
            {/* babe G div */}
            <div className="min-h-72  flex flex-row items-center bg-white/80 rounded-xl shadow-lg p-4 border-l-4 border-emerald-400 story-step">
              <Image
                width={100}
                height={100}
                src={`https://bzehms51fkes2tfe.public.blob.vercel-storage.com/bg2.jpg`}
                alt="Babe G"
                className="flex-none w-36 xs:w-32 sm:w-56 md:w-56 lg:w-56 max-w-full h-auto block mx-auto my-4 rounded-lg border-2 border-emerald-200"
              />
              <p className="flex-1 m-2 text-emerald-900 text-left">
                Ye hai hmari Babe G ❤️
              </p>
            </div>
            <div className="min-h-72  flex flex-row items-center bg-white/80 rounded-xl shadow-lg p-4 border-l-4 border-emerald-400 story-step">
              <p className="flex-1 mb-2 text-emerald-900 test-right">
                Aur ye hai inke Babe G 👦🏻
              </p>
              <Image
                width={200}
                height={200}
                src="https://bzehms51fkes2tfe.public.blob.vercel-storage.com/me.jpg"
                alt="me"
                className="flex-none w-32 xs:w-32 sm:w-56 md:w-56 lg:w-56 max-w-full h-auto block mx-auto rounded-lg border-2 border-emerald-200"
              />
            </div>
            <div className="min-h-72 flex flex-col items-center bg-white/80 rounded-xl shadow-lg p-4 border-l-4 border-emerald-400 story-step">
              <p className="col-span-2 mt-3 text-left text-emerald-900">
                2 saal pehle, ye dono ko Idea bhi nhi tha ki aaj ke baad inki
                life kitni badalne vaali hai. <br />
              </p>
              <div className="flex justify-center w-full">
                <Image
                  width={150}
                  height={150}
                  src="/static/images/think.gif"
                  alt="thinking"
                  className="rounded-full border border-emerald-200"
                />
              </div>
            </div>
            <div className="min-h-72 flex flex-col items-center bg-white/80 rounded-xl shadow-lg p-4 border-l-4 border-emerald-400 story-step">
              <p className="text-left text-emerald-900">
                Do taarien milne pr jaise short circuit hota hai na ⚡⚡
              </p>
              <p className="text-left text-emerald-900">
                yaha bhi kuch aisa hi hua aur phir aag lagi.... you know ki ab
                kya krna hai
              </p>
              <div className="flex justify-center w-full">
                <Image
                  width={200}
                  height={200}
                  src="/static/images/bhaagoo.gif"
                  alt="Fire"
                  className="rounded-full border border-emerald-200"
                />
              </div>
            </div>
            <div className="min-h-72  flex flex-col items-center bg-white/80 rounded-xl shadow-lg p-4 border-l-4 border-emerald-400 story-step">
              <p className="text-left text-emerald-900">
                Is short circuit se in dono ko mila ek ...Partner in crime 🦹🏻‍♀️
                ...permanent best friend 👫 ...Lilly ko Marshal 🤭 ...and many
                more things that they never knew they needed.... par sabse
                zroori inko mila ek dusre ka saath ❤️
              </p>
            </div>
            <div className="min-h-72  flex flex-col items-center bg-white/80 rounded-xl shadow-lg p-4 border-l-4 border-emerald-400 story-step">
              <p className="col-span-2 text-left text-emerald-900">
                All I can say to my past self is..."It's worth the wait!"
                <br />
                <br />
                aur agli slide mai usko dikhana chahunga!
              </p>
              <div className="flex justify-center w-full">
                <Image
                  width={100}
                  height={100}
                  src="/static/images/cat-cat-stare.gif"
                  alt="Fire"
                  className="rounded-full border border-emerald-200"
                />
              </div>
            </div>
            <div className="min-h-72 grid grid-cols-3 items-center bg-white/80 rounded-xl shadow-lg p-4 border-l-4 border-emerald-400 story-step">
              <p className="col-span-2 m-7 text-left text-emerald-900">
                khud hi dekh lo...👀
              </p>
              <iframe
                title="reel"
                src="https://drive.google.com/file/d/1KW_IeabJ2GHotkOVcdpzLA0hs2uJ1WkS/preview"
                width="320"
                height="640"
                allow="autoplay"
                className="flex-none max-w-full h-3/4 block mx-auto rounded-lg border-2 border-emerald-200"
              ></iframe>
            </div>
          </Deck>
        </div>
      )}
    </div>
  );
}