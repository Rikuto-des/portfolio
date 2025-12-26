import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Folder, Monitor, Building2, Box, LayoutTemplate, Zap } from "lucide-react";
import { useState, useEffect, memo, useCallback } from "react";
import { cyberReveal, glitchIn, staggerContainer, scanlineReveal } from "@/lib/animation-variants";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// --- Types & Constants ---

type ViewMode = 'cards' | 'monitors' | 'city' | 'cubes';

// --- Shared Components ---

const GlitchOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 z-[100] pointer-events-none overflow-hidden bg-black/10"
  >
    {/* RGB Split Layers */}
    <div className="absolute inset-0 bg-primary/20 mix-blend-screen animate-pulse" style={{ left: '-2px' }} />
    <div className="absolute inset-0 bg-red-500/20 mix-blend-screen animate-pulse" style={{ left: '2px' }} />

    {/* Noise Texture */}
    <div className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        filter: 'contrast(320%) brightness(100%)'
      }}
    />

    {/* Scanlines */}
    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px]" />

    {/* Random White Flashes */}
    <motion.div
      className="absolute inset-0 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.8, 0, 0.4, 0] }}
      transition={{ duration: 0.3, times: [0, 0.1, 0.2, 0.3, 1] }}
    />
  </motion.div>
);

// --- Mode: CARDS (Original) ---

const cardVariants = {
  initial: (i: number) => ({
    y: 0,
    x: (i - 1.5) * 140,
    rotate: (i - 1.5) * 5,
    scale: 1,
    zIndex: i,
    filter: "brightness(0.9) grayscale(0.2)",
    transition: { duration: 0.4, type: "spring", stiffness: 200 }
  }),
  hover: {
    y: -120,
    rotate: 0,
    scale: 1.1,
    zIndex: 100,
    filter: "brightness(1) grayscale(0)",
    transition: { duration: 0.3 }
  },
  nonHover: (i: number) => ({
    x: (i - 1.5) * 100,
    rotate: (i - 1.5) * 10,
    scale: 0.85,
    filter: "brightness(0.8) grayscale(1)",
    transition: { duration: 0.4 }
  })
};

const ModeCards = ({ displayedProjects, hoveredIndex, setHoveredIndex }: any) => (
  <div className="relative w-full max-w-6xl h-[600px] flex justify-center items-end perspective-1000">
    {displayedProjects.map((project: any, index: number) => (
      <Link key={project.id} to={`/works/${project.id}`}>
        <motion.div
          variants={cardVariants}
          custom={index}
          initial="initial"
          animate={hoveredIndex === index ? "hover" : hoveredIndex !== null ? "nonHover" : "initial"}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          className="absolute bottom-0 w-[300px] h-[460px] bg-background border border-primary/20 shadow-2xl rounded-2xl origin-bottom cursor-pointer overflow-hidden group"
          style={{ left: "50%", marginLeft: -150, transformOrigin: "bottom center" }}
        >
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${project.image})` }} />
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors" />

          <div className="relative h-full flex flex-col justify-end p-6 z-10">
            <span className="text-primary text-xs font-mono mb-2 bg-primary/10 w-fit px-2 py-1">{project.category}</span>
            <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
          </div>
        </motion.div>
      </Link>
    ))}
  </div>
);

// --- Mode: MONITORS (CRT Surveillance) ---

const ModeMonitors = ({ displayedProjects }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-5xl p-4">
    {displayedProjects.map((project: any, i: number) => (
      <Link key={project.id} to={`/works/${project.id}`} className="group relative">
        {/* CRT Frame */}
        <div className="relative aspect-[4/3] bg-zinc-900 rounded-[20px] border-4 border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Screen Content */}
          <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-100 transition-opacity duration-200"
            style={{ backgroundImage: `url(${project.image})` }}
          />

          {/* CRT Effects */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]" />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] z-10" />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* UI Overlay */}
          <div className="absolute top-4 left-6 z-20 font-mono text-xs text-green-500/80 tracking-widest flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            REC • {project.category}
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-black/80 backdrop-blur-sm border border-green-500/30 p-4 rounded text-green-500 font-mono">
              <h3 className="text-xl font-bold mb-1">{project.title}</h3>
              <div className="text-xs opacity-70 flex gap-2">
                {project.tech.map((t: string) => <span key={t}>[{t}]</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* Cables (Decorative) */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-zinc-800" />
      </Link>
    ))}
  </div>
);

// --- Mode: CITY (Buildings) ---

const ModeCity = ({ displayedProjects }: any) => (
  <div className="relative w-full max-w-6xl h-[600px] flex items-end justify-center gap-4 px-4 overflow-hidden perspective-[1000px]">
    {displayedProjects.map((project: any, i: number) => {
      const height = 300 + (i * 50) % 150; // Variable heights
      return (
        <Link key={project.id} to={`/works/${project.id}`} className="group relative w-full md:w-1/4">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: "circOut" }}
            style={{ height: `${height}px`, transformOrigin: 'bottom' }}
            className="w-full relative bg-zinc-900 border border-primary/20 hover:border-primary transition-colors flex flex-col justify-end overflow-hidden"
          >
            {/* Building Texture (Windows) */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity"
              style={{ backgroundImage: 'linear-gradient(rgba(var(--primary), 1) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary), 1) 1px, transparent 1px)', backgroundSize: '10px 20px' }}
            />

            {/* Image as Billboard */}
            <div className="h-[40%] bg-cover bg-center relative mx-2 mb-8 border border-primary/50 group-hover:brightness-125 transition-all"
              style={{ backgroundImage: `url(${project.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-2 left-2 font-bold text-white text-lg leading-none drop-shadow-md">
                {project.title}
              </div>
            </div>

            {/* Roof Lights */}
            <div className="absolute top-0 inset-x-0 h-1 bg-red-500 animate-pulse shadow-[0_0_10px_red]" />
          </motion.div>

          {/* Reflection */}
          <div className="h-[100px] w-full bg-gradient-to-b from-primary/10 to-transparent opacity-50 transform scale-y-[-1] origin-top blur-sm pointer-events-none" />
        </Link>
      );
    })}
  </div>
);

