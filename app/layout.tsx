import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/app/ui/Navbar";
import ConfettiRouteWrapper from "@/app/ui/ConfettiRouteWrapper";

export const metadata: Metadata = {
  title: 'Our page',
  description: 'Happy Anniversry'
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
      // style={{
      //   position: "relative",
      //   minHeight: "100vh",
      //   margin: 0,
      //   padding: 0,
      // }}
      >
        {/* Background color lilac (#C8A2C8) */}
        <div
          className="bg-rose-100"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
            opacity: 0.7,
            pointerEvents: "none",
          }}
        />
        <ConfettiRouteWrapper />
        <div style={{ zIndex: 2, position: "sticky", top: 0 }}>
          <Navbar />
        </div>
        <div
          className="container mx-auto px-4 py-8"
          style={{ position: "relative", zIndex: 1 }}
        >
          {children}
        </div>
        {/* Top-left decorative orchid image (below navbar) */}

        {/* Bottom-right decorative orchid image */}
        {/* <img
          src="/static/images/orchid.png"
          alt="Orchid Bottom Right"
          className="fixed bottom-0 right-0 w-24 sm:w-32 md:w-40 opacity-80 z-10 pointer-events-none select-none"
          style={{ transform: "translate(20%, 20%) rotate(180deg)" }}
        /> */}
      </body>
    </html>
  );
}
