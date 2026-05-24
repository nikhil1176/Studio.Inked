"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}) => {
  return (
    <div
      className={cn(
        "relative group p-px overflow-hidden rounded-[24px]",
        containerClassName
      )}
    >
      {/* Default Aceternity Gradient */}
      <div
  className="absolute -inset-1.75 rounded-[30px] z-1 opacity-75 blur-lg transition-all duration-300 group-hover:opacity-100 group-hover:blur-xl pointer-events-none"
  style={{
    background: `
      linear-gradient(
        135deg,
        rgba(255,90,120,1),
        rgba(180,80,255,1),
        rgba(0,200,255,1)
      )
    `,
  }}
/>

      {/* Inner Card */}
      <div
        className={cn(
          "relative z-10 h-full w-full rounded-[22px] bg-[#0b0b0b]/95 backdrop-blur-xl border border-white/10",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};