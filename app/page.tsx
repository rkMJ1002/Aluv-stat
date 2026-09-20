"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HardwareBreakdown from "@/components/HardwareBreakdown";
import ColorwaySelector from "@/components/ColorwaySelector";
import AccessoriesGrid from "@/components/AccessoriesGrid";
import QuickSpecsTable from "@/components/QuickSpecsTable";
export default function HomePage() {
  return (
    <div className="w-full">
      {/* SECTION 1: HERO BLOCK (60% image stage, 40% text content) */}
      <section
        aria-labelledby="hero-heading"
        className="w-full py-16 md:py-24 border-b border-[#E2E4E8] dark:border-[#24272E]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* 40% Text Content (Col 1-5) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Solid color only, Outfit Bold, no gradient fill */}
              <h1
                id="hero-heading"
                className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-5xl tracking-tight text-[#121316] dark:text-[#FFFFFF] leading-[1.12]"
              >
                Tactile 4K Imaging in Your Pocket.
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-[#4A505C] dark:text-[#C0C4CC] leading-relaxed">
                48 megapixels, 180-degree flip display, and a 140g portable chassis built for everyday photography.
              </p>

              {/* Primary & Secondary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/products/pocket-4k"
                  className="btn-solid btn-solid-primary px-7 py-4 text-xs font-semibold tracking-wider uppercase text-center"
                >
                  Shop Pocket 4K ($27.00)
                </Link>
                <Link
                  href="/specs"
                  className="btn-solid btn-outline px-7 py-4 text-xs font-semibold tracking-wider uppercase text-center"
                >
                  View Full Specifications
                </Link>
              </div>

              {/* Warranty indicator */}
              <div className="pt-4 border-t border-[#E2E4E8] dark:border-[#2E323B] flex items-center justify-start text-xs font-mono text-[#4A505C] dark:text-[#C0C4CC]">
                <span className="font-semibold text-[#121316] dark:text-[#FFFFFF]">1-YEAR WARRANTY</span>
              </div>
            </div>

            {/* 60% Image Stage (Col 6-12) */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/11] w-full aluvion-card overflow-hidden p-4 sm:p-8 flex items-center justify-center">
                <Image
                  src="/assets/camera-real-white.jpg"
                  alt="Aluvion Pocket 4K with 180-degree flip display raised"
                  fill
                  priority
                  className="object-contain p-4"
                />
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-[#4A505C] dark:text-[#C0C4CC] bg-white/80 dark:bg-[#121316]/80 backdrop-blur-sm px-3 py-1.5 rounded-[4px] border border-[#E2E4E8] dark:border-[#2E323B]">
                  <span>180° VERTICAL FLIP HINGE</span>
                  <span>PEARL WHITE / BLUSH PINK / OBSIDIAN BLACK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HARDWARE ARCHITECTURE AND DIMENSION MATRIX */}
      <section
        aria-labelledby="architecture-heading"
        className="w-full py-16 md:py-24 border-b border-[#E2E4E8] dark:border-[#24272E] bg-[#F8F9FA]/40 dark:bg-[#1A1C20]/40"
      >
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#4A505C] dark:text-[#C0C4CC]">
              Section 02 / Structural Engineering
            </div>
            <h2
              id="architecture-heading"
              className="font-heading font-bold text-3xl sm:text-4xl text-[#121316] dark:text-[#FFFFFF]"
            >
              Hardware Architecture and Dimension Matrix
            </h2>
            <p className="text-sm text-[#4A505C] dark:text-[#C0C4CC]">
              Precision component placement within a 117 mm by 64 mm by 29 mm footprint, delivering robust handheld ergonomics at only 140 grams.
            </p>
          </div>

          <HardwareBreakdown />
        </div>
      </section>

      {/* SECTION 3: COLORWAY SELECTOR PREVIEW */}
      <section
        aria-labelledby="colorway-heading"
        className="w-full py-16 md:py-24 border-b border-[#E2E4E8] dark:border-[#24272E]"
      >
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#4A505C] dark:text-[#C0C4CC]">
              Section 03 / Material Execution
            </div>
            <h2
              id="colorway-heading"
              className="font-heading font-bold text-3xl sm:text-4xl text-[#121316] dark:text-[#FFFFFF]"
            >
              Three Dedicated Colorway Finishes
            </h2>
            <p className="text-sm text-[#4A505C] dark:text-[#C0C4CC]">
              Each chassis is fitted with an aircraft-grade aluminum alloy optical bezel, coupled with impact-resistant matte or metallic casing.
            </p>
          </div>

          <ColorwaySelector />
        </div>
      </section>

      {/* SECTION 4: INCLUDED ACCESSORIES CHECKLIST */}
      <section
        id="included-kit"
        aria-labelledby="kit-heading"
        className="w-full py-16 md:py-24 border-b border-[#E2E4E8] dark:border-[#24272E] bg-[#F8F9FA]/40 dark:bg-[#1A1C20]/40"
      >
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#4A505C] dark:text-[#C0C4CC]">
              Section 04 / Complete Inventory
            </div>
            <h2
              id="kit-heading"
              className="font-heading font-bold text-3xl sm:text-4xl text-[#121316] dark:text-[#FFFFFF]"
            >
              Included Starter Kit Inventory
            </h2>
            <p className="text-sm text-[#4A505C] dark:text-[#C0C4CC]">
              Every box ships with the necessary hardware, memory, charging cables, and adapters to record immediately.
            </p>
          </div>

          <AccessoriesGrid />
        </div>
      </section>

      {/* SECTION 5: TECHNICAL QUICK-REFERENCE TABLE */}
      <section
        aria-labelledby="specs-heading"
        className="w-full py-16 md:py-24 border-b border-[#E2E4E8] dark:border-[#24272E]"
      >
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#4A505C] dark:text-[#C0C4CC]">
              Section 05 / Metric Comparison
            </div>
            <h2
              id="specs-heading"
              className="font-heading font-bold text-3xl sm:text-4xl text-[#121316] dark:text-[#FFFFFF]"
            >
              Technical Quick-Reference Table
            </h2>
            <p className="text-sm text-[#4A505C] dark:text-[#C0C4CC]">
              Direct comparison of baseline imaging metrics, power consumption, and mechanical constraints.
            </p>
          </div>

          <QuickSpecsTable />
        </div>
      </section>
    </div>
  );
}
