import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E4E8] dark:border-[#24272E] bg-[#F8F9FA] dark:bg-[#1A1C20] text-[#4A505C] dark:text-[#C0C4CC] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 border-b border-[#E2E4E8] dark:border-[#2E323B]">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 border border-[#121316] dark:border-[#E2E4E8] rounded-[4px] flex items-center justify-center p-1">
                <svg viewBox="0 0 24 24" className="w-full h-full stroke-[#121316] dark:stroke-[#FFFFFF] fill-none stroke-[1.5]">
                  <rect x="2" y="2" width="20" height="20" rx="2" />
                  <circle cx="12" cy="12" r="5" />
                </svg>
              </div>
              <span className="font-heading font-bold text-lg tracking-wider text-[#121316] dark:text-[#FFFFFF]">
                ALUVION
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              Compact digital cameras designed for everyday photography and video recording.
            </p>
          </div>

          {/* Col 2: Policy & Support */}
          <div className="space-y-3 md:justify-self-end">
            <h3 className="font-heading text-xs uppercase tracking-wider font-semibold text-[#121316] dark:text-[#FFFFFF]">
              Policy &amp; Support
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy-policy" className="hover:text-[#121316] dark:hover:text-[#FFFFFF] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy#cookies" className="hover:text-[#121316] dark:hover:text-[#FFFFFF] transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy#gdpr" className="hover:text-[#121316] dark:hover:text-[#FFFFFF] transition-colors">
                  GDPR and CCPA Rights
                </Link>
              </li>
              <li>
                <a href="mailto:jinglespinofficial@gmail.com" className="hover:text-[#121316] dark:hover:text-[#FFFFFF] transition-colors">
                  jinglespinofficial@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4A505C] dark:text-[#C0C4CC]">
          <div>
            &copy; {new Date().getFullYear()} rkm. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Everyday Photography and Video Recording</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
