import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full py-16 md:py-24">
      <article className="max-w-[760px] mx-auto px-6 space-y-12">
        {/* Header */}
        <header className="space-y-4 pb-8 border-b border-[#E2E4E8] dark:border-[#2E323B]">
          <div className="text-xs font-mono uppercase tracking-wider text-[#4A505C] dark:text-[#C0C4CC]">
            Legal Document / Version 1.1.0
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#121316] dark:text-[#FFFFFF]">
            Data and Privacy Policy
          </h1>
          <p className="text-xs font-mono text-[#4A505C] dark:text-[#C0C4CC]">
            EFFECTIVE DATE: SEPTEMBER 2026 / REGISTRATION: ALUVION CAMERA SYSTEMS
          </p>
        </header>

        {/* Content Sections */}
        <div className="space-y-10 text-xs sm:text-sm text-[#4A505C] dark:text-[#C0C4CC] leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-[#121316] dark:text-[#FFFFFF]">
              1. Data Collection Policy
            </h2>
            <p>
              Aluvion collects information necessary to fulfill hardware purchases, process international dispatches, and maintain equipment warranty records. When you interact with our platform or submit an order, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Customer contact details: full legal name, shipping destination address, and phone contact number.</li>
              <li>Order transactional records: itemized catalog selections, selected camera finishes, and payment confirmation tokens.</li>
              <li>Checkout interaction timestamps: session identifiers required to prevent duplicate order generation.</li>
            </ul>
            <p>
              Payment credentials, including raw credit card details or bank logins, are handled exclusively through secure external processors (such as PayPal) and are never stored on Aluvion web servers.
            </p>
          </section>

          {/* Section 2 */}
          <section id="cookies" className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-[#121316] dark:text-[#FFFFFF]">
              2. Cookie and Local Storage Policy
            </h2>
            <p>
              Our website utilizes browser local storage and essential session cookies to deliver standard store features without requiring account registration. Specifically:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                <strong className="text-[#121316] dark:text-[#FFFFFF]">aluvion_theme:</strong> Records your light or dark mode display preference to eliminate visual flashes during page transitions.
              </li>
              <li>
                <strong className="text-[#121316] dark:text-[#FFFFFF]">aluvion_cart:</strong> Retains your active basket selections, quantities, and chosen camera colorways between visits.
              </li>
              <li>
                <strong className="text-[#121316] dark:text-[#FFFFFF]">aluvion_cookie_consent:</strong> Retains your consent authorization record for a duration of 180 days.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-[#121316] dark:text-[#FFFFFF]">
              3. Analytics Disclosure
            </h2>
            <p>
              To maintain system stability and optimize page rendering times, we log aggregated, non-identifying telemetry. These metrics include browser engine type, viewport dimensions, page delivery latency, and HTTP response codes. No individual profiling, third-party advertising cookies, or cross-site tracking scripts are installed.
            </p>
          </section>

          {/* Section 4 */}
          <section id="gdpr" className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-[#121316] dark:text-[#FFFFFF]">
              4. User Rights Under GDPR and CCPA
            </h2>
            <p>
              Under the European Union General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), visitors and customers retain explicit statutory rights:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>The right to request disclosure of all personal records retained by our system.</li>
              <li>The right to request immediate erasure of your dispatch records, subject to legal financial retention requirements.</li>
              <li>The right to withdraw cookie consent at any time via your browser settings or our preferences dialog.</li>
              <li>The right to equal service and non-discrimination when exercising data privacy entitlements.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-heading font-bold text-lg text-[#121316] dark:text-[#FFFFFF]">
              5. Support Contact and Data Inquiries
            </h2>
            <p>
              For questions concerning data collection, warranty records, or to submit a formal record removal request, contact our administrative compliance desk:
            </p>
            <div className="p-4 aluvion-card space-y-1 font-mono text-xs">
              <div className="font-semibold text-[#121316] dark:text-[#FFFFFF]">Aluvion Compliance Desk</div>
              <div>Email: <a href="mailto:jinglespinofficial@gmail.com" className="underline">jinglespinofficial@gmail.com</a></div>
              <div>Operating Jurisdiction: Tokyo, Japan / Worldwide Dispatch Hub</div>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-[#E2E4E8] dark:border-[#2E323B] flex items-center justify-between text-xs">
          <Link href="/" className="font-semibold text-[#121316] dark:text-[#FFFFFF] hover:underline">
            &larr; Return to Homepage
          </Link>
          <Link href="/products" className="font-semibold text-[#121316] dark:text-[#FFFFFF] hover:underline">
            Browse Product Catalog
          </Link>
        </div>
      </article>
    </div>
  );
}
