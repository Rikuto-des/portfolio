import { motion } from "framer-motion";
import { Folder, Zap } from "lucide-react";
import { glitchIn, staggerContainer } from "@/lib/animation-variants";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// --- Shared Components ---

// --- Mode: MONITORS (Detailed CRT Simulation) ---

const CRTMonitor = ({ project }: { project: any }) => {
  return (
    <Link to={`/works/${project.id}`} className="group relative w-full pt-[75%] block"> {/* Aspect Ratio 4:3 Container */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {/* 1. Monitor Chassis (Bezel) */}
        <div className="relative w-full h-full bg-[#1a1a1a] rounded-[20px] shadow-[0_0_0_10px_#2a2a2a,0_0_0_12px_#000,0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden border-t border-white/10 group-hover:shadow-[0_0_0_10px_#2a2a2a,0_0_0_12px_#000,0_20px_50px_rgba(0,255,0,0.1)] transition-shadow duration-500">

          {/* Metallic Texture on Bezel */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>

          {/* Power LED */}
          <div className="absolute bottom-4 right-8 w-2 h-2 rounded-full bg-red-900 shadow-[0_0_5px_red] group-hover:bg-green-500 group-hover:shadow-[0_0_15px_#0f0] transition-all duration-300 z-50"></div>
          <div className="absolute bottom-4 left-8 font-mono text-[10px] text-white/30 tracking-widest z-50 group-hover:text-green-500/80 transition-colors">SONY TRINITRON</div>

          {/* 2. CRT Screen Surface (Curved) */}
          <div className="absolute top-4 left-4 right-4 bottom-12 bg-black rounded-[40%_40%_40%_40%/5%_5%_5%_5%] overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,1)] border-[4px] border-[#111] z-10 box-content transition-all duration-300 group-hover:border-[#222]">

            {/* 3. Screen Content */}
            <div className="relative w-full h-full overflow-hidden rounded-[50%_50%_50%_50%/4%_4%_4%_4%]">

              {/* Project Image */}
              <div className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:scale-110 opacity-60 group-hover:opacity-100 filter sepia-[0.5] group-hover:sepia-0"
                style={{ backgroundImage: `url(${project.image})` }}
              />

              {/* Hover Glitch Effect Layer 1 (Red Shift) */}
              <div className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-40 mix-blend-screen translate-x-[2px] pointer-events-none transition-opacity duration-100"
                style={{ backgroundImage: `url(${project.image})`, filter: 'hue-rotate(90deg)' }} />

              {/* Hover Glitch Effect Layer 2 (Blue Shift) */}
              <div className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-40 mix-blend-screen -translate-x-[2px] pointer-events-none transition-opacity duration-100 delay-75"
                style={{ backgroundImage: `url(${project.image})`, filter: 'hue-rotate(-90deg)' }} />

              {/* 4. CRT Artifacts & Overlays */}

              {/* Scanlines - High Frequency */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_3px,3px_100%] pointer-events-none z-20 mix-blend-multiply opacity-80 group-hover:opacity-40 transition-opacity" />

              {/* RGB Pixels SImulation */}
              <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzjwqheqGw7AfAAkVh0U7QQAclYv7LtC+CcAAAAASUVORK5CYII=')] bg-[size:2px_2px] opacity-10 pointer-events-none z-20 animate-noise group-hover:opacity-20" />

              {/* Screen Flicker / Scanline Bar */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[20%] w-full animate-scanline pointer-events-none z-30 group-hover:animate-scanline-fast" />

              {/* Vignette (Corner Darkening) */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-30" />

              {/* Glass Reflection (Glare) */}
              <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full pointer-events-none z-40 opacity-30 group-hover:opacity-50 transition-opacity" />

            </div>

            {/* UI Overlay on Screen */}
            <div className="absolute top-4 left-6 z-50 font-mono text-green-500 text-xs tracking-widest drop-shadow-[0_0_5px_rgba(0,255,0,0.5)] group-hover:text-green-400 group-hover:drop-shadow-[0_0_8px_rgba(0,255,0,0.8)] transition-all">
              CH: {project.id.slice(0, 4).toUpperCase()}
            </div>
            <div className="absolute bottom-4 left-6 z-50 w-[90%]">
              <h3 className="glitch-title relative font-bold text-xl tracking-tight bg-black/50 px-3 py-1 inline-block text-white" data-text={project.title}>
                {project.title}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
                @keyframes noise {
                    0% { background-position: 0 0; }
                    10% { background-position: -5% -10%; }
                }
                .animate-noise {
                    animation: noise 3s steps(10) infinite;
                }
                @keyframes scanline {
                    0% { top: -20%; opacity: 0; }
                    50% { opacity: 1; }
                    100% { top: 120%; opacity: 0; }
                }
                .animate-scanline {
                    animation: scanline 3s linear infinite;
                }
                .animate-scanline-fast {
                    animation: scanline 1.5s linear infinite;
                }
                
                /* Mild Glitch Text Effect */
                .glitch-title {
                    position: relative;
                    z-index: 10;
                }
                
                .group:hover .glitch-title::before,
                .group:hover .glitch-title::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0.7;
                    background: transparent;
                }
                
                /* Magenta shift */
                .group:hover .glitch-title::before {
                    color: #ff00c1;
                    z-index: -1;
                    transform: translate(-2px, 0);
                    animation: glitch-anim-1 2s infinite linear alternate-reverse;
                }
                
                /* Cyan shift */
                .group:hover .glitch-title::after {
                    color: #00fff9;
                    z-index: -2;
                    transform: translate(2px, 0);
                    animation: glitch-anim-2 3s infinite linear alternate-reverse;
                }
                
                @keyframes glitch-anim-1 {
                    0% { transform: translate(-2px, 0); }
                    20% { transform: translate(-2px, 0); }
                    21% { transform: translate(-2px, -1px); }
                    23% { transform: translate(-2px, 0); }
                    50% { transform: translate(-2px, 1px); }
                    52% { transform: translate(-2px, 0); }
                    100% { transform: translate(-2px, 0); }
                }
                @keyframes glitch-anim-2 {
                    0% { transform: translate(2px, 0); }
                    60% { transform: translate(2px, 0); }
                    61% { transform: translate(2px, 1px); }
                    63% { transform: translate(2px, 0); }
                    80% { transform: translate(2px, -1px); }
                    82% { transform: translate(2px, 0); }
                    100% { transform: translate(2px, 0); }
                }
            `}} />
    </Link>
  );
};

const ModeMonitors = ({ displayedProjects }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl p-4 mx-auto">
    {displayedProjects.map((project: any) => (
      <CRTMonitor key={project.id} project={project} />
    ))}
  </div>
);

// --- Main Component ---

const Projects = () => {
  const displayedProjects = projects.slice(0, 4);

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

      {/* Title Section */}
      <motion.div
        className="text-center z-10 px-4 mb-16 md:mb-24 relative w-full"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 border border-primary/30 rounded-none bg-primary/5 text-primary text-xs font-mono tracking-widest backdrop-blur-sm">
          <Zap size={10} className="fill-current" />
          INTERFACE_MODE: MONITORS
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

      {/* Content Area */}
      <div className="relative z-10 w-full flex justify-center min-h-[500px]">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5 }}
          className="w-full flex justify-center"
        >
          <ModeMonitors displayedProjects={displayedProjects} />
        </motion.div>
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
