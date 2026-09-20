"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { totalCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#121316] border-b border-[#E2E4E8] dark:border-[#24272E] transition-colors duration-150">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between" aria-label="Main Navigation">
        {/* Brand Mark */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-8 h-8 border border-[#121316] dark:border-[#E2E4E8] rounded-[4px] flex items-center justify-center p-1.5 transition-transform duration-150 group-hover:-translate-y-0.5">
            {/* Geometric aperture icon (1.5px stroke) */}
            <svg viewBox="0 0 24 24" className="w-full h-full stroke-[#121316] dark:stroke-[#FFFFFF] fill-none stroke-[1.5]">
              <rect x="2" y="2" width="20" height="20" rx="2" />
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="7" x2="16" y2="10" />
              <line x1="16" y1="12" x2="14" y2="17" />
              <line x1="12" y1="17" x2="8" y2="14" />
              <line x1="8" y1="12" x2="10" y2="7" />
            </svg>
          </div>
          <span className="font-heading font-bold text-xl tracking-wider text-[#121316] dark:text-[#FFFFFF]">
            ALUVION
          </span>
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A505C] dark:text-[#C0C4CC]">
          <Link
            href="/specs"
            className="hover:text-[#121316] dark:hover:text-[#FFFFFF] transition-colors duration-150"
          >
            Specifications
          </Link>
          <Link
            href="/#included-kit"
            className="hover:text-[#121316] dark:hover:text-[#FFFFFF] transition-colors duration-150"
          >
            Included Kit
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-[#121316] dark:hover:text-[#FFFFFF] transition-colors duration-150"
          >
            Support
          </Link>
        </div>

        {/* Right Utility Cluster */}
        <div className="flex items-center gap-4">
          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="w-10 h-10 rounded-[4px] border border-[#E2E4E8] dark:border-[#2E323B] bg-[#F8F9FA] dark:bg-[#1A1C20] flex items-center justify-center text-[#121316] dark:text-[#FFFFFF] transition-transform duration-150 hover:-translate-y-0.5"
          >
            {theme === "light" ? (
              /* Moon SVG (max stroke 1.5px) */
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.5]">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              /* Sun SVG (max stroke 1.5px) */
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.5]">
                <circle cx="12" cy="12" r="4" />
                <line x1="12" y1="2" x2="12" y2="4" />
                <line x1="12" y1="20" x2="12" y2="22" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="2" y1="12" x2="4" y2="12" />
                <line x1="20" y1="12" x2="22" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          {/* Cart button with dynamic quantity badge */}
          <Link
            href="/cart"
            aria-label="Shopping Cart"
            className="relative w-10 h-10 rounded-[4px] border border-[#E2E4E8] dark:border-[#2E323B] bg-[#F8F9FA] dark:bg-[#1A1C20] flex items-center justify-center text-[#121316] dark:text-[#FFFFFF] transition-transform duration-150 hover:-translate-y-0.5"
          >
            {/* Cart SVG (max stroke 1.5px) */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.5]">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-[#121316] text-[#FFFFFF] dark:bg-[#FFFFFF] dark:text-[#121316] text-[10px] font-bold rounded-[4px] flex items-center justify-center border border-white dark:border-[#121316]">
                {totalCount}
              </span>
            )}
          </Link>

          {/* Action Button: Order Now */}
          <Link
            href="/products/pocket-4k"
            className="hidden sm:inline-flex btn-solid btn-solid-primary px-5 py-2.5 text-xs tracking-wider uppercase font-semibold"
          >
            Order Now
          </Link>

          {/* Mobile menu toggle button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-[4px] border border-[#E2E4E8] dark:border-[#2E323B] bg-[#F8F9FA] dark:bg-[#1A1C20] flex items-center justify-center text-[#121316] dark:text-[#FFFFFF]"
            aria-label="Toggle Navigation Menu"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.5]">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Panel (Clean 1px border lines, no bounce animation) */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E2E4E8] dark:border-[#24272E] bg-white dark:bg-[#121316] px-6 py-6 space-y-4">
          <Link
            href="/specs"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-medium text-[#121316] dark:text-[#FFFFFF] border-b border-[#E2E4E8] dark:border-[#24272E]"
          >
            Specifications
          </Link>
          <Link
            href="/#included-kit"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-medium text-[#121316] dark:text-[#FFFFFF] border-b border-[#E2E4E8] dark:border-[#24272E]"
          >
            Included Kit
          </Link>
          <Link
            href="/privacy-policy"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-medium text-[#121316] dark:text-[#FFFFFF] border-b border-[#E2E4E8] dark:border-[#24272E]"
          >
            Support
          </Link>
          <div className="pt-2">
            <Link
              href="/products/pocket-4k"
              onClick={() => setMobileOpen(false)}
              className="w-full btn-solid btn-solid-primary py-3 text-xs tracking-wider uppercase font-semibold text-center block"
            >
              Order Pocket 4K ($27.00)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
