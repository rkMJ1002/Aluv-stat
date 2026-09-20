"use client";

import React, { useState } from "react";
import Image from "next/image";

interface TabDetail {
  id: string;
  title: string;
  subtitle: string;
  specs: { label: string; value: string }[];
  description: string;
}

const TABS: TabDetail[] = [
  {
    id: "optical",
    title: "Optical Unit",
    subtitle: "Precision Glass & Sensor Architecture",
    specs: [
      { label: "Effective Sensor", value: "48.0 Megapixels CMOS" },
      { label: "Lens System", value: "Fixed focal length F=2.8mm" },
      { label: "Digital Zoom", value: "8X Smooth Step Zoom" },
      { label: "Macro Range", value: "Down to 10 mm" },
      { label: "Autofocus", value: "Dual-point subject & face detection" },
      { label: "Stabilization", value: "Electronic Image Stabilization (EIS)" },
    ],
    description: "Multi-coated optical elements paired with hardware anti-shake compensation. Supports instantaneous subject tracking and macro capture with zero shutter lag.",
  },
  {
    id: "hinge",
    title: "Display Hinge",
    subtitle: "180-Degree Framing Mechanism",
    specs: [
      { label: "Screen Type", value: "2.4-inch IPS HD Display" },
      { label: "Rotation Arc", value: "Full 180 degrees vertical" },
      { label: "Hinge Alloy", value: "Reinforced dual-pivot stainless steel" },
      { label: "Monitoring Modes", value: "Waist-level, front selfie, overhead" },
    ],
    description: "Engineered for rapid angle adjustments without flex. Flips smoothly upward to face forward for self-recording, vlogging, and precise ground-level compositions.",
  },
  {
    id: "chassis",
    title: "Chassis & Deck",
    subtitle: "140g Ergonomic Portability",
    specs: [
      { label: "Total Mass", value: "140 grams (with battery)" },
      { label: "Footprint", value: "117 mm x 64 mm x 29 mm" },
      { label: "Body Materials", value: "Impact-resistant ABS shell" },
      { label: "Lens Bezel", value: "CNC textured aluminum alloy" },
      { label: "Top Controls", value: "Tactile dial and dual-stage shutter" },
    ],
    description: "Compact form factor contoured for pocket transport. Precision knurled top dials deliver positive tactile feedback even when operating with gloves.",
  },
];

export default function HardwareBreakdown() {
  const [activeTab, setActiveTab] = useState<string>("optical");
  const current = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left Column: Interactive Tabs & Technical Details (5 cols) */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex border border-[#E2E4E8] dark:border-[#2E323B] rounded-[4px] p-1 bg-[#F8F9FA] dark:bg-[#1A1C20]">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-[3px] transition-colors duration-150 ${
                  activeTab === tab.id
                    ? "bg-[#121316] text-[#FFFFFF] dark:bg-[#FFFFFF] dark:text-[#121316] shadow-sm"
                    : "text-[#4A505C] dark:text-[#C0C4CC] hover:text-[#121316] dark:hover:text-[#FFFFFF]"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <div className="p-6 aluvion-card space-y-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#4A505C] dark:text-[#C0C4CC]">
                Subsystem Architecture
              </div>
              <h3 className="font-heading text-xl font-bold text-[#121316] dark:text-[#FFFFFF] mt-1">
                {current.subtitle}
              </h3>
            </div>

            <p className="text-xs text-[#4A505C] dark:text-[#C0C4CC] leading-relaxed">
              {current.description}
            </p>

            <div className="pt-2 border-t border-[#E2E4E8] dark:border-[#2E323B] space-y-2">
              {current.specs.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-[#E2E4E8]/50 dark:border-[#2E323B]/50 last:border-0">
                  <span className="text-[#4A505C] dark:text-[#C0C4CC]">{item.label}</span>
                  <span className="font-semibold text-[#121316] dark:text-[#FFFFFF] font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-[4px] border border-[#E2E4E8] dark:border-[#2E323B] bg-white dark:bg-[#121316] flex items-center justify-between text-xs font-mono">
          <span className="text-[#4A505C] dark:text-[#C0C4CC]">DIMENSIONS:</span>
          <span className="font-bold text-[#121316] dark:text-[#FFFFFF]">117 x 64 x 29 mm</span>
          <span className="text-[#4A505C] dark:text-[#C0C4CC]">WEIGHT:</span>
          <span className="font-bold text-[#121316] dark:text-[#FFFFFF]">140g</span>
        </div>
      </div>

      {/* Right Column: Labeled Schematic Diagram (7 cols) */}
      <div className="lg:col-span-7 aluvion-card overflow-hidden p-6 flex flex-col justify-center items-center">
        <div className="w-full relative aspect-[16/10] border border-[#E2E4E8] dark:border-[#2E323B] rounded-[4px] overflow-hidden bg-[#121316]">
          <Image
            src="/assets/camera-schematic.svg"
            alt="Aluvion Pocket 4K Technical Elevation & Component Schematic"
            fill
            className="object-contain p-2"
          />
        </div>
        <div className="w-full mt-4 flex items-center justify-between text-[11px] text-[#4A505C] dark:text-[#C0C4CC] font-mono">
          <span>FIG 01: STRUCTURAL CAD BREAKDOWN</span>
          <span>SCALE: 1:1 CALIBRATED</span>
        </div>
      </div>
    </div>
  );
}
