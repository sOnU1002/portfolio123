"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const SPRING = { stiffness: 500, damping: 28, mass: 0.5 };
const RING_SPRING = { stiffness: 150, damping: 20, mass: 0.8 };

export default function CustomCursor() {
  const { resolvedTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringX = useSpring(cursorX, RING_SPRING);
  const ringY = useSpring(cursorY, RING_SPRING);
  const dotX = useSpring(cursorX, SPRING);
  const dotY = useSpring(cursorY, SPRING);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasFinePointer) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const onHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, label, select")) {
        setIsHovering(true);
      }
    };

    const onHoverEnd = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, label, select")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onHoverStart);
    document.addEventListener("mouseout", onHoverEnd);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onHoverStart);
      document.removeEventListener("mouseout", onHoverEnd);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  const isDark = resolvedTheme === "dark";
  const dotColor = isDark ? "#a78bfa" : "#ea580c";
  const ringColor = isDark ? "rgba(167, 139, 250, 0.5)" : "rgba(234, 88, 12, 0.45)";
  const glowColor = isDark ? "rgba(139, 92, 246, 0.4)" : "rgba(249, 115, 22, 0.35)";

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.8 : isHovering ? 2.2 : 1,
        }}
        transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.2 } }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-colors duration-300"
          style={{
            width: isHovering ? 48 : 36,
            height: isHovering ? 48 : 36,
            borderColor: ringColor,
            boxShadow: `0 0 20px ${glowColor}`,
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.5 : isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 8,
            height: 8,
            backgroundColor: dotColor,
            boxShadow: `0 0 12px ${glowColor}, 0 0 24px ${glowColor}`,
          }}
        />
      </motion.div>

      {/* Trailing spark */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: isVisible && !isHovering ? 0.4 : 0 }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
          style={{
            width: 20,
            height: 20,
            backgroundColor: glowColor,
          }}
        />
      </motion.div>
    </>
  );
}
