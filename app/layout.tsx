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
        className="bg-teal-200"
        style={{
          position: "relative",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
        }}
      >
        {/* Background color lilac (#C8A2C8) */}
        <div
          className="bg-teal-200"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
            filter: "blur(12px)",
            opacity: 0.7,
            pointerEvents: "none",
          }}
        />
        <ConfettiRouteWrapper />
        <div style={{ zIndex: 1, position: "sticky" }}>
          <Navbar />
        </div>
        <div
          className="container mx-auto px-4 py-8"
          style={{ position: "relative", zIndex: 1 }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
