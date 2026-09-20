"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface Colorway {
  id: string;
  name: string;
  hex: string;
  finish: string;
  image: string;
  description: string;
}

const COLORWAYS: Colorway[] = [
  {
    id: "white",
    name: "Pearl White",
    hex: "#FFFFFF",
    finish: "Silver Bezel / White Matte ABS Finish",
    image: "/assets/camera-real-white.jpg",
    description: "Bright matte casing treated with anti-smudge polymer, complemented by a brushed aluminum optical barrel.",
  },
  {
    id: "pink",
    name: "Blush Pink",
    hex: "#E8B4B8",
    finish: "Silver Bezel / Light Pink Metallic Finish",
    image: "/assets/camera-real-pink.jpg",
    description: "Anodized warm pastel hue matched with silver hardware accents and high-contrast control dials.",
  },
  {
    id: "black",
    name: "Obsidian Black",
    hex: "#121316",
    finish: "Silver Bezel / Matte Black Finish",
    image: "/assets/camera-real-black.jpg",
    description: "Deep obsidian exterior with low-reflectivity finish tailored for discreet street photography.",
  },
];

export default function ColorwaySelector() {
  const { addItem } = useCart();
  const [selectedId, setSelectedId] = useState<string>("white");
  const [added, setAdded] = useState(false);
  const selected = COLORWAYS.find((c) => c.id === selectedId) || COLORWAYS[0];

  const handleAdd = () => {
    addItem({
      productId: "aluvion-pocket-4k",
      name: "Aluvion Pocket 4K",
      price: 27,
      finish: selected.name,
      quantity: 1,
      image: selected.image,
      paypalLink: "https://www.paypal.com/ncp/payment/ZA4JPKKV2GVFY",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="aluvion-card p-8 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Stage Image (Direct replacement without sliding animation) */}
        <div className="lg:col-span-8">
          <div className="relative aspect-[16/10] w-full border border-[#E2E4E8] dark:border-[#2E323B] rounded-[4px] bg-[#F8F9FA] dark:bg-[#1A1C20] overflow-hidden">
            <Image
              key={selected.image}
              src={selected.image}
              alt={`Aluvion Pocket 4K in ${selected.name}`}
              fill
              priority
              className="object-contain p-4"
            />
          </div>
        </div>

        {/* Colorway Swatches & Details */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#4A505C] dark:text-[#C0C4CC]">
              Colorway Finishes
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#121316] dark:text-[#FFFFFF] mt-1">
              {selected.name}
            </h3>
            <p className="text-xs font-mono text-[#4A505C] dark:text-[#C0C4CC] mt-1">
              {selected.finish}
            </p>
          </div>

          {/* Circular Swatch Radio Group */}
          <div className="flex items-center gap-4 py-2" role="radiogroup" aria-label="Camera Finishes">
            {COLORWAYS.map((c) => (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={selectedId === c.id}
                aria-label={c.name}
                onClick={() => setSelectedId(c.id)}
                className={`w-10 h-10 rounded-full border-2 transition-transform duration-150 flex items-center justify-center ${
                  selectedId === c.id
                    ? "border-[#121316] dark:border-[#FFFFFF] scale-110"
                    : "border-[#E2E4E8] dark:border-[#2E323B] hover:scale-105"
                }`}
                style={{ backgroundColor: c.hex }}
              >
                {selectedId === c.id && (
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      c.id === "black" ? "bg-white" : "bg-[#121316]"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>

          <p className="text-xs text-[#4A505C] dark:text-[#C0C4CC] leading-relaxed">
            {selected.description}
          </p>

          <div className="pt-4 border-t border-[#E2E4E8] dark:border-[#2E323B] flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleAdd}
              className="btn-solid btn-solid-primary w-full py-3 text-xs tracking-wider uppercase font-semibold text-center"
            >
              {added ? "Added to Bag" : "Add to Bag ($27.00)"}
            </button>
            <Link
              href={`/products/pocket-4k?finish=${encodeURIComponent(selected.name)}`}
              className="btn-solid btn-outline w-full sm:w-auto px-5 py-3 text-xs tracking-wider uppercase font-semibold text-center whitespace-nowrap"
            >
              Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
