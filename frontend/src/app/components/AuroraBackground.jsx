"use client";
import React from "react";

export const AuroraBackground = ({
  className = "",
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <div
      className={`relative flex flex-col min-h-screen w-full bg-[#050505] transition-bg overflow-hidden ${className}`}
      {...props}
    >
      {/* 🟢 ACCELERATED & ENHANCED GOLDEN WAVE MOVEMENT HACK */}
      <style>{`
        @keyframes aurora-wave-move {
          0% {
            background-position: 0% 50%, 0% 50%;
          }
          50% {
            background-position: 100% 100%, 50% 100%;
          }
          100% {
            background-position: 200% 50%, 0% 50%;
          }
        }
        .animate-aurora-active {
          background-size: 200% 200%, 200% 200%;
          animation: aurora-wave-move 20s ease-in-out infinite; /* Derived data: Slightly faster (20s) for more visual activity */
        }
      `}</style>

      {/* 🟢 BRIGHTER TURBULENT GOLDEN WAVES CONTAINER (Derived Data: Strictly 65% Opacity) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={`
            absolute -inset-[10px] opacity-65 will-change-transform filter blur-[24px]
            [--aurora-color-1:#D4AF37] /* Derived Data: Metallic Gold */
            [--aurora-color-2:#FFD700] /* Derived Data: Pure Gold */
            [--aurora-color-3:#F5DEB3] /* Derived Data: Wheat/Cream Highlight */
            [--aurora-color-4:#E6C37A] /* Derived Data: Pale Gold */
            [background-image:radial-gradient(circle_at_100%_0%,var(--aurora-color-1)_0%,transparent_50%),radial-gradient(circle_at_0%_100%,var(--aurora-color-2)_0%,transparent_50%),linear-gradient(135deg,var(--aurora-color-3)_10%,transparent_40%),linear-gradient(225deg,var(--aurora-color-4)_20%,transparent_60%)]
            animate-aurora-active
            ${showRadialGradient ? "[mask-image:radial-gradient(ellipse_at_100%_0%,black_50%,transparent_95%)]" : ""}
          `}
        ></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
};