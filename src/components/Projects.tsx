import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation, PanInfo } from "framer-motion";
import { Folder, Monitor, Box, LayoutTemplate, Zap } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { glitchIn, staggerContainer } from "@/lib/animation-variants";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// --- Types & Constants ---

type ViewMode = 'cards' | 'monitors' | 'cubes';

// --- Shared Components ---

const GlitchOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 z-[100] pointer-events-none overflow-hidden bg-black/10"
  >
    <div className="absolute inset-0 bg-primary/20 mix-blend-screen animate-pulse" style={{ left: '-2px' }} />
    <div className="absolute inset-0 bg-red-500/20 mix-blend-screen animate-pulse" style={{ left: '2px' }} />
    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px]" />
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

// --- Mode: MONITORS (Detailed CRT Simulation) ---

const CRTMonitor = ({ project }: { project: any }) => {
  return (
    <Link to={`/works/${project.id}`} className="group relative w-full pt-[75%]"> {/* Aspect Ratio 4:3 Container */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {/* 1. Monitor Chassis (Bezel) */}
        <div className="relative w-full h-full bg-[#1a1a1a] rounded-[20px] shadow-[0_0_0_10px_#2a2a2a,0_0_0_12px_#000,0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden border-t border-white/10">

          {/* Metallic Texture on Bezel */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>

          {/* Power LED */}
          <div className="absolute bottom-4 right-8 w-2 h-2 rounded-full bg-red-900 shadow-[0_0_5px_red] group-hover:bg-green-500 group-hover:shadow-[0_0_10px_#0f0] transition-colors duration-300 z-50"></div>
          <div className="absolute bottom-4 left-8 font-mono text-[10px] text-white/30 tracking-widest z-50">SONY TRINITRON</div>

          {/* 2. CRT Screen Surface (Curved) */}
          <div className="absolute top-4 left-4 right-4 bottom-12 bg-black rounded-[40%_40%_40%_40%/5%_5%_5%_5%] overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,1)] border-[4px] border-[#111] z-10 box-content">

            {/* 3. Screen Content */}
            <div className="relative w-full h-full overflow-hidden rounded-[50%_50%_50%_50%/4%_4%_4%_4%]">

              {/* Project Image */}
              <div className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:scale-105 opacity-60 group-hover:opacity-100 filter sepia-[0.5] group-hover:sepia-0"
                style={{ backgroundImage: `url(${project.image})` }}
              />

              {/* 4. CRT Artifacts & Overlays */}

              {/* Scanlines - High Frequency */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_3px,3px_100%] pointer-events-none z-20 mix-blend-multiply opacity-80" />

              {/* RGB Pixels SImulation */}
              <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzjwqheqGw7AfAAkVh0U7QQAclYv7LtC+CcAAAAASUVORK5CYII=')] bg-[size:2px_2px] opacity-10 pointer-events-none z-20" />

              {/* Screen Flicker / Scanline Bar */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[10%] w-full animate-scanline pointer-events-none z-30" />

              {/* Vignette (Corner Darkening) */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-30" />

              {/* Glass Reflection (Glare) */}
              <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full pointer-events-none z-40 opacity-30" />

            </div>

            {/* UI Overlay on Screen */}
            <div className="absolute top-4 left-6 z-50 font-mono text-green-500 text-xs tracking-widest drop-shadow-[0_0_5px_rgba(0,255,0,0.5)]">
              CH: {project.id.slice(0, 4).toUpperCase()}
            </div>
            <div className="absolute bottom-4 left-6 z-50">
              <h3 className="text-white font-bold text-lg tracking-tight drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)] bg-black/50 px-2">{project.title}</h3>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ModeMonitors = ({ displayedProjects }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl p-4">
    {displayedProjects.map((project: any) => (
      <CRTMonitor key={project.id} project={project} />
    ))}
  </div>
);


// --- Mode: INTERACTIVE CUBES ---

const InteractiveCube = ({ project, i }: { project: any, i: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  // Auto rotation animation
  const controls = useAnimation();

  // Start auto rotation on mount
  useEffect(() => {
    controls.start({
      rotateY: [0, 360],
      transition: { duration: 20, repeat: Infinity, ease: "linear" }
    });
  }, [controls]);

  const handleDragStart = () => {
    controls.stop(); // Stop auto rotation when user grabs it
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    // Optional: Resume auto-rotation or add inertia here
    // For now, let it stay where specifically turned
  };

  return (
    <div className="perspective-[1000px] w-[180px] h-[180px] cursor-grab active:cursor-grabbing z-10 m-8">
      <motion.div
        className="w-full h-full relative preserve-3d"
        style={{ rotateX, rotateY, x: 0, y: 0 }} // Bind motion values
        animate={controls}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.6}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Cube Faces */}
        {/* Front (Image) */}
        <div className="absolute inset-0 border border-primary/50 bg-black/90 flex items-center justify-center translate-z-[90px] shadow-[0_0_30px_rgba(var(--primary),0.2)]">
          <div className="relative w-full h-full overflow-hidden">
            <img src={project.image} className="w-full h-full object-cover opacity-80 pointer-events-none" alt="" />
            <div className="absolute bottom-0 inset-x-0 bg-black/60 p-2 text-center pointer-events-none">
              <span className="text-primary font-bold text-sm tracking-widest">{project.title}</span>
            </div>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 border border-primary/50 bg-black/90 flex items-center justify-center -translate-z-[90px] rotate-y-180">
          <div className="p-4 text-xs font-mono text-primary/80 pointer-events-none">
            <div className="font-bold border-b border-primary/30 mb-2 pb-1">SYS_INFO</div>
            {project.tech.map((t: string) => <div key={t}>> {t}</div>)}
          </div>
        </div>
        {/* Right */}
        <div className="absolute inset-0 border border-primary/50 bg-primary/5 flex items-center justify-center rotate-y-90 translate-z-[90px]">
          <span className="text-primary/30 text-xs font-mono rotate-90 pointer-events-none">SIDE_A</span>
        </div>
        {/* Left */}
        <div className="absolute inset-0 border border-primary/50 bg-primary/5 flex items-center justify-center -rotate-y-90 translate-z-[90px]">
          <span className="text-primary/30 text-xs font-mono -rotate-90 pointer-events-none">SIDE_B</span>
        </div>
        {/* Top */}
        <div className="absolute inset-0 border border-primary/50 bg-primary/5 flex items-center justify-center rotate-x-90 translate-z-[90px]">
          <div className="w-8 h-8 rounded-full border border-primary/30 animate-pulse pointer-events-none" />
        </div>
        {/* Bottom */}
        <div className="absolute inset-0 border border-primary/50 bg-primary/5 flex items-center justify-center -rotate-x-90 translate-z-[90px]" />
      </motion.div>

      <style dangerouslySetInnerHTML={{
        __html: `
            .preserve-3d { transform-style: preserve-3d; }
            .translate-z-\[90px\] { transform: translateZ(90px); }
            .-translate-z-\[90px\] { transform: translateZ(-90px); }
            .rotate-y-180 { transform: rotateY(180deg); }
            .rotate-y-90 { transform: rotateY(90deg); }
            .-rotate-y-90 { transform: rotateY(-90deg); }
            .rotate-x-90 { transform: rotateX(90deg); }
            .-rotate-x-90 { transform: rotateX(-90deg); }
        `}} />
    </div>
  );
};

const ModeCubes = ({ displayedProjects }: any) => (
  <div className="w-full flex flex-wrap items-center justify-center gap-8 py-20">
    {displayedProjects.map((project: any, i: number) => (
      <Link key={project.id} to={`/works/${project.id}`}>
        <InteractiveCube key={project.id} project={project} i={i} />
      </Link>
    ))}
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
    setTimeout(() => {
      setViewMode(mode);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 300);
  };

  return (
    <section id="projects" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 bg-transparent">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(var(--primary), 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary), 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, transparent, white 20%, white 90%, transparent)',
          transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(2)',
          opacity: 0.5,
        }}
      />

      {/* Mode Switcher */}
      <div className="absolute top-10 right-4 md:right-10 z-50 flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10">
        {(['cards', 'monitors', 'cubes'] as const).map((m) => {
          const Icons = { cards: LayoutTemplate, monitors: Monitor, cubes: Box }; // Removed City
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

            <div className="md:hidden w-full px-4">
              {/* Mobile View - Fallback to simple cards for consistency, or reuse monitors if they scale well. Let's use Monitors for mobile too as they are responsive now */}
              {viewMode === 'cards' ? (
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
              ) : null}
            </div>


            {/* Desktop & Mobile Modes */}
            <div className={`w-full justify-center ${viewMode === 'cards' ? 'hidden md:flex' : 'flex'}`}>
              {viewMode === 'monitors' && <ModeMonitors displayedProjects={displayedProjects} />}
              {viewMode === 'cubes' && <ModeCubes displayedProjects={displayedProjects} />}
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
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
