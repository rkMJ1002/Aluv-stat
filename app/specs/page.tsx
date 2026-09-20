import React from "react";
import Link from "next/link";
import Image from "next/image";

interface SpecCategory {
  title: string;
  code: string;
  items: { parameter: string; value: string; note: string }[];
}

const SPEC_CATEGORIES: SpecCategory[] = [
  {
    title: "Imaging & Optical Formula",
    code: "CAT-OPT-01",
    items: [
      {
        parameter: "Video Recording Resolution",
        value: "4K Ultra HD (3840 x 2160) @ 30fps",
        note: "Also supports 2.7K @ 30fps, 1080P @ 60fps/30fps, 720P @ 120fps",
      },
      {
        parameter: "Still Image Resolution",
        value: "48.0 Megapixels (8000 x 6000 interpolated)",
        note: "Hardware CMOS sensor with JPEG compression formatting",
      },
      {
        parameter: "Optical Lens System",
        value: "Fixed Focal Length F=2.8mm",
        note: "Precision multi-coated glass elements, aperture f/2.2 equivalent",
      },
      {
        parameter: "Macro Focus Distance",
        value: "Down to 10 millimeters",
        note: "Dedicated close-up optical calibration for macro texture capture",
      },
      {
        parameter: "Digital Magnification",
        value: "8X Smooth Digital Step Zoom",
        note: "Adjustable via ergonomic top slider control",
      },
      {
        parameter: "Autofocus Architecture",
        value: "Dual-Point Detection",
        note: "Continuous subject tracking and facial priority recognition",
      },
      {
        parameter: "Image Stabilization",
        value: "Electronic Image Stabilization (EIS)",
        note: "Multi-axis gyro compensation algorithm for shake reduction",
      },
      {
        parameter: "Integrated Fill Light",
        value: "Front-Facing White Balance LED",
        note: "Even illumination for night portraits and macro close-ups",
      },
    ],
  },
  {
    title: "Display & Mechanics",
    code: "CAT-MEC-02",
    items: [
      {
        parameter: "Display Panel",
        value: "2.4-inch IPS HD Color Display",
        note: "Wide viewing angles with high sunlight visibility",
      },
      {
        parameter: "Hinge Mechanism",
        value: "180-Degree Vertical Flip",
        note: "Dual-pivot friction hinge engineered for over 10,000 rotations",
      },
      {
        parameter: "Chassis Material",
        value: "Impact-Resistant ABS Shell",
        note: "High-density polymer structure with textured tactile matte coat",
      },
      {
        parameter: "Lens Bezel & Top Deck",
        value: "Anodized Aluminum Alloy",
        note: "Precision CNC milled knurled dial and protective ring",
      },
      {
        parameter: "External Physical Dimensions",
        value: "117 mm (W) x 64 mm (H) x 29 mm (D)",
        note: "Pocketable profile designed for one-handed grip",
      },
      {
        parameter: "Operational Weight",
        value: "Approximately 140 grams",
        note: "Includes installed rechargeable battery and MicroSD storage card",
      },
    ],
  },
  {
    title: "Power & Electronic Storage",
    code: "CAT-PWR-03",
    items: [
      {
        parameter: "Battery Chemistry & Cell",
        value: "1000 mAh Lithium-Ion Rechargeable",
        note: "Removable battery compartment with safety locking latch",
      },
      {
        parameter: "Continuous Video Runtime",
        value: "Approximately 90 minutes",
        note: "Recorded at 4K resolution under 23°C ambient temperature",
      },
      {
        parameter: "Charging Port & Duration",
        value: "USB Type-C (1.5 to 2.0 hours full recharge)",
        note: "Supports charging during active operation via power bank",
      },
      {
        parameter: "Storage Media",
        value: "MicroSD Slot (Supports up to 128GB)",
        note: "Class 10 / UHS-I Speed Class 3 (U3) formatting required",
      },
      {
        parameter: "Expandable Storage",
        value: "Supports MicroSD up to 128GB",
        note: "High-speed card recommended for 4K video recording",
      },
    ],
  },
  {
    title: "Color Finishes & Accessories",
    code: "CAT-VAR-04",
    items: [
      {
        parameter: "Available Finishes",
        value: "Pearl White / Blush Pink / Obsidian Black",
        note: "All variations feature matching silver aluminum optical bezels",
      },
      {
        parameter: "Standard Kit Contents",
        value: "7-Piece Complete Starter Kit",
        note: "Camera, Lanyard, USB Cable, Manual, Card Reader, USB-C Adapter, Custom Stickers",
      },
      {
        parameter: "File Formats",
        value: "Video: AVI / Stills: JPEG",
        note: "Directly compatible with Windows, macOS, Android, and iOS",
      },
      {
        parameter: "Operating Temperature",
        value: "0°C to 40°C (32°F to 104°F)",
        note: "Standard environmental resilience for indoor and outdoor shooting",
      },
    ],
  },
];

