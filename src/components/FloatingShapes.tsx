import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const shapes = [
  // Cyber Circle (Wireframe)
  {
    type: 'cyber-circle',
    color: 'border-primary',
    size: 'w-32 h-32 md:w-48 md:h-48',
    initial: { x: '5vw', y: '10vh' },
    speed: 0.2,
  },
  // Data Grid
  {
    type: 'data-grid',
    color: 'bg-secondary',
    size: 'w-24 h-24 md:w-32 md:h-32',
    initial: { x: '85vw', y: '15vh' },
    speed: 0.5,
  },
  // Glitch Triangle
  {
    type: 'glitch-triangle',
    color: 'border-accent',
    size: 'w-20 h-20 md:w-28 md:h-28',
    initial: { x: '10vw', y: '50vh' },
    speed: 0.3,
  },
  // Hexagon Outline
  {
    type: 'hexagon',
    color: 'border-primary',
    size: 'w-40 h-40 md:w-56 md:h-56',
    initial: { x: '80vw', y: '65vh' },
    speed: 0.4,
  },
  // Code Snippet
  {
    type: 'code-snippet',
    color: 'text-muted-foreground',
    size: 'text-xs',
    initial: { x: '15vw', y: '85vh' },
    speed: 0.6,
  },
  // Binary Stream
  {
    type: 'binary',
    color: 'text-primary',
    size: 'text-xs',
    initial: { x: '70vw', y: '30vh' },
    speed: 0.8,
  }
];

const FloatingShapes = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {shapes.map((shape, i) => {
        const y = useTransform(scrollYProgress, [0, 1], [0, shape.speed * 300 * (i % 2 === 0 ? 1 : -1)]);
        const rotate = useTransform(scrollYProgress, [0, 1], [0, 180 * (i % 2 === 0 ? 1 : -1)]);
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.1, 0.3, 0.3, 0.1]);

        return (
          <motion.div
            key={i}
            style={{ 
              left: shape.initial.x, 
              top: shape.initial.y, 
              translateY: y,
              rotate,
              opacity
            }}
            className="absolute transition-opacity duration-300 will-change-transform mix-blend-screen"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {shape.type === 'cyber-circle' && (
              <div className={`${shape.size} rounded-full border border-dashed ${shape.color} opacity-20 relative animate-spin-slow`}>
                <div className="absolute inset-2 rounded-full border border-primary/20" />
                <div className="absolute top-0 left-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_var(--primary)]" />
              </div>
            )}
            
            {shape.type === 'data-grid' && (
              <div className={`${shape.size} grid grid-cols-3 gap-1 opacity-20`}>
                {[...Array(9)].map((_, j) => (
                  <div key={j} className={`bg-current ${shape.color} rounded-[1px]`} style={{ opacity: Math.random() }} />
                ))}
              </div>
            )}
            
            {shape.type === 'glitch-triangle' && (
              <div className={`${shape.size} relative opacity-30`}>
                <div 
                  className={`absolute inset-0 border-2 ${shape.color}`}
                  style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                />
                <div 
                  className={`absolute inset-0 bg-accent/10 blur-md`}
                  style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                />
              </div>
            )}
            
            {shape.type === 'hexagon' && (
              <div 
                className={`${shape.size} border ${shape.color} opacity-10`}
                style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-2/3 h-2/3 border border-primary/20" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }} />
                </div>
              </div>
            )}
            
            {shape.type === 'code-snippet' && (
              <div className="font-mono opacity-20 space-y-1">
                <div className="w-24 h-1 bg-current rounded" />
                <div className="w-16 h-1 bg-current rounded ml-4" />
                <div className="w-20 h-1 bg-current rounded ml-4" />
                <div className="w-12 h-1 bg-current rounded" />
              </div>
            )}
            
            {shape.type === 'binary' && (
              <div className="font-mono text-xs opacity-20 tracking-widest writing-vertical-lr">
                101101001
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingShapes;
