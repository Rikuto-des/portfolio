import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ArrowRight, Code, Layers, Zap, Cpu } from "lucide-react";
import { useState, useEffect, useRef, memo, useCallback } from "react";

const projects = [
  {
    id: 1,
    title: "NEON VERSE",
    category: "Web Design",
    icon: <Layers size={18} />,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    color: "text-primary border-primary",
  },
  {
    id: 2,
    title: "FLUID DREAMS",
    category: "Brand Identity",
    icon: <Zap size={18} />,
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
    color: "text-secondary border-secondary",
  },
  {
    id: 3,
    title: "RETRO GLITCH",
    category: "Development",
    icon: <Code size={18} />,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    color: "text-accent border-accent",
  },
  {
    id: 4,
    title: "CYBER PUNK",
    category: "UI/UX",
    icon: <Cpu size={18} />,
    image: "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?q=80&w=800&auto=format&fit=crop",
    color: "text-primary border-primary",
  }
];

// Desktop Variants
const desktopCardVariants: Variants = {
  initial: (i: number) => ({
    y: 0,
    x: (i - 2) * 140, 
    rotate: (i - 2) * 5,
    scale: 1,
    zIndex: i,
    filter: "brightness(0.7)",
    transition: { duration: 0.4, type: "spring", stiffness: 200, damping: 20 }
  }),
  hover: {
    y: -80,
    rotate: 0,
    scale: 1.1,
    zIndex: 100,
    filter: "brightness(1)",
    transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 20 }
  },
  nonHover: (i: number) => ({
    x: (i - 2) * 100, // Condense when hovering one
    rotate: (i - 2) * 10,
    scale: 0.9,
    filter: "brightness(0.3) blur(2px)",
    transition: { duration: 0.4 }
  })
};