export default function SpecsPage() {
  return (
    <div className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Header */}
        <div className="space-y-4 pb-8 border-b border-[#E2E4E8] dark:border-[#2E323B]">
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#121316] dark:text-[#FFFFFF]">
            Hardware Specifications Matrix
          </h1>
          <p className="text-base text-[#4A505C] dark:text-[#C0C4CC] max-w-3xl leading-relaxed">
            Exhaustive mechanical, optical, and electrical data for the Aluvion Pocket 4K digital camera system. Built strictly according to verified factory engineering benchmarks.
          </p>
        </div>

        {/* CAD Schematic Hero Reference */}
        <div className="aluvion-card p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E4E8] dark:border-[#2E323B]">
            <div>
              <div className="text-xs font-mono text-[#4A505C] dark:text-[#C0C4CC]">
                FIG 01 / MECHANICAL ENCLOSURE BLUEPRINT
              </div>
              <h2 className="font-heading font-bold text-xl text-[#121316] dark:text-[#FFFFFF]">
                Dimensional Envelope &amp; Component Arrangement
              </h2>
            </div>
            <div className="font-mono text-xs font-semibold text-[#121316] dark:text-[#FFFFFF] bg-white dark:bg-[#121316] px-3 py-1.5 rounded-[4px] border border-[#E2E4E8] dark:border-[#2E323B]">
              117 x 64 x 29 mm | 140g
            </div>
          </div>

          <div className="relative aspect-[16/8] w-full border border-[#E2E4E8] dark:border-[#2E323B] rounded-[4px] overflow-hidden bg-[#121316]">
            <Image
              src="/assets/camera-schematic.svg"
              alt="Aluvion Pocket 4K Technical Elevation Blueprint"
              fill
              className="object-contain p-4"
            />
          </div>
        </div>

        {/* Spec Categories */}
        <div className="space-y-12">
          {SPEC_CATEGORIES.map((cat) => (
            <div key={cat.code} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#121316] dark:border-[#E2E4E8]">
                <h3 className="font-heading font-bold text-2xl text-[#121316] dark:text-[#FFFFFF]">
                  {cat.title}
                </h3>
                <span className="text-xs font-mono text-[#4A505C] dark:text-[#C0C4CC]">
                  {cat.code}
                </span>
              </div>

              <div className="aluvion-card overflow-hidden">
                <table className="w-full text-left border-collapse" aria-label={cat.title}>
                  <thead>
                    <tr className="border-b border-[#E2E4E8] dark:border-[#2E323B] bg-white dark:bg-[#121316] text-[11px] font-mono uppercase tracking-wider text-[#4A505C] dark:text-[#C0C4CC]">
                      <th className="py-3.5 px-6 font-semibold w-1/3">Feature</th>
                      <th className="py-3.5 px-6 font-semibold w-1/3">Standard Specification</th>
                      <th className="py-3.5 px-6 font-semibold w-1/3 hidden md:table-cell">Verification Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E4E8] dark:divide-[#2E323B] text-xs">
                    {cat.items.map((item, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-white dark:hover:bg-[#121316] transition-colors duration-150"
                      >
                        <td className="py-3.5 px-6 font-semibold text-[#121316] dark:text-[#FFFFFF]">
                          {item.parameter}
                        </td>
                        <td className="py-3.5 px-6 font-mono font-medium text-[#121316] dark:text-[#E8B4B8]">
                          {item.value}
                        </td>
                        <td className="py-3.5 px-6 text-[#4A505C] dark:text-[#C0C4CC] hidden md:table-cell">
                          {item.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Action Banner */}
        <div className="p-8 aluvion-card flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-xl text-[#121316] dark:text-[#FFFFFF]">
              Ready to begin shooting with Aluvion?
            </h4>
            <p className="text-xs text-[#4A505C] dark:text-[#C0C4CC]">
              Standard kit comes with all 7 necessary accessories and a 1-year warranty.
            </p>
          </div>
          <Link
            href="/products/pocket-4k"
            className="btn-solid btn-solid-primary px-7 py-3.5 text-xs font-semibold tracking-wider uppercase whitespace-nowrap"
          >
            Order Pocket 4K ($27.00)
          </Link>
        </div>
      </div>
    </div>
  );
}
