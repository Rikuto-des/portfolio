import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2000; // 2 seconds total
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    // Complete after animation + slight delay
    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration + 500);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-foreground text-background overflow-hidden"
      exit={{ 
        y: "-100%", 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(var(--background) 2px, transparent 2px)', backgroundSize: '40px 40px' }} 
      />

      {/* Decorative Shapes */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] border-[2px] border-primary/20 rounded-full border-dashed"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[400px] h-[400px] border-[2px] border-secondary/20 rounded-full border-dashed"
      />

      {/* Counter */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-baseline">
          <span className="text-9xl md:text-[12rem] font-black font-heading tracking-tighter leading-none">
            {Math.round(count)}
          </span>
          <span className="text-4xl md:text-6xl font-black font-heading text-primary">%</span>
        </div>
        
        {/* Loading Bar */}
        <div className="w-64 h-2 bg-background/20 rounded-full mt-8 overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            style={{ width: `${count}%` }}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-xl font-bold uppercase tracking-widest text-background/60"
        >
          Loading Portfolio...
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
