import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [hoverState, setHoverState] = useState<"none" | "watch" | "explore" | "view" | "enter" | "pointer">("none");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Motion values for smooth cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is mobile / touch-enabled
    const checkDevice = () => {
      const mobile = 
        "ontouchstart" in window || 
        navigator.maxTouchPoints > 0 || 
        window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsVisible(true);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible && !isMobile) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Event listener for hover state tracking
    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find closest interactive element
      const watchEl = target.closest(".cursor-hover-watch");
      const exploreEl = target.closest(".cursor-hover-explore");
      const viewEl = target.closest(".cursor-hover-view");
      const enterEl = target.closest(".cursor-hover-enter");
      const standardClickable = target.closest("button, a, [role='button'], input, select, textarea");

      if (watchEl) {
        setHoverState("watch");
      } else if (exploreEl) {
        setHoverState("explore");
      } else if (viewEl) {
        setHoverState("view");
      } else if (enterEl) {
        setHoverState("enter");
      } else if (standardClickable) {
        setHoverState("pointer");
      } else {
        setHoverState("none");
      }
    };

    window.addEventListener("mouseover", updateHoverState);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", updateHoverState);
    };
  }, [cursorX, cursorY, isVisible, isMobile]);

  if (isMobile || !isVisible) return null;

  // Custom styling and text for different hover states
  const getCursorProps = () => {
    switch (hoverState) {
      case "watch":
        return {
          width: 80,
          height: 80,
          backgroundColor: "rgba(181, 12, 27, 0.9)", // Brand red
          borderColor: "#ffffff",
          borderWidth: 2,
          text: "WATCH",
          glow: "0 0 30px rgba(181, 12, 27, 0.8)",
        };
      case "explore":
        return {
          width: 90,
          height: 90,
          backgroundColor: "rgba(15, 15, 15, 0.85)", // Dark surface
          borderColor: "rgba(255, 255, 255, 0.6)",
          borderWidth: 1,
          text: "EXPLORE",
          glow: "0 0 20px rgba(255, 255, 255, 0.2)",
        };
      case "view":
        return {
          width: 80,
          height: 80,
          backgroundColor: "rgba(212, 175, 55, 0.9)", // Gold
          borderColor: "#ffffff",
          borderWidth: 2,
          text: "VIEW",
          glow: "0 0 30px rgba(212, 175, 55, 0.8)",
        };
      case "enter":
        return {
          width: 80,
          height: 80,
          backgroundColor: "rgba(181, 12, 27, 0.95)", // Brand red glow
          borderColor: "#ffffff",
          borderWidth: 2,
          text: "ENTER",
          glow: "0 0 35px rgba(181, 12, 27, 0.9)",
        };
      case "pointer":
        return {
          width: 24,
          height: 24,
          backgroundColor: "rgba(181, 12, 27, 0.4)",
          borderColor: "rgba(181, 12, 27, 1)",
          borderWidth: 2,
          text: "",
          glow: "0 0 15px rgba(181, 12, 27, 0.5)",
        };
      default:
        return {
          width: 10,
          height: 10,
          backgroundColor: "#b5121b",
          borderColor: "transparent",
          borderWidth: 0,
          text: "",
          glow: "0 0 10px rgba(181, 12, 27, 0.3)",
        };
    }
  };

  const cursorProps = getCursorProps();

  return (
    <>
      {/* Lagging outer smooth circle cursor */}
      <motion.div
        style={{
          position: "fixed",
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          boxShadow: cursorProps.glow,
        }}
        animate={{
          width: cursorProps.width,
          height: cursorProps.height,
          backgroundColor: cursorProps.backgroundColor,
          border: `${cursorProps.borderWidth}px solid ${cursorProps.borderColor}`,
          borderRadius: "50%",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.2 }}
        className="flex items-center justify-center font-display font-bold text-[10px] tracking-widest text-white select-none pointer-events-none uppercase overflow-hidden"
      >
        {cursorProps.text && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            {cursorProps.text}
          </motion.span>
        )}
      </motion.div>

      {/* Instant pinpoint inner dot */}
      <div
        className="fixed w-2 h-2 rounded-full bg-white mix-blend-difference pointer-events-none z-9999"
        style={{
          left: `${cursorX.get()}px`,
          top: `${cursorY.get()}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
