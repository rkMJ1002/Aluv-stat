"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/cart");
  }, [router]);

  return (
    <div className="w-full py-24 text-center">
      <p className="text-xs font-mono text-[#4A505C] dark:text-[#C0C4CC]">
        Redirecting to shopping bag...
      </p>
    </div>
  );
}
