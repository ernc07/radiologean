"use client";
import { useRef } from "react";

export default function FooterErnc() {
  const footerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (footerRef.current) {
      footerRef.current.style.setProperty("--mask-x", `${x}px`);
      footerRef.current.style.setProperty("--mask-y", `${y}px`);
    }
  };

  const handleMouseLeave = () => {
    if (footerRef.current) {
      footerRef.current.style.setProperty("--mask-x", `-9999px`);
      footerRef.current.style.setProperty("--mask-y", `-9999px`);
    }
  };

  return (
    <div
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "fixed",
        right: "2vw",
        bottom: "2vh",
        zIndex: 100,
        fontFamily: "'Montserrat', 'Orbitron', sans-serif",
        fontWeight: 600,
        fontSize: "0.95rem",
        color: "#e0eafc",
        background: "rgba(10,20,30,0.85)",
        padding: "0.28em 1em",
        borderRadius: "1em",
        boxShadow: "0 2px 12px #0008",
        letterSpacing: "0.13em",
        userSelect: "none",
        pointerEvents: "auto",
        opacity: 0.65,
        filter: "blur(1.2px)",
        transition: "opacity 0.4s, filter 0.4s, background 0.4s",
        WebkitMaskImage: "radial-gradient(circle 38px at var(--mask-x, -9999px) var(--mask-y, -9999px), white 80%, transparent 100%)",
        maskImage: "radial-gradient(circle 38px at var(--mask-x, -9999px) var(--mask-y, -9999px), white 80%, transparent 100%)",
      }}
    >
      CRAFTED BY ERNC
    </div>
  );
}