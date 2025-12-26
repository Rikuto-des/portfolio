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
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl p-4">
    {displayedProjects.map((project: any, i: number) => (
      <Link key={project.id} to={`/works/${project.id}`} className="group relative w-full aspect-[4/3] flex items-center justify-center bg-black/50 rounded-xl overflow-hidden shadow-2xl border border-white/5">

        {/* Project Image (Background Layer) */}
        <div className="absolute top-[16%] bottom-[19%] left-[16%] right-[16%] z-0 rounded-lg overflow-hidden bg-black">
          <div
            className="w-full h-full bg-cover bg-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 animate-pulse-slow"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          {/* Screen Glitch Overlay */}
          <div className="absolute inset-0 bg-primary/20 mix-blend-color-dodge opacity-0 group-hover:opacity-30 transition-opacity" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none" />
        </div>

        {/* Monitor Frame (Foreground Layer with Blend Mode) */}
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-screen filter contrast-125 brightness-110">
          <img
            src="/assets/monitor_frame.png"
            alt="CRT Frame"
            className="w-full h-full object-fill scale-110"
          />
        </div>

        {/* UI Overlay (Top Priority) */}
        <div className="absolute bottom-[24%] left-[20%] right-[20%] z-20 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/90 text-green-400 px-2 py-1 font-mono text-[10px] border border-green-500/30 backdrop-blur-md rounded-sm">
            <span className="block font-bold truncate max-w-[150px]">{project.title}</span>
          </div>
          <div className="text-[9px] text-green-500 font-mono animate-pulse">REC ●</div>
        </div>
      </Link>
    ))}
  </div>
);

// --- Mode: CITY (Buildings) ---

const ModeCity = ({ displayedProjects }: any) => (
  <div className="relative w-full max-w-7xl h-[600px] flex items-end justify-center gap-2 px-4 overflow-hidden perspective-[1000px]">
    {displayedProjects.map((project: any, i: number) => {
      const height = 450 + (i * 30) % 100; // Taller buildings
      const hueRotate = i * 40;

      return (
        <Link key={project.id} to={`/works/${project.id}`} className="group relative w-full md:w-1/4 max-w-[280px] flex justify-center h-full items-end">
          <motion.div
            initial={{ y: 600, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.15, duration: 1, type: "spring", stiffness: 50 }}
            className="relative w-full flex flex-col justify-end items-center"
            style={{ height: `${height}px` }}
          >
            {/* Project Image (Advertisement) */}
            <div
              className="absolute bottom-[35%] w-[58%] h-[28%] bg-black z-10 overflow-hidden box-border transform group-hover:brightness-125 transition-all duration-500"
              style={{
                boxShadow: `0 0 30px rgba(var(--primary), 0.4)`
              }}
            >
              <div
                className="w-full h-full bg-cover bg-center opacity-90 group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:3px_3px] mix-blend-overlay pointer-events-none" />
            </div>

            {/* Building Image (Foreground with Blend) */}
            <div className="absolute inset-0 z-20 pointer-events-none mix-blend-screen filter contrast-125">
              <img
                src="/assets/city_building.png"
                alt="Building"
                className="w-full h-full object-cover object-bottom"
                style={{ filter: `hue-rotate(${hueRotate}deg)` }}
              />
            </div>

            {/* Billboard Text Overlay */}
            <div className="absolute bottom-[35%] w-[58%] h-[28%] z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="bg-black/80 text-white font-black text-xs md:text-sm tracking-tighter uppercase px-2 py-1 border border-white transform -rotate-2">
                {project.title}
              </span>
            </div>

            {/* Base Reflection */}
            <div className="absolute -bottom-[20px] w-[80%] h-[20px] bg-primary/20 blur-xl rounded-full opacity-50" />
          </motion.div>
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
