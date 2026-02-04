"use client";
import { usePathname } from "next/navigation";
import Confetti from "@/app/ui/animations/Confetti";
import React, { useEffect, useState } from "react";

const ConfettiRouteWrapper = () => {
  const pathname = usePathname();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (pathname === "/anniversary") {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 10000);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [pathname]);

  if (pathname !== "/anniversary" || !show) return null;
  return <Confetti />;
};

export default ConfettiRouteWrapper;
