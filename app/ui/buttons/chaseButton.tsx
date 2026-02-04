"use client";
import React, { useEffect, useRef, useState } from "react";

export default function ChaseButton({ text, onSubmit }: Readonly<{ text: string; onSubmit: React.Dispatch<React.SetStateAction<boolean>> }>) {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const btnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const handler = (e: PointerEvent) => {
            const btn = btnRef.current;
            // If user clicked the button itself (and it hasn't been moved yet), allow normal behavior
            if (btn && btn.contains(e.target as Node) && !clicked) return;

            // Intercept other clicks: move the button to the click and trigger it
            e.preventDefault();
            e.stopPropagation();

            const x = e.clientX;
            const y = e.clientY;

            const btnW = btn?.offsetWidth ?? 120;
            const btnH = btn?.offsetHeight ?? 48;

            // Clamp so button stays fully inside viewport
            const clampedX = Math.max(btnW / 2, Math.min(globalThis.innerWidth - btnW / 2, x));
            const clampedY = Math.max(btnH / 2, Math.min(globalThis.innerHeight - btnH / 2, y));

            setPos({ x: clampedX, y: clampedY });
            setClicked(true);

            // Wait a tick so the fixed-positioned button is rendered, then animate and click it
            setTimeout(() => {
                const b = btnRef.current;
                if (!b) return;
                b.style.transition = "transform 160ms ease";
                b.style.transform = "translate(-50%, -50%) scale(1.12)";
                setTimeout(() => {
                    b.style.transform = "translate(-50%, -50%) scale(1)";
                    try {
                        b.click();
                    } catch {}
                }, 160);
            }, 20);
        };

        globalThis.addEventListener("pointerdown", handler, { capture: true });
        return () => globalThis.removeEventListener("pointerdown", handler, { capture: true } as any);
    }, [clicked]);

    return (
        <button
            ref={btnRef}
            style={
                clicked
                    ? {
                          position: "fixed",
                          left: pos.x,
                          top: pos.y,
                          transform: "translate(-50%,-50%)",
                          transition: "top 0.4s ease, left 0.4s ease, transform 160ms ease",
                          zIndex: 9999,
                          pointerEvents: "auto",
                      }
                    : {
                          transition: "transform 160ms ease",
                          zIndex: 9999,
                          pointerEvents: "auto",
                      }
            }
            className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg"
            onClick={() => {
                // default visual feedback — consumers can replace this component
                // setVisible(false);
                onSubmit(true);
            }}
        >
            <span className="text-lg">{text}</span>
        </button>
    );
}