"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import Accordion from "@/components/Accordion";
import AccessoriesGrid from "@/components/AccessoriesGrid";
import { formatUSD } from "@/lib/format";

const GALLERY_VIEWS = [
  { id: "front-white", label: "Pearl White", src: "/assets/camera-real-white.jpg", finish: "Pearl White" },
  { id: "front-pink", label: "Blush Pink", src: "/assets/camera-real-pink.jpg", finish: "Blush Pink" },
  { id: "front-black", label: "Obsidian Black", src: "/assets/camera-real-black.jpg", finish: "Obsidian Black" },
  { id: "schematic", label: "Technical Elevation", src: "/assets/camera-schematic.svg", finish: "Pearl White" },
];

const FINISHES = [
  { name: "Pearl White", hex: "#FFFFFF", image: "/assets/camera-real-white.jpg" },
  { name: "Blush Pink", hex: "#E8B4B8", image: "/assets/camera-real-pink.jpg" },
  { name: "Obsidian Black", hex: "#121316", image: "/assets/camera-real-black.jpg" },
];

function Pocket4KContent() {
  const searchParams = useSearchParams();
  const { addItem } = useCart();
  const { getProductBySlug } = useProducts();

  const fetchedProduct = getProductBySlug("pocket-4k");
  const baseProduct = {
    id: "aluvion-pocket-4k",
    name: "Aluvion Pocket 4K",
    price: 27,
    description:
      fetchedProduct?.description ||
      "Compact 4K digital camera featuring a 48.0 megapixel sensor, 180-degree vertical flip display, 8X digital zoom, and a 140-gram lightweight chassis. Includes complete accessory starter kit.",
    stockStatus: fetchedProduct?.stockStatus || "In Stock: Ready to dispatch",
    paypalLink: "https://www.paypal.com/ncp/payment/ZA4JPKKV2GVFY",
  };

  const initialFinish = searchParams?.get("finish") || "Pearl White";
  const [selectedFinish, setSelectedFinish] = useState<string>(initialFinish);
  const [activeImage, setActiveImage] = useState<string>("/assets/camera-real-white.jpg");
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);
  const [zoomStyle, setZoomStyle] = useState<{ transformOrigin: string; transform: string }>({
    transformOrigin: "center center",
    transform: "scale(1)",
  });

  useEffect(() => {
    if (selectedFinish === "Blush Pink") {
      setActiveImage("/assets/camera-real-pink.jpg");
    } else if (selectedFinish === "Obsidian Black") {
      setActiveImage("/assets/camera-real-black.jpg");
    } else {
      setActiveImage("/assets/camera-real-white.jpg");
    }
  }, [selectedFinish]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.4)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });
  };

  const handleAddToCart = () => {
    addItem({
      productId: baseProduct.id,
      name: baseProduct.name,
      price: baseProduct.price,
      finish: selectedFinish,
      quantity,
      image: activeImage,
      paypalLink: baseProduct.paypalLink,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const accordionItems = [
    {
      id: "shipping",
      title: "Shipping & Worldwide Dispatch",
      content:
        "Orders are dispatched within 24 to 48 hours via priority tracked air freight. Typical transit times are 3 to 5 business days for North America and Europe, and 5 to 8 business days for other regions. Tracking codes are issued upon carrier scan.",
    },
    {
      id: "warranty",
      title: "1-Year Hardware Warranty",
      content:
        "Includes a 12-month manufacturer warranty covering sensor calibration, mechanical flip-hinge tolerance, optical coating, and charging circuitry. Hardware defects will be repaired or replaced free of charge.",
    },
    {
      id: "returns",
      title: "30-Day Return Policy",
      content:
        "Returns accepted within 30 days of delivery in original packaging with all included starter kit accessories. Contact jinglespinofficial@gmail.com to initiate a return merchandise authorization (RMA).",
    },
  ];

  return (
    <div className="w-full">
      {/* Product Primary Stage */}
      <section className="w-full py-16 md:py-24 border-b border-[#E2E4E8] dark:border-[#24272E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Vertical Thumbnails + Main Zoom Image (7 cols) */}
            <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-6">
              {/* Vertical Thumbnails */}
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px]">
                {GALLERY_VIEWS.map((thumb) => (
                  <button
                    key={thumb.id}
                    type="button"
                    onClick={() => {
                      setActiveImage(thumb.src);
                      setSelectedFinish(thumb.finish);
                    }}
                    aria-label={thumb.label}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-[4px] border transition-colors duration-150 bg-white dark:bg-[#1A1C20] overflow-hidden ${
                      activeImage === thumb.src
                        ? "border-[#121316] dark:border-[#FFFFFF] ring-1 ring-[#121316] dark:ring-[#FFFFFF]"
                        : "border-[#E2E4E8] dark:border-[#2E323B] hover:border-[#121316] dark:hover:border-[#FFFFFF]"
                    }`}
                  >
                    <Image
                      src={thumb.src}
                      alt={thumb.label}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>

              {/* Main Preview with Hover Zoom */}
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative flex-1 aspect-[16/11] border border-[#E2E4E8] dark:border-[#2E323B] rounded-[4px] bg-[#F8F9FA] dark:bg-[#1A1C20] overflow-hidden cursor-crosshair"
              >
                <div
                  className="w-full h-full relative transition-transform duration-75 ease-out"
                  style={zoomStyle}
                >
                  <Image
                    src={activeImage}
                    alt={baseProduct.name}
                    fill
                    priority
                    className="object-contain p-8"
                  />
                </div>
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#4A505C] dark:text-[#C0C4CC] bg-white/80 dark:bg-[#121316]/80 px-2 py-1 rounded-[2px] border border-[#E2E4E8] dark:border-[#2E323B] pointer-events-none">
                  HOVER TO MAGNIFY
                </div>
              </div>
            </div>

            {/* Right Column: Fixed Purchase Panel (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#121316] dark:text-[#FFFFFF]">
                  {baseProduct.name}
                </h1>
                <div className="flex items-center gap-4 pt-1">
                  <span className="font-mono text-3xl font-bold text-[#121316] dark:text-[#FFFFFF]">
                    {formatUSD(baseProduct.price)}
                  </span>
                  {/* Stock Indicator */}
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-[2px] bg-[#F8F9FA] dark:bg-[#1A1C20] text-[#121316] dark:text-[#FFFFFF] border border-[#E2E4E8] dark:border-[#2E323B]">
                    {baseProduct.stockStatus}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#4A505C] dark:text-[#C0C4CC] leading-relaxed">
                {baseProduct.description}
              </p>

              {/* Finish Selector */}
              <div className="space-y-2 pt-2 border-t border-[#E2E4E8] dark:border-[#2E323B]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#121316] dark:text-[#FFFFFF]">Finish:</span>
                  <span className="font-mono text-[#4A505C] dark:text-[#C0C4CC]">{selectedFinish}</span>
                </div>
                <div className="flex items-center gap-3" role="radiogroup" aria-label="Camera Finish Swatches">
                  {FINISHES.map((finish) => (
                    <button
                      key={finish.name}
                      type="button"
                      role="radio"
                      aria-checked={selectedFinish === finish.name}
                      aria-label={finish.name}
                      onClick={() => setSelectedFinish(finish.name)}
                      className={`w-9 h-9 rounded-full border-2 transition-transform duration-150 flex items-center justify-center ${
                        selectedFinish === finish.name
                          ? "border-[#121316] dark:border-[#FFFFFF] scale-110"
                          : "border-[#E2E4E8] dark:border-[#2E323B] hover:scale-105"
                      }`}
                      style={{ backgroundColor: finish.hex }}
                    >
                      {selectedFinish === finish.name && (
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            finish.name === "Obsidian Black" ? "bg-white" : "bg-[#121316]"
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Built-in Website Quantity Stepper */}
              <div className="space-y-2 pt-2 border-t border-[#E2E4E8] dark:border-[#2E323B]">
                <span className="text-xs font-semibold text-[#121316] dark:text-[#FFFFFF]">Quantity:</span>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center border border-[#E2E4E8] dark:border-[#2E323B] rounded-[4px] bg-white dark:bg-[#1A1C20]">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-sm font-mono text-[#121316] dark:text-[#FFFFFF] hover:bg-[#F8F9FA] dark:hover:bg-[#121316]"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-xs font-mono font-bold text-[#121316] dark:text-[#FFFFFF]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center text-sm font-mono text-[#121316] dark:text-[#FFFFFF] hover:bg-[#F8F9FA] dark:hover:bg-[#121316]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs font-mono text-[#4A505C] dark:text-[#C0C4CC]">
                    Total: {formatUSD(baseProduct.price * quantity)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-3 border-t border-[#E2E4E8] dark:border-[#2E323B]">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full btn-solid btn-solid-primary py-4 text-xs font-semibold tracking-wider uppercase text-center"
                >
                  {added ? "Added to Bag" : `Add to Bag (${formatUSD(baseProduct.price * quantity)})`}
                </button>
                {added && (
                  <Link
                    href="/cart"
                    className="w-full btn-solid btn-outline py-3 text-xs font-semibold tracking-wider uppercase text-center block"
                  >
                    View Shopping Bag &amp; Checkout &rarr;
                  </Link>
                )}
              </div>

              {/* Details Accordion */}
              <div className="pt-4 border-t border-[#E2E4E8] dark:border-[#2E323B]">
                <Accordion items={accordionItems} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anchor Section: What's in the box */}
      <section
        id="whats-in-the-box"
        className="w-full py-16 md:py-24 bg-[#F8F9FA]/40 dark:bg-[#1A1C20]/40 border-b border-[#E2E4E8] dark:border-[#24272E]"
      >
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#4A505C] dark:text-[#C0C4CC]">
              Kit Verification
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#121316] dark:text-[#FFFFFF]">
              Included Inside Every Pocket 4K Box
            </h2>
            <p className="text-sm text-[#4A505C] dark:text-[#C0C4CC]">
              Standardized equipment list included with every unit. Unbox and start recording immediately with pre-formatted storage.
            </p>
          </div>

          <AccessoriesGrid />
        </div>
      </section>
    </div>
  );
}

export default function Pocket4KProductPage() {
  return (
    <React.Suspense fallback={<div className="py-24 text-center text-xs font-mono">Loading product configuration...</div>}>
      <Pocket4KContent />
    </React.Suspense>
  );
}
