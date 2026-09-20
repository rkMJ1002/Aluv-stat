"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface PayPalButtonProps {
  hostedButtonId?: string;
  quantity?: number;
  amount?: number;
  onPaymentSuccess?: (details: any) => void;
  className?: string;
}

declare global {
  interface Window {
    paypal?: any;
    [key: string]: any;
  }
}

export default function PayPalButton({
  hostedButtonId = "ZA4JPKKV2GVFY",
  quantity = 1,
  amount = 27.0,
  onPaymentSuccess,
  className = "",
}: PayPalButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const containerId = `paypal-container-${hostedButtonId}`;

  // Keep references to latest props without forcing unmount/re-render of PayPal button
  const quantityRef = useRef<number>(quantity);
  quantityRef.current = quantity;

  const onPaymentSuccessRef = useRef(onPaymentSuccess);
  onPaymentSuccessRef.current = onPaymentSuccess;

  // Helper to wrap PayPal's internal form field controller
  const wrapPP = useCallback((ppObj: any) => {
    if (!ppObj) return ppObj;
    if (!ppObj._qtyPatched) {
      ppObj._qtyPatched = true;
      const originalGetUserInputs = ppObj.getUserInputs;
      ppObj.getUserInputs = function () {
        const inputs = originalGetUserInputs ? originalGetUserInputs.call(this) : {};
        inputs.quantity = String(quantityRef.current || 1);
        return inputs;
      };
    }
    return ppObj;
  }, []);

  // Sync DOM select element and PayPal internal fields with website quantity
  const syncQuantity = useCallback((qty: number) => {
    if (typeof window === "undefined") return;

    // 1. Sync hidden HTML select element
    if (containerRef.current) {
      const select = containerRef.current.querySelector("select") as HTMLSelectElement | null;
      if (select) {
        let opt = Array.from(select.options).find((o) => o.value === String(qty));
        if (!opt) {
          opt = document.createElement("option");
          opt.value = String(qty);
          opt.textContent = String(qty);
          select.appendChild(opt);
        }
        if (select.value !== String(qty)) {
          select.value = String(qty);
          select.selectedIndex = Array.from(select.options).findIndex((o) => o.value === String(qty));
          select.dispatchEvent(new Event("change", { bubbles: true }));
          select.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }
    }

    // 2. Sync PayPal's global form-fields handler
    const ppKey = `__pp_form_fields_${hostedButtonId}`;
    if (window[ppKey]) {
      wrapPP(window[ppKey]);
    }
  }, [hostedButtonId, wrapPP]);

  // Intercept PayPal's registration of __pp_form_fields_{hostedButtonId}
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ppKey = `__pp_form_fields_${hostedButtonId}`;
    let currentPP = window[ppKey];

    if (currentPP) {
      wrapPP(currentPP);
    }

    try {
      Object.defineProperty(window, ppKey, {
        configurable: true,
        enumerable: true,
        get: () => currentPP,
        set: (val) => {
          currentPP = wrapPP(val);
        },
      });
    } catch {
      // If already defined or non-configurable, wrap existing
      if (window[ppKey]) {
        wrapPP(window[ppKey]);
      }
    }
  }, [hostedButtonId, wrapPP]);

  // Sync whenever quantity changes or button finishes loading
  useEffect(() => {
    syncQuantity(quantity);
  }, [quantity, loaded, syncQuantity]);

  // Watch for DOM mutations in case PayPal inserts the select element asynchronously
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new MutationObserver(() => {
      syncQuantity(quantityRef.current);
    });

    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [syncQuantity]);

  // Mount PayPal Hosted Button ONCE
  useEffect(() => {
    let script = document.getElementById("paypal-sdk-script") as HTMLScriptElement | null;
    let isMounted = true;

    const renderButton = () => {
      if (!isMounted || !containerRef.current || !window.paypal?.HostedButtons) return;

      // Ensure container is empty before initial render
      containerRef.current.innerHTML = "";

      try {
        window.paypal
          .HostedButtons({
            hostedButtonId: hostedButtonId,
            onApprove: (data: any) => {
              if (onPaymentSuccessRef.current) {
                onPaymentSuccessRef.current(data);
              }
            },
          })
          .render(`#${containerId}`)
          .then(() => {
            if (isMounted) {
              setLoaded(true);
              syncQuantity(quantityRef.current);
            }
          })
          .catch((err: any) => {
            console.error("PayPal HostedButtons render error:", err);
            if (isMounted) setError(true);
          });
      } catch (e) {
        console.error("PayPal HostedButtons error:", e);
        if (isMounted) setError(true);
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.id = "paypal-sdk-script";
      script.src =
        "https://www.paypal.com/sdk/js?client-id=BAAkHmhj1HuRPUaru4wxfoYoL1msUAP6SiMcEDAlBSVDpckP2h575o2RNM52S_i-cYuefXC8E5F5dnzmn8&components=hosted-buttons&disable-funding=venmo&currency=USD";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = () => {
        renderButton();
      };
      script.onerror = () => {
        if (isMounted) setError(true);
      };
      document.head.appendChild(script);
    } else {
      if (window.paypal?.HostedButtons) {
        renderButton();
      } else {
        script.addEventListener("load", renderButton);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [hostedButtonId, containerId, syncQuantity]);

  return (
    <div className={`w-full space-y-3 ${className}`}>
      {/* Strictly hide all PayPal un-styled form fields, labels, headings, and dropdowns */}
      <style>{`
        #${containerId} select,
        #${containerId} label,
        #${containerId} h1,
        #${containerId} h2,
        #${containerId} h3,
        #${containerId} h4,
        #${containerId} p,
        #${containerId} .paypal-item-name,
        #${containerId} .paypal-item-price,
        #${containerId} .paypal-quantity-container,
        #${containerId} .selectContainer,
        #${containerId} .input-label,
        #${containerId} .item-header,
        #${containerId} [data-testid="quantity-container"] {
          display: none !important;
        }
      `}</style>

      {/* Container where PayPal renders official hosted button */}
      <div id={containerId} ref={containerRef} className="min-h-[48px] w-full" />

      {/* Fallback button if SDK fails to load or offline */}
      {(!loaded || error) && (
        <a
          href={`https://www.paypal.com/ncp/payment/${hostedButtonId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-6 rounded-[4px] bg-[#0070BA] hover:bg-[#003087] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.784.784 0 0 1 .773-.655h6.39c3.085 0 5.485.674 6.758 2.056 1.156 1.254 1.488 2.924 1.015 5.093-.728 3.344-2.898 5.163-6.273 5.163h-2.91a.784.784 0 0 0-.773.655l-1.025 5.305h-.823z" />
          </svg>
          Pay with PayPal (${amount.toFixed(2)})
        </a>
      )}

      <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#4A505C] dark:text-[#C0C4CC]">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-[1.5]">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>Encrypted 256-Bit SSL PayPal Direct Checkout</span>
      </div>
    </div>
  );
}
