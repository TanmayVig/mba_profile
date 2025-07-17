"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
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
          <div
            className={`text-lg sm:text-xl font-bold text-center mx-auto px-4 grid grid-cols-1 gap-8 font-sans story-timeline ${
              fadeIn ? "opacity-100" : "opacity-0"
            } w-full`}
            style={{ scrollBehavior: "smooth" }}
          >
            {/* babe G div */}
            <div className="flex flex-row items-center bg-white/80 rounded-xl shadow-lg p-4 border-l-4 border-emerald-400 story-step">
              <Image
                width={300}
                height={300}
                src={`https://${process.env.BLOB_HOSTNAME}/bg2.jpg`}
                alt="Babe G"
                className="flex-none w-32 xs:w-64 sm:w-72 md:w-80 lg:w-96 max-w-full h-auto block mx-auto my-4 rounded-lg border-2 border-emerald-200"
              />
              <p className="flex-1 m-2 text-emerald-900 text-left">
                Ye hai hmari Babe G❤️
              </p>
            </div>
            <div className="flex flex-row items-center bg-white/80 rounded-xl shadow-lg p-4 border-l-4 border-emerald-400 story-step">
              <p className="flex-1 mb-2 text-emerald-900 test-right">
                Aur ye hai inke Babe G👦🏻
              </p>
              <Image
                width={300}
                height={300}
                src={`https://${process.env.BLOB_HOSTNAME}/me.jpg`}
                alt="me"
                className="flex-none w-32 xs:w-64 sm:w-72 md:w-80 lg:w-96 max-w-full h-auto block mx-auto rounded-lg border-2 border-emerald-200"
              />
            </div>
            <div className="flex flex-col items-center bg-white/80 rounded-xl shadow-lg p-4 border-l-4 border-emerald-400 story-step">
              <p className="col-span-2 mt-3 text-left text-emerald-900">
                2 saal pehle, ye dono ko Idea bhi nhi tha ki aaj ke baad inki
                life kitni badalne vaali hai. <br />
              </p>
              <div className="flex justify-center w-full">
                <Image
                  width={100}
                  height={100}
                  src="/static/images/think.gif"
                  alt="thinking"
                  className="rounded-full border border-emerald-200"
                />
              </div>
            </div>
            <div className="flex flex-col items-center bg-white/80 rounded-xl shadow-lg p-4 border-l-4 border-emerald-400 story-step">
              <p className="text-left text-emerald-900">
                Do taarien milne pr jaise short circuit hota hai na ⚡⚡
              </p>
              <p className="text-left text-emerald-900">
                yaha bhi kuch aisa hi hua aur phir aag lagi.... you know ki ab
                kya krna hai
              </p>
              <div className="flex justify-center w-full">
                <Image
                  width={100}
                  height={100}
                  src="/static/images/bhaagoo.gif"
                  alt="Fire"
                  className="rounded-full border border-emerald-200"
                />
              </div>
            </div>
            <div className="flex flex-col items-center bg-white/80 rounded-xl shadow-lg p-4 border-l-4 border-emerald-400 story-step">
              <p className="m-7 text-left text-emerald-900">
                Is short circuit se in dono ko mila ek ...Partner in crime 🦹🏻‍♀️
                ...permanent best friend 👫 ...Lilly ko Marshal 🤭 ...and many
                more things that they never knew they needed.... par sabse
                zroori inko mila ek dusre ka saath ❤️
              </p>
            </div>
            <div className="flex flex-col items-end bg-white/80 rounded-xl shadow-lg p-4 border-l-4 border-emerald-400 story-step">
              <p className="col-span-2 text-right text-emerald-900">
                All I can say to my past self is..."It'sworth the wait!"
              </p>
            </div>
          </div>
          <style jsx>{`
            .story-step-wrapper {
              transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.4s;
            }
            .story-step-wrapper:focus-visible,
            .story-step-wrapper:focus,
            .story-step-wrapper.in-focus {
              transform: scale(1.08);
              z-index: 20;
              box-shadow: 0 8px 32px 0 rgba(34, 197, 94, 0.25),
                0 1.5px 6px 0 rgba(0, 0, 0, 0.1);
              outline: none;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}