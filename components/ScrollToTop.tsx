"use client";

import React, { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-40 w-[44px] h-[44px] rounded-[4px] bg-[#FFFFFF] dark:bg-[#1A1C20] border border-[#121316] dark:border-[#E2E4E8] text-[#121316] dark:text-[#FFFFFF] flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_#121316] dark:hover:shadow-[2px_2px_0px_#E2E4E8]"
    >
      {/* Upward geometric SVG arrow with 1.5px stroke */}
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 stroke-current fill-none stroke-[1.5]"
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}
