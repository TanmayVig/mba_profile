"use client";
import { useRouter } from "next/navigation";

export default function SwipeButton({
  url,
  text,
  onSwipe,
}: Readonly<{
  url: string;
  text: string;
  onSwipe?: (url: string) => void;
}>) {
  const router = useRouter();

  function handleSwipe() {
    if (onSwipe) {
      onSwipe(url);
    } else {
      router.push(`/${url}`);
    }
  }

  return (
    <div className="flex justify-center">
      <button
        className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95"
        onPointerDown={handleSwipe}
      >
        <span className="text-lg">{text}</span>
      </button>
    </div>
  );
}