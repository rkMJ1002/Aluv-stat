"use client";

import React, { useState } from "react";

interface AccordionItem {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || ""]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className="border border-[#E2E4E8] dark:border-[#2E323B] rounded-[4px] bg-white dark:bg-[#1A1C20] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full py-3.5 px-4 flex items-center justify-between text-left text-xs font-semibold uppercase tracking-wider text-[#121316] dark:text-[#FFFFFF] hover:bg-[#F8F9FA] dark:hover:bg-[#121316] transition-colors duration-150"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              {/* Geometric plus/minus SVG (1.5px stroke) */}
              <svg
                viewBox="0 0 24 24"
                className={`w-4 h-4 stroke-current fill-none stroke-[1.5] transition-transform duration-150 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 pt-1 text-xs text-[#4A505C] dark:text-[#C0C4CC] leading-relaxed border-t border-[#E2E4E8] dark:border-[#2E323B]">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
