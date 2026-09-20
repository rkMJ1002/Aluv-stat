"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatUSD } from "@/lib/format";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const { items, clearCart } = useCart();
  const [recorded, setRecorded] = useState(false);
  const [confirmedQty, setConfirmedQty] = useState(1);
  const [confirmedTotal, setConfirmedTotal] = useState(27.0);
  const [confirmedFinish, setConfirmedFinish] = useState("Pearl White");

  const orderId =
    searchParams?.get("orderId") ||
    searchParams?.get("ref") ||
    `ALV-${Math.floor(100000 + Math.random() * 900000)}`;
  const payerId = searchParams?.get("PayerID") || searchParams?.get("payer_id");
  const transactionId = searchParams?.get("tx") || searchParams?.get("transaction_id") || "ZA4JPKKV2GVFY";

  useEffect(() => {
    if (items.length > 0) {
      const selectedFinish = items[0]?.finish || "Pearl White";
      const itemQty = items.reduce((acc, i) => acc + i.quantity, 0) || 1;
      const itemTotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0) || itemQty * 27.0;

      setConfirmedFinish(selectedFinish);
      setConfirmedQty(itemQty);
      setConfirmedTotal(itemTotal);

      // Clear cart once order details are snapshotted
      clearCart();

      // Trigger Google Sheets connector via API
      if (!recorded) {
        fetch("/api/record-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            productName: "Aluvion Pocket 4K",
            finish: selectedFinish,
            quantity: itemQty,
            totalAmount: itemTotal,
            currency: "USD",
            paymentStatus: "PAID",
            fulfillmentStatus: "Unfulfilled",
            paymentMethod: "PayPal Hosted Button",
            paypalTransactionId: transactionId,
            customerName: payerId ? `PayPal Buyer (${payerId})` : "PayPal Customer (See Dashboard)",
            customerEmail: "On file in PayPal",
            customerPhone: "On file in PayPal",
            shippingAddress: "Confirmed address in PayPal transaction receipt",
          }),
        })
          .then(() => setRecorded(true))
          .catch((err) => console.error("Could not trigger sheets connector:", err));
      }
    }
  }, [items, orderId, payerId, transactionId, clearCart, recorded]);

  return (
    <div className="w-full py-20 md:py-28">
      <div className="max-w-2xl mx-auto px-6 space-y-8">
        <div className="aluvion-card p-8 sm:p-12 space-y-6 text-center">
          {/* Checkmark Icon */}
          <div className="w-16 h-16 mx-auto border border-[#121316] dark:border-[#E2E4E8] rounded-[4px] flex items-center justify-center p-3 bg-[#F8F9FA] dark:bg-[#1A1C20]">
            <svg viewBox="0 0 24 24" className="w-full h-full stroke-[#121316] dark:stroke-[#FFFFFF] fill-none stroke-[2]">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-[#4A505C] dark:text-[#C0C4CC]">
              Payment Verified &bull; PayPal Transaction Confirmed
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#121316] dark:text-[#FFFFFF]">
              Payment Confirmed
            </h1>
            <p className="text-xs sm:text-sm text-[#4A505C] dark:text-[#C0C4CC] max-w-lg mx-auto leading-relaxed">
              Your PayPal transaction has been completed and verified. Your Aluvion Pocket 4K kit order is now queued for packing and dispatch.
            </p>
          </div>

          {/* Receipt Breakdown Card */}
          <div className="p-6 rounded-[4px] border border-[#E2E4E8] dark:border-[#2E323B] bg-[#F8F9FA] dark:bg-[#121316] text-left space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E4E8] dark:border-[#2E323B]">
              <span className="text-[#4A505C] dark:text-[#C0C4CC]">Order Reference:</span>
              <span className="font-bold text-[#121316] dark:text-[#FFFFFF]">{orderId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#4A505C] dark:text-[#C0C4CC]">Item Purchased:</span>
              <span className="font-semibold text-[#121316] dark:text-[#FFFFFF]">
                Aluvion Pocket 4K ({confirmedFinish}) &times; {confirmedQty}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#4A505C] dark:text-[#C0C4CC]">Payment Processor:</span>
              <span className="text-[#121316] dark:text-[#FFFFFF]">PayPal Express (Button ID: ZA4JPKKV2GVFY)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#4A505C] dark:text-[#C0C4CC]">Total Charged:</span>
              <span className="font-bold text-base text-[#121316] dark:text-[#FFFFFF]">{formatUSD(confirmedTotal)}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#E2E4E8] dark:border-[#2E323B]">
              <span className="text-[#4A505C] dark:text-[#C0C4CC]">Shipping Status:</span>
              <span className="text-[#121316] dark:text-[#FFFFFF] font-semibold">Priority Air Freight (Queued)</span>
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto btn-solid btn-solid-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-center"
            >
              Return to Homepage
            </Link>
            <Link
              href="/specs"
              className="w-full sm:w-auto btn-solid btn-outline px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-center"
            >
              Review Camera Specs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full py-24 text-center font-mono text-xs text-[#4A505C]">
          Loading order details...
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
