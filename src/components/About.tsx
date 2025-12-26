import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";
import { Cpu, Globe, Zap, Code, Terminal, User } from "lucide-react";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const skills = [
    "Figma", "Adobe XD", "Protopie", "React", "TypeScript", 
    "Tailwind CSS", "Framer Motion", "UI Design", "UX Research", 
    "Brand Identity", "3D Modeling", "Motion Graphics"
  ];

  const services = [
    { title: "UI/UX Design", description: "Designing intuitive interfaces", icon: <Globe className="w-6 h-6" /> },
    { title: "Frontend Dev", description: "Building efficient code", icon: <Code className="w-6 h-6" /> },
    { title: "Brand Strategy", description: "Crafting digital identities", icon: <Zap className="w-6 h-6" /> },
  ];

  // Helper icons
  function LayersIcon() { return <Globe className="w-6 h-6" />; }
  function CodeIcon() { return <Code className="w-6 h-6" />; }
  function RocketIcon() { return <Zap className="w-6 h-6" />; }

  // Random rotation for sticker effect - keeping it subtle for cyber theme
  const getRandomRotation = () => Math.random() * 4 - 2;

  return (
    <section id="about" className="py-32 bg-background relative overflow-hidden">
      
      {/* Tech Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-full border-l border-primary/10 bg-primary/5" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        {/* Animated Data Stream */}
        <div className="absolute top-20 right-10 flex flex-col gap-2 opacity-30">
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Column: Title & Image */}
          <div className="lg:w-1/2 space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -left-8 top-0 text-xs font-mono text-primary/50 writing-vertical-lr hidden lg:block">
                // SYSTEM_ID: CREATOR
              </div>
              
              <h2 className="font-heading font-black text-6xl md:text-8xl text-foreground mb-6 leading-none drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]">
                WHO<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary relative inline-block glitch-wrapper">
                  <span className="glitch" data-text="AM I?">AM I?</span>
                </span>
              </h2>
              
              <div className="relative p-6 border border-primary/30 bg-card/50 backdrop-blur-sm rounded-tr-2xl rounded-bl-2xl">
                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary" />
                
                <p className="font-mono text-lg text-foreground/80 leading-relaxed max-w-md">
                  &gt; TARGET: Tokyo-based Multi-Creator.<br />
                  &gt; MISSION: Fusing design & technology.<br />
                  &gt; STATUS: Creating breathing digital products.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-full max-w-[400px] aspect-square group"
            >
              {/* Cyber Frame */}
              <div className="absolute inset-0 border-2 border-primary/50 rounded-lg translate-x-2 translate-y-2" />
              <div className="absolute inset-0 border-2 border-secondary/50 rounded-lg -translate-x-2 -translate-y-2" />
              
              <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/20 bg-black">
                <img 
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2574&auto=format&fit=crop" 
                  alt="Portrait" 
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                />
                {/* Hologram Scanline */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </div>
              
              {/* Tag Decoration */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/80 text-primary font-mono text-xs px-3 py-1 rounded border border-primary/50 backdrop-blur-md">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                ONLINE
              </div>
            </motion.div>
          </div>

          {/* Right Column: Services & Skills */}
          <div className="lg:w-1/2 space-y-16 w-full">
            
            {/* Services */}
            <div className="space-y-8">
              <h3 className="font-heading font-black text-4xl mb-6 flex items-center gap-4 text-foreground">
                <Terminal className="text-primary w-8 h-8" />
                CAPABILITIES
              </h3>
              <div className="grid gap-4">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: -5, backgroundColor: "rgba(var(--primary), 0.1)" }}
                    className="group flex items-center justify-between p-4 bg-card/30 border border-white/10 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-primary group-hover:text-white transition-colors">
                        {service.icon}
                      </div>
                      <div>
                        <h4 className="font-mono font-bold text-lg group-hover:text-primary transition-colors">{service.title}</h4>
                        <p className="text-muted-foreground text-sm font-mono">{service.description}</p>
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-white/20 group-hover:bg-primary rounded-full transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-heading font-black text-4xl mb-8 flex items-center gap-4 text-foreground">
                <Cpu className="text-secondary w-8 h-8" />
                SKILL_MATRIX
              </h3>
              <div ref={containerRef} className="flex flex-wrap gap-3 p-6 border border-white/5 bg-white/5 rounded-xl relative">
                {/* Decorative Grid Background */}
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none rounded-xl" />
                
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    drag
                    dragConstraints={containerRef}
                    dragElastic={0.2}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    whileHover={{ scale: 1.1, cursor: "grab", zIndex: 20 }}
                    whileDrag={{ scale: 1.2, cursor: "grabbing", zIndex: 50 }}
                    className="relative"
                  >
                    <Badge className={`
                      px-3 py-1.5 text-sm font-mono tracking-wider bg-black/60 text-foreground border border-primary/30 
                      hover:border-primary hover:text-primary hover:shadow-[0_0_10px_var(--primary)]
                      transition-all cursor-grab active:cursor-grabbing select-none backdrop-blur-md
                    `}>
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Tech Divider */}
      <div className="absolute bottom-0 left-0 w-full h-16 flex items-end">
        <div className="w-1/3 h-[1px] bg-primary/30" />
        <div className="w-1/3 h-[1px] bg-primary/30" />
        <div className="w-1/3 h-[1px] bg-primary/30" />
        
        {/* Decor Blocks */}
        <div className="absolute bottom-0 left-[20%] w-16 h-2 bg-primary/20" />
        <div className="absolute bottom-0 right-[20%] w-32 h-2 bg-secondary/20" />
      </div>
    </section>
  );
};

export default About;
