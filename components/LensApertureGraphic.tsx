import React from "react";

export default function LensApertureGraphic() {
  return (
    <div className="w-32 h-32 mx-auto border border-[#121316] dark:border-[#E2E4E8] rounded-[4px] p-4 flex items-center justify-center bg-white dark:bg-[#1A1C20]">
      {/* Monochromatic geometric SVG line graphic of an open lens aperture (1.5px stroke) */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full stroke-[#121316] dark:stroke-[#FFFFFF] fill-none stroke-[1.5]"
      >
        {/* Outer barrel ring */}
        <circle cx="50" cy="50" r="44" />
        <circle cx="50" cy="50" r="36" strokeDasharray="3,3" />

        {/* Inner aperture ring */}
        <circle cx="50" cy="50" r="22" />

        {/* 6 Geometric aperture blades */}
        <line x1="50" y1="28" x2="68" y2="38" />
        <line x1="68" y1="38" x2="68" y2="62" />
        <line x1="68" y1="62" x2="50" y2="72" />
        <line x1="50" y1="72" x2="32" y2="62" />
        <line x1="32" y1="62" x2="32" y2="38" />
        <line x1="32" y1="38" x2="50" y2="28" />

        {/* Central optical axis */}
        <circle cx="50" cy="50" r="6" />
      </svg>
    </div>
  );
}
