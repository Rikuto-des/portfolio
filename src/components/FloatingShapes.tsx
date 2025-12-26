import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const shapes = [
  // Cyber Circle (Wireframe)
  {
    type: 'cyber-circle',
    color: 'border-primary',
    size: 'w-24 h-24 md:w-32 md:h-32',
    initial: { x: '10vw', y: '15vh' },
    speed: 0.5,
  },
  // Data Square
  {
    type: 'data-square',
    color: 'border-secondary',
    size: 'w-16 h-16 md:w-24 md:h-24',
    initial: { x: '85vw', y: '10vh' },
    speed: 0.8,
  },
  // Glitch Triangle
  {
    type: 'glitch-triangle',
    color: 'bg-accent',
    size: 'w-20 h-20 md:w-28 md:h-28',
    initial: { x: '5vw', y: '45vh' },
    speed: 0.3,
  },
  // Code Cross
  {
    type: 'code-cross',
    color: 'text-primary',
    size: 'text-6xl md:text-8xl',
    initial: { x: '90vw', y: '60vh' },
    speed: 0.6,
  },
  // Hexagon
  {
    type: 'hexagon',
    color: 'border-accent',
    size: 'w-24 h-24 md:w-32 md:h-32',
    initial: { x: '15vw', y: '85vh' },
    speed: 0.4,
  },
  // Binary Pill
  {
    type: 'binary-pill',
    color: 'border-secondary',
    size: 'w-32 h-10 md:w-48 md:h-14',
    initial: { x: '80vw', y: '35vh' },
    speed: 0.7,
  }
];

const FloatingShapes = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {shapes.map((shape, i) => {
        const y = useTransform(scrollYProgress, [0, 1], [0, shape.speed * 500 * (i % 2 === 0 ? 1 : -1)]);
        const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 * (i % 2 === 0 ? 1 : -1)]);
        const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]);

        return (
          <motion.div
            key={i}
            style={{ 
              x: shape.initial.x, 
              y: shape.initial.y, 
              translateY: y,
              rotate,
              opacity
            }}
            className="absolute transition-opacity duration-300 will-change-transform mix-blend-screen"
          >
            {shape.type === 'cyber-circle' && (
              <div className={`${shape.size} ${shape.color} rounded-full border-[1px] md:border-2 relative`}>
                <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-spin-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_var(--primary)]" />
              </div>
            )}
            
            {shape.type === 'data-square' && (
              <div className={`${shape.size} ${shape.color} border-[1px] md:border-2 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-secondary/10" />
                <motion.div 
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-x-0 h-[2px] bg-secondary shadow-[0_0_5px_var(--secondary)]"
                />
              </div>
            )}
            
            {shape.type === 'glitch-triangle' && (
              <div className="relative">
                <div 
                  className={`${shape.size} border-2 border-accent`} 
                  style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} 
                />
                 <div 
                  className={`${shape.size} bg-accent/20 absolute top-1 left-1 blur-sm`} 
                  style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} 
                />
              </div>
            )}
            
            {shape.type === 'code-cross' && (
              <div className={`font-heading font-black ${shape.size} ${shape.color} select-none relative`}>
                +
                <span className="absolute top-0 left-0 text-secondary opacity-50 blur-[2px]">+</span>
              </div>
            )}
            
            {shape.type === 'hexagon' && (
              <div 
                className={`${shape.size} ${shape.color} border-2`}
                style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
              >
                <div className="w-full h-full bg-accent/5 backdrop-blur-sm" />
              </div>
            )}
            
            {shape.type === 'binary-pill' && (
              <div className={`${shape.size} ${shape.color} rounded-full border border-dashed flex items-center justify-center overflow-hidden`}>
                <div className="font-mono text-xs text-secondary/50 whitespace-nowrap">
                  1011010010101101
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingShapes;
