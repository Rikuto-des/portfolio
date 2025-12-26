import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "text" | "button">("default");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Determine cursor type based on element
      if (target.tagName === 'A' || target.closest('a')) {
        setCursorType("pointer");
      } else if (target.tagName === 'BUTTON' || target.closest('button') || target.getAttribute('role') === 'button') {
        setCursorType("button");
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        setCursorType("text");
      } else {
        setCursorType("default");
      }
    };

    // Hide default cursor
    document.body.style.cursor = 'none';

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Center Dot */}
      <motion.div
        className="absolute bg-primary rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          width: cursorType === "text" ? 2 : 4,
          height: cursorType === "text" ? 20 : 4,
        }}
      />

      {/* Outer Ring / Brackets */}
      <motion.div
        className="absolute flex items-center justify-center border border-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          width: cursorType === "default" ? 24 : 48,
          height: cursorType === "default" ? 24 : 48,
          borderRadius: cursorType === "button" ? "0%" : "50%",
          rotate: cursorType === "pointer" ? 45 : 0,
          scale: cursorType === "text" ? 0 : 1,
          borderColor: cursorType === "button" ? "var(--primary)" : "rgba(var(--primary), 0.5)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Crosshair lines for default state */}
        {cursorType === "default" && (
          <>
            <div className="absolute top-1/2 -left-1 w-1 h-[1px] bg-primary" />
            <div className="absolute top-1/2 -right-1 w-1 h-[1px] bg-primary" />
            <div className="absolute -top-1 left-1/2 w-[1px] h-1 bg-primary" />
            <div className="absolute -bottom-1 left-1/2 w-[1px] h-1 bg-primary" />
          </>
        )}
      </motion.div>
      
      {/* Text label for buttons */}
      <motion.div 
        className="absolute top-6 left-6 text-[10px] font-mono text-primary font-bold whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: cursorType === "button" || cursorType === "pointer" ? 1 : 0 }}
      >
        {cursorType === "button" ? "CLICK" : cursorType === "pointer" ? "LINK" : ""}
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
