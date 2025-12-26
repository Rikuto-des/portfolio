import { motion, type Variants } from "framer-motion";
import { ArrowRight, Folder } from "lucide-react";
import { useState, useEffect, memo, useCallback } from "react";
import { cyberReveal, glitchIn, staggerContainer, scanlineReveal } from "@/lib/animation-variants";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Desktop Variants
const desktopCardVariants: Variants = {
  initial: (i: number) => ({
    y: 0,
    x: (i - 1.5) * 140,
    rotate: (i - 1.5) * 5,
    scale: 1,
    zIndex: i,
    filter: "brightness(0.9) grayscale(0.2)",
    transition: { duration: 0.4, type: "spring", stiffness: 200, damping: 20 }
  }),
  hover: {
    y: -120,
    rotate: 0,
    scale: 1.1,
    zIndex: 100,
    filter: "brightness(1) grayscale(0)",
    transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 20 }
  },
  nonHover: (i: number) => ({
    x: (i - 1.5) * 100,
    rotate: (i - 1.5) * 10,
    scale: 0.85,
    filter: "brightness(0.8) grayscale(1)",
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

  const CardContent = () => (
    <>
      {/* Project Image */}
      <div className="absolute inset-0 z-0 bg-secondary/10">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-all duration-700 ease-out"
        />
        {/* Color Tinge Overlay - Lightweight */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Gradient Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
        {/* Cyber Grid Mask */}
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      </div>

      {/* Cyber Overlay Elements */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-primary group-hover:scale-110 transition-transform" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary group-hover:scale-110 transition-transform" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-primary group-hover:scale-110 transition-transform" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-primary group-hover:scale-110 transition-transform" />

      {/* Animated Scanline */}
      <motion.div
        className="absolute inset-x-0 h-1 bg-primary/30 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-8 h-[1px] bg-primary/80" />
            <span className="font-mono text-[10px] text-primary-foreground tracking-[0.3em] uppercase bg-primary px-1">
              {project.category}
            </span>
          </div>
          <h3 className="font-heading font-bold text-3xl md:text-3xl text-foreground leading-none tracking-tighter group-hover:text-primary transition-colors drop-shadow-sm">
            {project.title}
          </h3>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-primary/20">
          <div className="flex flex-wrap gap-1 max-w-[70%]">
            {project.tech.slice(0, 3).map(t => (
              <span key={t} className="text-[9px] font-mono bg-background/50 border border-border px-1.5 py-0.5 rounded text-muted-foreground">{t}</span>
            ))}
          </div>
          <div className="w-10 h-10 rounded-sm border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all bg-background/80 text-primary">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Hover Overlay - Simplified */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 bg-primary transition-opacity" />
    </>
  );

  if (isMobile) {
    return (
      <Link to={`/works/${project.id}`} className="block">
        <motion.div
          variants={mobileCardVariants}
          className="flex-shrink-0 w-[85vw] max-w-[320px] h-[460px] bg-card rounded-xl border border-border shadow-lg overflow-hidden snap-center relative cursor-pointer group"
        >
          <CardContent />
        </motion.div>
      </Link>
    );
  }

  // Desktop Layout
  return (
    <Link to={`/works/${project.id}`}>
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
        className="absolute bottom-0 w-[300px] h-[460px] bg-background border border-primary/20 shadow-2xl rounded-2xl origin-bottom cursor-pointer overflow-hidden group"
        style={{
          left: "50%",
          marginLeft: -150,
          transformOrigin: "bottom center",
        }}
      >
        <CardContent />
      </motion.div>
    </Link>
  );
});

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const displayedProjects = projects.slice(0, 4);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleHoverStart = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <section id="projects" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 bg-transparent">

      {/* Cyber Grid Floor - Light Version */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(var(--primary), 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary), 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, transparent, white 20%, white 90%, transparent)',
          transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(2)',
          opacity: 0.5
        }}
      />

      <motion.div
        className="text-center z-10 px-4 mb-12 md:mb-24 relative"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          variants={scanlineReveal}
          className="inline-flex items-center gap-2 mb-4 px-4 py-1 border border-primary/30 rounded-none bg-primary/5 text-primary text-xs font-mono tracking-widest backdrop-blur-sm"
        >
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          // SELECTED_WORKS_DB
        </motion.div>

        <motion.h2
          variants={glitchIn}
          className="font-heading font-black text-6xl md:text-9xl text-foreground mb-4 relative inline-block text-stroke-primary"
        >
          PICK A <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-gradient-x">
            CARD
          </span>
        </motion.h2>

        <motion.p
          variants={cyberReveal}
          className="font-mono text-muted-foreground text-sm md:text-base max-w-md mx-auto mt-8 border-l-2 border-primary/50 pl-4 text-left"
        >
          &gt; INSTRUCTION: {isMobile ? "Tap to view case study" : "Hover & Click to inspect"} <br />
          &gt; ACCESS_LEVEL: GUEST
        </motion.p>
      </motion.div>

      {isMobile ? (
        // Mobile Layout
        <div className="w-full flex gap-6 overflow-x-auto snap-x snap-mandatory px-8 pb-16 [&::-webkit-scrollbar]:hidden">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isMobile={true}
            />
          ))}
          <div className="w-2 flex-shrink-0" />
        </div>
      ) : (
        // Desktop Layout
        <div className="relative w-full max-w-6xl h-[600px] flex justify-center items-end perspective-1000">
          {displayedProjects.map((project, index) => (
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
        </div>
      )}

      {/* View Archive Button */}
      <div className="relative z-20 mt-10 md:mt-0">
        <Link to="/archive">
          <Button size="lg" variant="outline" className="group border-foreground/20 hover:border-primary hover:text-primary hover:bg-primary/5 px-8 font-mono tracking-wider">
            <Folder className="mr-2 group-hover:text-primary h-4 w-4" />
            VIEW_COMPLETE_ARCHIVE
          </Button>
        </Link>
      </div>

    </section>
  );
};

export default Projects;
