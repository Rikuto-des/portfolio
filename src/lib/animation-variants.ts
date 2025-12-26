import type { Variants } from "framer-motion";

// Cyberpunk reveal animation using clip-path
export const cyberReveal: Variants = {
  hidden: { 
    opacity: 0,
    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
    filter: "brightness(1.5) contrast(1.2)"
  },
  visible: {
    opacity: 1,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    filter: "brightness(1) contrast(1)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Glitch text entrance
export const glitchIn: Variants = {
  hidden: { 
    opacity: 0,
    x: -10,
    textShadow: "2px 0 #00fff9, -2px 0 #ff00c1"
  },
  visible: {
    opacity: 1,
    x: 0,
    textShadow: "0px 0 transparent, 0px 0 transparent",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      duration: 0.3
    }
  }
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// Scanline vertical wipe
export const scanlineReveal: Variants = {
  hidden: { 
    opacity: 0,
    height: 0,
    borderBottom: "2px solid var(--primary)"
  },
  visible: {
    opacity: 1,
    height: "auto",
    borderBottom: "0px solid transparent",
    transition: {
      duration: 1.2,
      ease: "easeInOut"
    }
  }
};

// Pop up with scale
export const techPop: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotateX: 45
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
};
