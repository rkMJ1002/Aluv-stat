import React from "react";
import Image from "next/image";

interface AccessoryItem {
  id: string;
  name: string;
  quantity: string;
  image: string;
  spec: string;
}

const ACCESSORIES: AccessoryItem[] = [
  {
    id: "camera-unit",
    name: "4K Camera Unit",
    quantity: "1x Unit",
    image: "/assets/camera-real-white.jpg",
    spec: "48MP CMOS, 180° Flip Display",
  },
  {
    id: "lanyard",
    name: "Wrist Lanyard",
    quantity: "1x Unit",
    image: "/assets/accessory-lanyard.svg",
    spec: "Reinforced braided nylon",
  },
  {
    id: "cable",
    name: "USB-C Cable",
    quantity: "1x Unit",
    image: "/assets/accessory-cable.svg",
    spec: "High-speed data & power",
  },
  {
    id: "manual",
    name: "User Manual",
    quantity: "1x Book",
    image: "/assets/accessory-manual.svg",
    spec: "Detailed quick-start guide",
  },
  {
    id: "reader",
    name: "USB Card Reader",
    quantity: "1x Unit",
    image: "/assets/accessory-reader.svg",
    spec: "USB 3.0 direct transfer",
  },
  {
    id: "adapter",
    name: "Type-C Adapter",
    quantity: "1x Unit",
    image: "/assets/accessory-adapter.svg",
    spec: "OTG phone & tablet support",
  },
  {
    id: "stickers",
    name: "Sticker Sheets",
    quantity: "2x Sheets",
    image: "/assets/accessory-stickers.svg",
    spec: "Custom camera body decals",
  },
];

export default function AccessoriesGrid() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {ACCESSORIES.map((item) => (
          <div
            key={item.id}
            className="aluvion-card p-3 flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-150"
          >
            <div className="relative aspect-square w-full border border-[#E2E4E8] dark:border-[#2E323B] rounded-[3px] bg-white dark:bg-[#121316] overflow-hidden mb-3">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain p-2"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#E8B4B8] dark:text-[#E8B4B8]">
                <span>{item.quantity}</span>
              </div>
              <h4 className="font-heading font-bold text-xs text-[#121316] dark:text-[#FFFFFF] truncate">
                {item.name}
              </h4>
              <p className="text-[10px] text-[#4A505C] dark:text-[#C0C4CC] leading-tight">
                {item.spec}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Note box */}
      <div className="p-4 rounded-[4px] border border-[#E2E4E8] dark:border-[#2E323B] bg-[#F8F9FA] dark:bg-[#1A1C20] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#4A505C] dark:text-[#C0C4CC]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#121316] dark:bg-[#FFFFFF]" />
          <span>
            Every Aluvion Pocket 4K includes the complete 7-piece starter kit. No separate reader, adapter, or cable purchase required.
          </span>
        </div>
        <span className="font-mono text-[11px] font-semibold text-[#121316] dark:text-[#FFFFFF] whitespace-nowrap">
          ALL-IN-ONE KIT: $27.00
        </span>
      </div>
    </div>
  );
}
