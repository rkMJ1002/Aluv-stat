"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatUSD } from "@/lib/format";
import PayPalButton from "@/components/PayPalButton";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, totalCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="w-full py-24 md:py-32">
        <div className="max-w-xl mx-auto px-6 text-center space-y-6">
          <div className="w-16 h-16 mx-auto border border-[#121316] dark:border-[#E2E4E8] rounded-[4px] flex items-center justify-center p-3">
            <svg viewBox="0 0 24 24" className="w-full h-full stroke-[#121316] dark:stroke-[#FFFFFF] fill-none stroke-[1.5]">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="font-heading font-bold text-2xl text-[#121316] dark:text-[#FFFFFF]">
              Your Cart is Empty
            </h1>
            <p className="text-xs text-[#4A505C] dark:text-[#C0C4CC]">
              No items have been added to your shopping bag yet. Explore the Aluvion Pocket 4K camera kit or compatible accessories.
            </p>
          </div>
          <div>
            <Link
              href="/products/pocket-4k"
              className="btn-solid btn-solid-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-wider inline-block"
            >
              Order Pocket 4K ($27.00)
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 border-b border-[#E2E4E8] dark:border-[#2E323B]">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#4A505C] dark:text-[#C0C4CC]">
              Order Summary
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#121316] dark:text-[#FFFFFF]">
              Shopping Cart ({totalCount} {totalCount === 1 ? "Item" : "Items"})
            </h1>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-mono text-[#4A505C] dark:text-[#C0C4CC] hover:text-[#121316] dark:hover:text-[#FFFFFF] underline"
          >
            Clear Entire Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Cart Items Table (8 cols) */}
          <div className="lg:col-span-8 aluvion-card overflow-hidden divide-y divide-[#E2E4E8] dark:divide-[#2E323B]">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                {/* Thumbnail and Title */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative w-20 h-20 shrink-0 border border-[#E2E4E8] dark:border-[#2E323B] rounded-[4px] bg-white dark:bg-[#121316] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-base text-[#121316] dark:text-[#FFFFFF]">
                      {item.name}
                    </h3>
                    <div className="text-xs font-mono text-[#4A505C] dark:text-[#C0C4CC]">
                      Finish: <span className="text-[#121316] dark:text-[#FFFFFF] font-medium">{item.finish}</span>
                    </div>
                    <div className="font-mono text-xs font-bold text-[#121316] dark:text-[#FFFFFF]">
                      {formatUSD(item.price)}
                    </div>
                  </div>
                </div>

                {/* Quantity Stepper and Actions */}
                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="inline-flex items-center border border-[#E2E4E8] dark:border-[#2E323B] rounded-[4px] bg-white dark:bg-[#121316]">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center text-xs font-mono text-[#121316] dark:text-[#FFFFFF] hover:bg-[#F8F9FA] dark:hover:bg-[#1A1C20]"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-xs font-mono font-bold text-[#121316] dark:text-[#FFFFFF]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center text-xs font-mono text-[#121316] dark:text-[#FFFFFF] hover:bg-[#F8F9FA] dark:hover:bg-[#1A1C20]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[80px]">
                    <div className="font-mono text-sm font-bold text-[#121316] dark:text-[#FFFFFF]">
                      {formatUSD(item.price * item.quantity)}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-[11px] text-[#4A505C] dark:text-[#C0C4CC] hover:text-[#121316] dark:hover:text-[#FFFFFF] underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Breakdown (4 cols) */}
          <div className="lg:col-span-4 aluvion-card p-6 space-y-6">
            <h2 className="font-heading font-bold text-lg text-[#121316] dark:text-[#FFFFFF] pb-3 border-b border-[#E2E4E8] dark:border-[#2E323B]">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-[#4A505C] dark:text-[#C0C4CC]">
                <span>Items Subtotal:</span>
                <span className="font-mono font-bold text-[#121316] dark:text-[#FFFFFF]">
                  {formatUSD(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#4A505C] dark:text-[#C0C4CC]">
                <span>Standard Global Shipping:</span>
                <span className="font-mono font-semibold text-[#121316] dark:text-[#FFFFFF]">
                  FREE
                </span>
              </div>
              <div className="flex items-center justify-between text-[#4A505C] dark:text-[#C0C4CC]">
                <span>Estimated Import Duty &amp; Tax:</span>
                <span className="font-mono font-semibold text-[#121316] dark:text-[#FFFFFF]">
                  Calculated at Checkout
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E4E8] dark:border-[#2E323B] flex items-center justify-between">
              <span className="font-heading font-bold text-base text-[#121316] dark:text-[#FFFFFF]">
                Total:
              </span>
              <span className="font-mono text-2xl font-bold text-[#121316] dark:text-[#FFFFFF]">
                {formatUSD(subtotal)}
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <PayPalButton
                hostedButtonId="ZA4JPKKV2GVFY"
                quantity={totalCount}
                amount={subtotal}
                onPaymentSuccess={() => {
                  window.location.href = "/order-confirmation";
                }}
              />
              <Link
                href="/products/pocket-4k"
                className="w-full btn-solid btn-outline py-3 text-xs font-semibold tracking-wider uppercase text-center block"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="p-3 bg-white dark:bg-[#121316] rounded-[4px] border border-[#E2E4E8] dark:border-[#2E323B] text-[11px] text-[#4A505C] dark:text-[#C0C4CC] space-y-1">
              <div className="font-semibold text-[#121316] dark:text-[#FFFFFF]">
                Guaranteed Dispatch:
              </div>
              <div>Ships within 24 to 48 hours with door-to-door carrier tracking.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
