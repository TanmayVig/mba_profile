"use client";
import Image from "next/image";
import React from "react";

import Card from "@/app/ui/Card";
import RunButton from "./ui/buttons/RunButton";
import ChaseButton from "./ui/buttons/chaseButton";

export default function Home() {
  const [surprise, setSurprise] = React.useState(false);

  React.useEffect(() => {
    if (surprise) {
      alert(
        "Hello! My valentine❤️. Thank you for accepting the proposal. I love you so so so much Babe G!💐",
      );
    }
  }, [surprise]);
  return (
    <div className="flex flex-col items-center justify-center bg-rose-100 min-h-screen">
      {surprise ? (
        <Image
          src={
            "https://bzehms51fkes2tfe.public.blob.vercel-storage.com/surprised-the-office.gif"
          }
          alt="Surprised The Office GIF"
          width={400}
          height={400}
          className="absolute"
        />
      ) : (
        <Card>
          <div className="m-9">
            <h1 className="text-4xl font-bold text-rose-700">
              Hello Babe G.... will you be my valentine?💐
            </h1>
            <div className="flex flex-row items-center gap-96 justify-center h-full p-4 mt-2">
              <ChaseButton text="Yes" onSubmit={setSurprise} />
              <RunButton text="No" />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
