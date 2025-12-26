import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Terminal, Cpu, Wifi } from "lucide-react";

const bootLogs = [
  "INITIALIZING_KERNEL...",
  "LOADING_INTERFACE_MODULES...",
  "ESTABLISHING_SECURE_CONNECTION...",
  "DECRYPTING_USER_DATA...",
  "MOUNTING_FILE_SYSTEM...",
  "RENDERING_GRAPHICS_ENGINE...",
  "SYSTEM_READY."
];

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Progress Timer
    const duration = 2500;
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

    // Log update timer
    const logInterval = setInterval(() => {
      setLogIndex(prev => (prev < bootLogs.length - 1 ? prev + 1 : prev));
    }, duration / bootLogs.length);

    // Completion sequence
    const completeTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 800); // Wait for exit animation
    }, duration + 500);

    return () => {
      clearInterval(timer);
      clearInterval(logInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black text-primary font-mono overflow-hidden cursor-wait"
          exit={{ 
            scaleY: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Scanline Background */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_4px,3px_100%]" />
          <div className="absolute inset-0 bg-grid opacity-10" />

          <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
            {/* Header Status */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <span className="text-xs tracking-widest opacity-50">BIOS_VER_2.0.24</span>
                <div className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full ${count > 20 ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                  CPU_CORE: {count > 20 ? 'ONLINE' : 'WAITING'}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full ${count > 50 ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                  MEMORY: {count > 50 ? 'OK' : 'CHECKING'}
                </div>
              </div>
              <div className="text-right">
                <Cpu className="w-8 h-8 opacity-50 animate-spin-slow" />
              </div>
            </div>

            {/* Center Content */}
            <div className="w-full max-w-2xl mx-auto space-y-8">
              {/* Boot Logs */}
              <div className="h-32 overflow-hidden border-l-2 border-primary/30 pl-4 font-mono text-sm space-y-1 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                {bootLogs.slice(0, logIndex + 1).map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-primary/80"
                  >
                    <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
                    {log}
                  </motion.div>
                ))}
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="w-2 h-4 bg-primary inline-block align-middle ml-1"
                />
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs tracking-widest uppercase">
                  <span>System Loading</span>
                  <span>{Math.round(count)}%</span>
                </div>
                <div className="h-1 w-full bg-primary/20 relative overflow-hidden">
                  <motion.div
                    className="h-full bg-primary relative"
                    style={{ width: `${count}%` }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_10px_white]" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Footer Status */}
            <div className="flex justify-between items-end text-xs opacity-50">
              <div className="flex items-center gap-2">
                <Terminal size={14} />
                <span>TERMINAL_ACCESS_GRANTED</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi size={14} />
                <span>NET_SECURE</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
