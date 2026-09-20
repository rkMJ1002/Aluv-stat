import React from "react";
import Link from "next/link";

interface SpecRow {
  parameter: string;
  metric: string;
  detail: string;
}

const ROWS: SpecRow[] = [
  {
    parameter: "Video Capture",
    metric: "4K Ultra HD",
    detail: "Up to 30 frames per second with Electronic Image Stabilization",
  },
  {
    parameter: "Still Resolution",
    metric: "48.0 Megapixels",
    detail: "High-density CMOS sensor with dual-point auto subject detection",
  },
  {
    parameter: "Display Mechanism",
    metric: "180° Vertical Flip Hinge",
    detail: "2.4-inch IPS HD panel supporting selfie and overhead framing",
  },
  {
    parameter: "Battery Runtime",
    metric: "90 Minutes Continuous",
    detail: "1000 mAh rechargeable Lithium-Ion internal cell",
  },
  {
    parameter: "Recharge Interval",
    metric: "90 to 120 Minutes",
    detail: "Standard USB Type-C high-efficiency power delivery",
  },
  {
    parameter: "Form Factor",
    metric: "117 x 64 x 29 mm",
    detail: "Ultra-compact footprint sized for pocket carry",
  },
  {
    parameter: "Unit Weight",
    metric: "140 Grams",
    detail: "Measured with operational battery and MicroSD installed",
  },
  {
    parameter: "Removable Storage",
    metric: "MicroSD up to 128GB",
    detail: "Compliant with Class 10, UHS-I Speed Class 3 (U3) cards",
  },
];

export default function QuickSpecsTable() {
  return (
    <div className="space-y-6">
      <div className="aluvion-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" aria-label="Technical Specification Quick Reference">
            <thead>
              <tr className="border-b border-[#E2E4E8] dark:border-[#2E323B] bg-white dark:bg-[#121316] text-[11px] font-mono uppercase tracking-wider text-[#4A505C] dark:text-[#C0C4CC]">
                <th className="py-4 px-6 font-semibold">Parameter</th>
                <th className="py-4 px-6 font-semibold">Specification Metric</th>
                <th className="py-4 px-6 font-semibold hidden sm:table-cell">Technical Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E4E8] dark:divide-[#2E323B] text-xs">
              {ROWS.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-white dark:hover:bg-[#121316] transition-colors duration-150"
                >
                  <td className="py-4 px-6 font-semibold text-[#121316] dark:text-[#FFFFFF] whitespace-nowrap">
                    {row.parameter}
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-[#121316] dark:text-[#E8B4B8] whitespace-nowrap">
                    {row.metric}
                  </td>
                  <td className="py-4 px-6 text-[#4A505C] dark:text-[#C0C4CC] hidden sm:table-cell">
                    {row.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-[#4A505C] dark:text-[#C0C4CC]">
          All parameters verified in bench tests under standardized laboratory ambient conditions.
        </span>
        <Link
          href="/specs"
          className="font-mono text-xs font-semibold text-[#121316] dark:text-[#FFFFFF] hover:underline whitespace-nowrap ml-4"
        >
          View Comprehensive Specification Matrix &rarr;
        </Link>
      </div>
    </div>
  );
}
