import React from "react";
import Link from "next/link";
import LensApertureGraphic from "@/components/LensApertureGraphic";

export default function NotFound() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center py-16 md:py-24">
      <div className="max-w-md mx-auto px-6 text-center space-y-8">
        <LensApertureGraphic />

        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-[#4A505C] dark:text-[#C0C4CC]">
            Optical Field Obstruction
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#121316] dark:text-[#FFFFFF]">
            404: Lens Cap On
          </h1>
          <p className="text-xs sm:text-sm text-[#4A505C] dark:text-[#C0C4CC] leading-relaxed">
            The page you are looking for has been moved, renamed, or does not exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto btn-solid btn-solid-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-center"
          >
            Return to Homepage
          </Link>
          <Link
            href="/products/pocket-4k"
            className="w-full sm:w-auto btn-solid btn-outline px-6 py-3 text-xs font-semibold tracking-wider uppercase text-center"
          >
            Pocket 4K Camera
          </Link>
        </div>
      </div>
    </div>
  );
}
