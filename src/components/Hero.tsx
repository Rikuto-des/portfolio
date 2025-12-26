import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Terminal, Cpu, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  
  const [text, setText] = useState("");
  const fullText = "root@portfolio:~$ ./init_sequence.sh";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent pt-20">
      
      <div className="container relative z-10 px-4 text-center">
        {/* System Status / Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-md border border-primary/30 rounded-full text-sm font-mono text-primary shadow-[0_0_15px_var(--primary)]"
        >
          <Terminal size={14} />
          <span>{text}</span>
          <span className="animate-pulse">_</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="relative inline-block mb-8 glitch-wrapper"
        >
          <h1 className="font-heading font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] text-foreground drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50" data-text="DIGITAL">DIGITAL</span>
            <span className="block text-primary glitch" data-text="CRAFTSMAN">CRAFTSMAN</span>
          </h1>
          
          {/* Decorative Lines */}
          <div className="absolute -left-8 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent opacity-50 hidden md:block" />
          <div className="absolute -right-8 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent opacity-50 hidden md:block" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative max-w-2xl mx-auto mb-12 p-6"
        >
          {/* Cyber Frame */}
          <div className="absolute inset-0 border border-secondary/30 bg-secondary/5 skew-x-[-10deg]" />
          <div className="absolute top-0 left-0 w-2 h-2 bg-secondary" />
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-secondary" />
          
          <p className="font-mono text-lg md:text-xl text-foreground/90 relative z-10">
            &gt; SYSTEM_STATUS: ONLINE<br />
            &gt; OBJECTIVE: DESIGN_IMMERSIVE_EXPERIENCES
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button 
            size="lg" 
            className="group relative cyber-button bg-primary text-primary-foreground text-xl font-bold px-10 py-8 border-none hover:bg-primary/80 transition-all overflow-hidden"
            asChild
          >
            <a href="#projects" className="flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              <span>ACCESS_PROJECTS</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </Button>
          
          <Button 
            variant="outline"
            size="lg" 
            className="group relative cyber-button bg-transparent text-secondary border border-secondary text-xl font-bold px-10 py-8 hover:bg-secondary/10 hover:text-secondary hover:shadow-[0_0_20px_var(--secondary)] transition-all"
            asChild
          >
            <a href="#contact" className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span>INIT_CONTACT</span>
            </a>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-muted-foreground tracking-[0.3em] animate-pulse">SCROLL_DOWN</span>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mt-2 text-primary"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Tech Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent">
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary -translate-y-1/2 rotate-45" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-primary -translate-y-1/2 rotate-45" />
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-background border border-primary -translate-x-1/2 -translate-y-1/2 rotate-45 flex items-center justify-center">
          <div className="w-1 h-1 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