// --- Mode: CUBES (Floating Data) ---

const ModeCubes = ({ displayedProjects }: any) => (
  <div className="w-full h-[600px] flex items-center justify-center gap-12 md:gap-20 perspective-[1000px]">
    {displayedProjects.map((project: any, i: number) => (
      <Link key={project.id} to={`/works/${project.id}`} className="group relative w-[100px] h-[100px] md:w-[140px] md:h-[140px] preserve-3d">
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{
            rotateY: [0, 360],
            rotateX: [10, -10, 10],
            y: [-10, 10, -10]
          }}
          transition={{
            rotateY: { duration: 15 + i * 2, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
          }}
        >
          {/* Cube Faces */}
          <div className="absolute inset-0 border border-primary/50 bg-black/80 flex items-center justify-center translate-z-[50px] md:translate-z-[70px]">
            <img src={project.image} className="w-full h-full object-cover opacity-80" alt="" />
          </div>
          <div className="absolute inset-0 border border-primary/50 bg-black/80 flex items-center justify-center -translate-z-[50px] md:-translate-z-[70px]">
            <div className="text-primary font-mono text-xs p-2 text-center">{project.title}</div>
          </div>
          <div className="absolute inset-0 border border-primary/50 bg-primary/10 flex items-center justify-center rotate-y-90 translate-z-[50px] md:translate-z-[70px]">
            <span className="text-primary/50 text-xs">DATA</span>
          </div>
          <div className="absolute inset-0 border border-primary/50 bg-primary/10 flex items-center justify-center -rotate-y-90 translate-z-[50px] md:translate-z-[70px]">
            <span className="text-primary/50 text-xs">IMG</span>
          </div>
          <div className="absolute inset-0 border border-primary/50 bg-primary/5 flex items-center justify-center rotate-x-90 translate-z-[50px] md:translate-z-[70px]" />
          <div className="absolute inset-0 border border-primary/50 bg-primary/5 flex items-center justify-center -rotate-x-90 translate-z-[50px] md:translate-z-[70px]" />
        </motion.div>

        {/* Label on Hover */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-black/80 border border-primary/50 px-3 py-1 text-primary text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {project.title}
        </div>
      </Link>
    ))}

    <style dangerouslySetInnerHTML={{
      __html: `
            .preserve-3d { transform-style: preserve-3d; }
            .translate-z-\[50px\] { transform: translateZ(50px); }
            .-translate-z-\[50px\] { transform: translateZ(-50px); }
            .rotate-y-90 { transform: rotateY(90deg); }
            .-rotate-y-90 { transform: rotateY(-90deg); }
            .rotate-x-90 { transform: rotateX(90deg); }
            .-rotate-x-90 { transform: rotateX(-90deg); }
            @media (min-width: 768px) {
                .translate-z-\[70px\] { transform: translateZ(70px); }
                .-translate-z-\[70px\] { transform: translateZ(-70px); }
                .rotate-y-90.translate-z-\[70px\] { transform: rotateY(90deg) translateZ(70px); }
                .-rotate-y-90.translate-z-\[70px\] { transform: rotateY(-90deg) translateZ(70px); }
                .rotate-x-90.translate-z-\[70px\] { transform: rotateX(90deg) translateZ(70px); }
                .-rotate-x-90.translate-z-\[70px\] { transform: rotateX(-90deg) translateZ(70px); }
            }
        `}} />
  </div>
);

// --- Main Component ---

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const displayedProjects = projects.slice(0, 4);

  const switchMode = (mode: ViewMode) => {
    if (mode === viewMode || isTransitioning) return;
    setIsTransitioning(true);
    // Play sound effect here if implemented

    setTimeout(() => {
      setViewMode(mode);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // Wait for glitch to settle
    }, 300); // Wait for glitch to cover screen
  };

  return (
    <section id="projects" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 bg-transparent">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(var(--primary), 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary), 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, transparent, white 20%, white 90%, transparent)',
          transform: viewMode === 'city' ? 'perspective(500px) rotateX(60deg) translateY(0) scale(3)' : 'perspective(500px) rotateX(60deg) translateY(100px) scale(2)',
          opacity: 0.5,
          transition: 'transform 1s ease-in-out'
        }}
      />

      {/* Mode Switcher */}
      <div className="absolute top-10 right-4 md:right-10 z-50 flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10">
        {(['cards', 'monitors', 'city', 'cubes'] as const).map((m) => {
          const Icons = { cards: LayoutTemplate, monitors: Monitor, city: Building2, cubes: Box };
          const Icon = Icons[m];
          return (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`p-2 rounded-full transition-all duration-300 ${viewMode === m ? 'bg-primary text-black shadow-[0_0_15px_rgba(var(--primary),0.5)]' : 'text-zinc-500 hover:text-white hover:bg-white/10'}`}
              title={`Switch to ${m.toUpperCase()} view`}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </div>

      {/* Title Section */}
      <motion.div
        className="text-center z-10 px-4 mb-8 md:mb-16 relative"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 border border-primary/30 rounded-none bg-primary/5 text-primary text-xs font-mono tracking-widest backdrop-blur-sm">
          <Zap size={10} className="fill-current" />
          INTERFACE_MODE: {viewMode.toUpperCase()}
        </div>

        <motion.h2
          variants={glitchIn}
          className="font-heading font-black text-5xl md:text-8xl text-foreground mb-4 relative inline-block text-stroke-primary"
        >
          SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-gradient-x">
            WORKS
          </span>
        </motion.h2>
      </motion.div>

      {/* Glitch Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && <GlitchOverlay />}
      </AnimatePresence>

      {/* Content Area */}
      <div className="relative z-10 w-full flex justify-center min-h-[500px]">
        {!isTransitioning && (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-center"
          >
            {viewMode === 'cards' && (
              <div className="relative w-full max-w-6xl h-[600px] flex justify-center items-end perspective-1000 hidden md:flex">
                <ModeCards displayedProjects={displayedProjects} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
              </div>
            )}

            {/* Mobile Fallback or Force Cards on Mobile? Assuming responsive layout within modes or distinct mobile view */}
            <div className="md:hidden w-full px-4">
              {/* Reusing Monitor Mode for Mobile as it stacks nicely, or Swipeable Cards */}
              <div className="flex flex-col gap-6">
                {displayedProjects.map((project: any, index: number) => (
                  <Link key={project.id} to={`/works/${project.id}`}>
                    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg relative h-[300px] group">
                      <img src={project.image} alt="" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                        <p className="text-primary text-xs font-mono">{project.category}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>


            {/* Desktop Specific Modes */}
            <div className="hidden md:flex w-full justify-center">
              {viewMode === 'monitors' && <ModeMonitors displayedProjects={displayedProjects} />}
              {viewMode === 'city' && <ModeCity displayedProjects={displayedProjects} />}
              {viewMode === 'cubes' && <ModeCubes displayedProjects={displayedProjects} />}
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer / Archive Link */}
      <div className="relative z-20 mt-12">
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
