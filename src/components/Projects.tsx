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
    <Link to={`/works/${project.id}`} className="group relative w-full pt-[75%] block font-mono">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {/* 1. Monitor Chassis (Pip-Boy Casing) */}
        <div className="relative w-full h-full bg-[#2b2b2b] dark:bg-[#1a1a1a] rounded-[10px] shadow-[0_0_0_8px_#3a3a3a,0_0_0_10px_#000,0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden border-t-2 border-[#5c5c5c] dark:border-[#333] group-hover:shadow-[0_0_0_8px_#33ff33,0_0_0_10px_#000,0_0_30px_rgba(51,255,51,0.2)] transition-shadow duration-500">

          {/* Screws / Bolts */}
          <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#111] shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]"></div>
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#111] shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#111] shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#111] shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]"></div>

          {/* Power LED & Branding */}
          <div className="absolute bottom-3 right-12 w-3 h-1 bg-red-900 group-hover:bg-primary group-hover:shadow-[0_0_10px_var(--primary)] transition-colors duration-300 z-50 rounded-[1px]"></div>
          <div className="absolute bottom-3 left-12 text-[10px] text-primary/40 tracking-[0.2em] font-bold z-50 group-hover:text-primary transition-colors">SYSTEM_RDY</div>

          {/* 2. CRT Screen Surface */}
          <div className="absolute top-6 left-6 right-6 bottom-10 bg-[#0a140a] dark:bg-black rounded-[20px] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)] border-[4px] border-[#333] z-10 box-content transition-all duration-300 group-hover:border-[#33ff33]/50">

            {/* 3. Screen Content */}
            <div className="relative w-full h-full overflow-hidden">

              {/* Green Monochrome Filter base */}
              <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-20 pointer-events-none z-10" />

              {/* Project Image */}
              <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 contrast-125 saturate-0 group-hover:saturate-100"
                style={{ backgroundImage: `url(${project.image})` }}
              />

              {/* 4. Pip-Boy Artifacts */}

              {/* Scanlines (Steady) */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,2px_100%] pointer-events-none z-20 mix-blend-overlay opacity-60" />

              {/* Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,20,0,0.8)_100%)] pointer-events-none z-20" />

              {/* Glass Reflection */}
              <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none z-40 opacity-20" />

            </div>

            {/* UI Overlay on Screen */}
            <div className="absolute top-3 left-4 z-50 text-primary text-[10px] tracking-widest drop-shadow-[0_0_2px_var(--primary)] opacity-70 group-hover:opacity-100">
              ID: {project.id.slice(0, 4).toUpperCase()}
            </div>

            {/* Pip-Boy Box Style Pop-up Title */}
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div className="relative transform scale-0 group-hover:scale-100 transition-transform duration-300 cubic-bezier(0.175, 0.885, 0.32, 1.275)">
                <div className="bg-black border-2 border-primary px-6 py-3 shadow-[0_0_15px_var(--primary)] relative min-w-[200px] text-center">

                  {/* Corner Brackets */}
                  <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t-4 border-l-4 border-primary" />
                  <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t-4 border-r-4 border-primary" />
                  <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b-4 border-l-4 border-primary" />
                  <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b-4 border-r-4 border-primary" />

                  <h3 className="relative font-heading font-bold text-xl md:text-2xl tracking-tight text-primary uppercase drop-shadow-[0_0_5px_var(--primary)]">
                    {project.title}
                  </h3>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ModeMonitors = ({ displayedProjects }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl p-4 mx-auto">
    {displayedProjects.map((project: any) => (
      <CRTMonitor key={project.id} project={project} />
    ))}
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
