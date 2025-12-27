import { motion } from "framer-motion";
import { Folder, Zap } from "lucide-react";
import { glitchIn, staggerContainer } from "@/lib/animation-variants";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// --- Shared Components ---

// --- Mode: MONITORS (Detailed CRT Simulation) ---

// --- SVG Filters & Definitions ---
const CRTFilters = () => (
  <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
    <defs>
      {/* Phosphor Dot Pattern */}
      <pattern id="phosphor-pattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill="rgb(255, 50, 50)" opacity="0.3" />
        <circle cx="3" cy="1" r="1" fill="rgb(50, 255, 50)" opacity="0.3" />
        <circle cx="2" cy="3" r="1" fill="rgb(50, 50, 255)" opacity="0.3" />
      </pattern>

      {/* Curvature & Distortion Filter */}
      <filter id="curvature-filter">
        <feMorphology operator="dilate" radius="2" in="SourceGraphic" result="dilated" />
        <feGaussianBlur stdDeviation="1" in="dilated" result="blurred" />
        <feComposite operator="out" in="blurred" in2="SourceGraphic" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  </svg>
);

// --- Mode: MONITORS (Hyper-Realistic CRT) ---

const CRTMonitor = ({ project }: { project: any }) => {
  return (
    <Link to={`/works/${project.id}`} className="group relative w-full pt-[80%] block font-mono bg-transparent perspective-1000">

      <div className="absolute inset-0 flex items-center justify-center p-4">

        {/* Monitor Casing (Bezel) */}
        <div className="relative w-full h-full bg-[#151515] rounded-[24px] shadow-[0_0_0_1px_#333,0_0_0_12px_#1a1a1a,0_0_30px_rgba(0,0,0,0.8),inset_0_0_20px_black] border-b-4 border-r-4 border-[#0a0a0a] group-hover:shadow-[0_0_0_12px_#1a1a1a,0_0_50px_var(--primary)] transition-shadow duration-500 overflow-hidden">

          {/* Top vents */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-2 flex gap-1 justify-center opacity-50">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-full h-full bg-black/60 rounded-full" />
            ))}
          </div>

          {/* Screen Container (Inset) */}
          <div className="absolute inset-3 bg-black rounded-[20px] overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,1)] border border-[#333]">

            {/* --- THE SCREEN SURFACE --- */}
            <div className="relative w-full h-full overflow-hidden rounded-[40px_40px_40px_40px] opacity-90 group-hover:opacity-100 transition-opacity duration-300">

              {/* 1. Base Phosphor Layer */}
              <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-30" style={{ fill: "url(#phosphor-pattern)" }}>
                <svg width="100%" height="100%">
                  <rect width="100%" height="100%" fill="url(#phosphor-pattern)" />
                </svg>
              </div>

              {/* 2. Content Layer (Image) */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 contrast-125 saturate-0 group-hover:saturate-100 z-0"
                style={{ backgroundImage: `url(${project.image})` }}
              />

              {/* 3. Scanlines (Moving) */}
              <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[size:100%_4px] opacity-40 animate-scanline" />

              {/* 4. Screen Glow / Bloom */}
              <div className="absolute inset-0 pointer-events-none z-20 bg-primary mix-blend-color-dodge opacity-10 group-hover:opacity-20 transition-opacity" />

              {/* 5. Glass Reflections (Glare) */}
              <div className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 rounded-[100%]" />
              <div className="absolute top-4 right-8 w-24 h-24 bg-white/5 blur-2xl rounded-full pointer-events-none z-30" />

              {/* 6. Vignette (Curvature Shadow) */}
              <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.9)_100%)] rounded-[20px]" />

              {/* Use inline SVG curvature border if desired, or simpler CSS border-radius tricks */}
            </div>

            {/* UI Overlay */}
            <div className="absolute top-6 left-8 z-50 text-primary text-[10px] md:text-xs font-mono tracking-widest drop-shadow-[0_0_5px_var(--primary)] opacity-70">
              ID: {project.id.slice(0, 4).toUpperCase()}
            </div>

            {/* Hardware Status Light */}
            <div className="absolute bottom-6 right-8 z-50 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_red]" />
              <span className="text-[8px] text-zinc-500 font-mono tracking-wider">REC</span>
            </div>

            {/* Central Pop-up Title (Holographic Style) */}
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div className="relative transform scale-0 group-hover:scale-100 transition-transform duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)">
                <div className="bg-black/90 backdrop-blur-sm border border-primary/50 px-8 py-4 shadow-[0_0_30px_var(--primary)] relative min-w-[240px] text-center skew-x-[-2deg]">

                  {/* Tech Decor Lines */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-0.5 h-3/4 bg-primary/30" />
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-3/4 bg-primary/30" />

                  <h3 className="relative font-heading font-black text-2xl md:text-3xl tracking-tighter text-primary uppercase drop-shadow-[0_0_10px_var(--primary)] animate-pulse-slow">
                    {project.title}
                  </h3>
                  <div className="text-[10px] text-primary/70 tracking-[0.3em] mt-1 border-t border-primary/20 pt-1">
                    System_View
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Physical Buttons on Chassis */}
          <div className="absolute bottom-4 right-16 flex gap-3 opacity-80">
            <div className="w-3 h-3 rounded-full bg-[#111] shadow-[0_1px_1px_rgba(255,255,255,0.1)] border border-black" />
            <div className="w-3 h-3 rounded-full bg-[#111] shadow-[0_1px_1px_rgba(255,255,255,0.1)] border border-black" />
          </div>

          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <div className="text-[8px] text-[#444] font-bold tracking-widest font-mono">TK-421</div>
          </div>

        </div>
      </div>
    </Link>
  );
};

const ModeMonitors = ({ displayedProjects }: any) => (
  <div className="w-full">
    <CRTFilters />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-6xl p-4 mx-auto">
      {displayedProjects.map((project: any) => (
        <CRTMonitor key={project.id} project={project} />
      ))}
    </div>
  </div>
);

// --- Main Component ---

const Projects = () => {
  const displayedProjects = projects.slice(0, 4);

  return (
    <section id="projects" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-32 bg-background font-mono">

      {/* Cyber Grid Background (Consistent with Contact) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      </div>

      {/* Title Section */}
      <motion.div
        className="text-center z-10 px-4 mb-16 md:mb-24 relative w-full"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_5px_var(--primary)]" />
          <span className="font-mono text-sm text-primary tracking-[0.2em] uppercase">System_View</span>
        </div>

        <motion.h2
          variants={glitchIn}
          className="font-heading font-black text-6xl md:text-8xl mb-6 relative inline-block text-primary drop-shadow-[0_0_10px_rgba(51,255,51,0.3)]"
        >
          DATABASE
        </motion.h2>
      </motion.div>

      {/* Content Area */}
      <div className="relative z-10 w-full flex justify-center min-h-[500px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full flex justify-center"
        >
          <ModeMonitors displayedProjects={displayedProjects} />
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-20 mt-12">
        <Link to="/archive">
          <Button size="lg" variant="outline" className="group border-primary text-primary hover:bg-primary hover:text-black rounded-none px-8 font-mono tracking-wider font-bold h-14 border hover:shadow-[0_0_20px_var(--primary)] transition-all">
            <Folder className="mr-2 h-4 w-4" />
            VIEW_ARCHIVES
          </Button>
        </Link>
      </div>

    </section>
  );
};

export default Projects;