// Mobile Variants
const mobileCardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const ViewAllCard = memo(({ 
  index,
  hoveredIndex,
  isMobile,
  onHoverStart,
  onHoverEnd
}: { 
  index: number;
  hoveredIndex?: number | null;
  isMobile: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) => {
  if (isMobile) {
    return (
      <motion.div 
        variants={mobileCardVariants}
        className="flex-shrink-0 w-[85vw] max-w-[320px] h-[460px] bg-card/80 backdrop-blur-md rounded-xl border border-primary/50 shadow-[0_0_15px_var(--primary)] overflow-hidden snap-center relative mx-4 flex flex-col items-center justify-center cursor-pointer group"
      >
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <div className="relative z-10 flex flex-col items-center p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_var(--primary)] transition-all duration-300">
            <ArrowRight className="w-10 h-10 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
          
          <h3 className="font-heading font-black text-4xl text-foreground leading-tight">
            VIEW ALL<br />
            <span className="text-primary glitch" data-text="PROJECTS">PROJECTS</span>
          </h3>
          
          <span className="font-mono text-xs border border-primary/50 px-4 py-1 rounded bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-colors">
            ACCESS_ARCHIVE
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={desktopCardVariants}
      custom={index}
      initial="initial"
      animate={
        hoveredIndex === index ? "hover" : 
        hoveredIndex !== null && hoveredIndex !== undefined ? "nonHover" : "initial"
      }
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="absolute bottom-0 w-[300px] h-[460px] bg-card/90 backdrop-blur-xl rounded-xl border border-primary/50 shadow-[0_0_20px_var(--primary)] origin-bottom cursor-pointer overflow-hidden group"
      style={{ 
        left: "50%", 
        marginLeft: -150,
        transformOrigin: "bottom center",
      }}
    >
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      
      {/* Scanline */}
      <motion.div 
        className="absolute inset-x-0 h-1 bg-primary/30 z-20 pointer-events-none"
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center space-y-6">
        <div className="w-24 h-24 rounded-full border-2 border-primary flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_30px_var(--primary)] transition-all duration-300 bg-black/50">
          <ArrowRight className="w-10 h-10 text-primary group-hover:translate-x-1 transition-transform" />
        </div>
        
        <h3 className="font-heading font-black text-5xl text-foreground leading-tight">
          VIEW ALL<br />
          <span className="text-primary glitch" data-text="PROJECTS">PROJECTS</span>
        </h3>
        
        <span className="font-mono text-sm border border-primary/50 px-6 py-2 rounded bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-colors tracking-widest">
          ACCESS_ARCHIVE
        </span>
      </div>
    </motion.div>
  );
});

const ProjectCard = memo(({ 
  project, 
  index,
  hoveredIndex,
  isMobile,
  onHoverStart,
  onHoverEnd
}: { 
  project: typeof projects[0];
  index: number;
  hoveredIndex?: number | null;
  isMobile: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) => {
  
  if (isMobile) {
    return (
      <motion.div 
        variants={mobileCardVariants}
        className="flex-shrink-0 w-[85vw] max-w-[320px] h-[460px] bg-card rounded-xl border border-white/10 overflow-hidden snap-center relative mx-4"
      >
        <div className="relative w-full h-full">
          <img 
            src={project.image} 
            alt={project.title} 
            className="h-full w-full object-cover opacity-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs text-muted-foreground bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
                ID: {String(project.id).padStart(2, '0')}
              </span>
              <div className="bg-black/50 rounded-full p-2 border border-white/10 backdrop-blur-sm">
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </div>
            </div>
            
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border bg-black/50 backdrop-blur-sm ${project.color}`}>
                {project.icon}
                {project.category}
              </div>
              <h3 className="font-heading font-black text-4xl text-foreground tracking-tighter">
                {project.title}
              </h3>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Desktop Layout
  return (
    <motion.div 
      variants={desktopCardVariants}
      custom={index}
      initial="initial"
      animate={
        hoveredIndex === index ? "hover" : 
        hoveredIndex !== null && hoveredIndex !== undefined ? "nonHover" : "initial"
      }
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="absolute bottom-0 w-[300px] h-[460px] bg-card rounded-xl border border-white/10 origin-bottom cursor-pointer group overflow-hidden"
      style={{ 
        left: "50%", 
        marginLeft: -150, 
        transformOrigin: "bottom center",
      }}
    >
      <div className="relative w-full h-full bg-black">
        <img 
          src={project.image} 
          alt={project.title} 
          className="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Hologram Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Border Glow on Hover */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 transition-colors duration-300 rounded-xl" />

        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
          <div className="flex justify-between items-start translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span className="font-mono text-xs text-primary bg-black/80 px-2 py-1 rounded border border-primary/30">
              PROJECT_ID: {String(project.id).padStart(3, '0')}
            </span>
            <div className="bg-primary text-background rounded-full p-2">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono mb-3 border bg-black/80 backdrop-blur-sm ${project.color} group-hover:scale-105 transition-transform origin-left`}>
              {project.icon}
              {project.category}
            </div>
            <h3 className="font-heading font-black text-4xl text-foreground tracking-tighter group-hover:text-primary group-hover:drop-shadow-[0_0_10px_rgba(var(--primary),0.5)] transition-all">
              {project.title}
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleHoverStart = useCallback((index: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredIndex(index);
  }, []);

  const handleHoverEnd = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 150);
  }, []);

  return (
    <section id="projects" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 bg-background/50">
      
      {/* Cyber Grid Floor */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(var(--primary), 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary), 0.1) 1px, transparent 1px)', 
             backgroundSize: '40px 40px',
             maskImage: 'linear-gradient(to bottom, transparent, black 40%, black 80%, transparent)',
             transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(2)'
           }} 
      />

      <div className="text-center z-10 px-4 mb-12 md:mb-24 relative">
        <div className="inline-block mb-4 px-4 py-1 border border-primary/30 rounded-full bg-primary/5 text-primary text-xs font-mono tracking-widest">
          // SELECTED_WORKS
        </div>
        <h2 className="font-heading font-black text-6xl md:text-9xl text-foreground mb-4 relative inline-block">
          PICK A <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            CARD
          </span>
          <span className="absolute -top-4 -right-8 text-xs font-mono text-secondary animate-pulse hidden md:block">
            [ LOADING_DATA... ]
          </span>
        </h2>
        
        <p className="font-mono text-muted-foreground text-sm md:text-base max-w-md mx-auto">
          {isMobile ? ">>> Swipe to navigate database" : ">>> Hover cards to inspect project details"}
        </p>
      </div>

      {isMobile ? (
        // Mobile Layout
        <div className="w-full flex overflow-x-auto snap-x snap-mandatory pb-16 px-4 scrollbar-hide">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              isMobile={true}
            />
          ))}
          <ViewAllCard 
            index={projects.length}
            isMobile={true}
          />
          <div className="w-4 flex-shrink-0" />
        </div>
      ) : (
        // Desktop Layout
        <div className="relative w-full max-w-6xl h-[550px] flex justify-center items-end perspective-1000">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              hoveredIndex={hoveredIndex}
              isMobile={false}
              onHoverStart={() => handleHoverStart(index)}
              onHoverEnd={handleHoverEnd}
            />
          ))}
          <ViewAllCard 
            index={projects.length}
            hoveredIndex={hoveredIndex}
            isMobile={false}
            onHoverStart={() => handleHoverStart(projects.length)}
            onHoverEnd={handleHoverEnd}
          />
        </div>
      )}

      {/* Tech Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent w-1/2 animate-slide-right" />
      </div>

    </section>
  );
};

export default Projects;
