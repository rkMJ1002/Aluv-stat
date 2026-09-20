"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("aluvion_cookie_consent");
      if (stored) {
        const data = JSON.parse(stored);
        const now = Date.now();
        // 180 days in milliseconds
        const maxAge = 180 * 24 * 60 * 60 * 1000;
        if (now - data.timestamp < maxAge) {
          return;
        }
      }
    } catch {
      // If error, continue to display
    }

    // Displays 1.5 seconds after initial visit
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true });
  };

  const handleSavePreferences = () => {
    saveConsent({ necessary: true, analytics: analyticsAllowed });
    setShowPreferences(false);
  };

  const saveConsent = (preferences: { necessary: boolean; analytics: boolean }) => {
    try {
      localStorage.setItem(
        "aluvion_cookie_consent",
        JSON.stringify({
          preferences,
          timestamp: Date.now(),
        })
      );
    } catch {
      // Ignore write errors
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Banner */}
      <div
        role="region"
        aria-label="Cookie and Privacy Consent"
        className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50 p-5 rounded-[4px] bg-white dark:bg-[#1A1C20] border border-[#121316] dark:border-[#E2E4E8] shadow-lg transition-transform duration-150"
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <span className="font-heading font-bold text-sm text-[#121316] dark:text-[#FFFFFF] uppercase tracking-wider">
              Cookie Settings
            </span>
          </div>
          <p className="text-xs text-[#4A505C] dark:text-[#C0C4CC] leading-relaxed">
            This site uses necessary cookies for cart management and anonymous analytics to improve the store experience.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleAcceptAll}
              className="btn-solid btn-solid-primary text-xs px-4 py-2 font-medium"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={() => setShowPreferences(true)}
              className="btn-solid btn-outline text-xs px-4 py-2 font-medium"
            >
              Preferences
            </button>
            <Link
              href="/privacy-policy"
              className="text-xs text-[#4A505C] dark:text-[#C0C4CC] hover:text-[#121316] dark:hover:text-[#FFFFFF] underline px-2 py-2"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60">
          <div className="w-full max-w-lg bg-white dark:bg-[#1A1C20] border border-[#121316] dark:border-[#E2E4E8] rounded-[4px] p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E4E8] dark:border-[#2E323B]">
              <h3 className="font-heading font-bold text-base text-[#121316] dark:text-[#FFFFFF]">
                Cookie Preferences
              </h3>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="text-xs font-mono uppercase px-2 py-1 text-[#4A505C] dark:text-[#C0C4CC] hover:text-[#121316] dark:hover:text-[#FFFFFF]"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 border border-[#E2E4E8] dark:border-[#2E323B] rounded-[4px] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#121316] dark:text-[#FFFFFF]">
                    Essential &amp; Cart Management
                  </div>
                  <div className="text-[#4A505C] dark:text-[#C0C4CC]">
                    Required for basket retention, session storage, and security.
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-1 bg-[#E2E4E8] dark:bg-[#2E323B] text-[#121316] dark:text-[#FFFFFF] rounded-[2px]">
                  Always Active
                </span>
              </div>

              <div className="p-3 border border-[#E2E4E8] dark:border-[#2E323B] rounded-[4px] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#121316] dark:text-[#FFFFFF]">
                    Anonymous Usage Analytics
                  </div>
                  <div className="text-[#4A505C] dark:text-[#C0C4CC]">
                    Evaluates interaction metrics without collecting personal identifiers.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsAllowed}
                  onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                  className="w-4 h-4 rounded-[2px] accent-[#121316] dark:accent-[#FFFFFF]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E4E8] dark:border-[#2E323B]">
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="btn-solid btn-outline text-xs px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="btn-solid btn-solid-primary text-xs px-4 py-2"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
