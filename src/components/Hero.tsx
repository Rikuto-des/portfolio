import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { useEffect, useState } from "react";
import { scrollToElement } from "@/lib/utils";
import { cyberReveal, glitchIn, staggerContainer, techPop } from "@/lib/animation-variants";

const Hero = () => {
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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToElement(id, 80);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-transparent pt-20 perspective-1000">

      {/* --- Atmospheric Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-0 inset-x-0 h-[50vh] bg-[linear-gradient(rgba(var(--primary),0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary),0.05)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)_translateY(-100px)] opacity-30 will-change-transform" />
        <div className="absolute bottom-0 inset-x-0 h-[50vh] bg-[linear-gradient(rgba(var(--primary),0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary),0.1)_1px,transparent_1px)] bg-[size:60px_60px] [transform:perspective(500px)_rotateX(60deg)] [mask-image:linear-gradient(to_bottom,transparent,white)] opacity-40 will-change-transform" />
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-b from-primary/5 to-transparent rounded-[100%] opacity-30 pointer-events-none" />
      </div>

      {/* --- Main Content Layout --- */}
      <div className="container relative z-10 px-6 grid lg:grid-cols-12 gap-12 items-center h-full">

        {/* Left Column: Typography & CTA */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start text-left z-20"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Status Badge */}
          <motion.div
            variants={techPop}
            className="mb-8 inline-flex items-center gap-3 px-4 py-1.5 bg-background/50 border border-primary/20 rounded-none text-xs font-mono text-primary backdrop-blur-sm"
          >
            <div className="w-1.5 h-1.5 bg-green-500 rounded-none animate-pulse" />
            <span className="tracking-widest uppercase opacity-80">System_Online</span>
            <span className="w-[1px] h-3 bg-primary/20" />
            <span className="font-bold">{text}<span className="animate-pulse">_</span></span>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={cyberReveal} className="relative mb-8">
            <h1 className="font-heading font-black text-7xl md:text-9xl tracking-tighter leading-[0.85] text-foreground mix-blend-normal">
              <span className="block text-stroke-primary text-transparent opacity-50 text-5xl md:text-7xl mb-2 ml-1">CODING</span>
              <span className="block text-foreground">FUTURE</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-gradient-x text-6xl md:text-8xl mt-1">
                REALITY
              </span>
            </h1>

            {/* Decor Elements */}
            <div className="absolute -left-8 top-0 bottom-0 w-[2px] bg-primary/20 hidden md:block">
              <div className="absolute top-0 w-full h-12 bg-primary animate-pulse" />
            </div>
          </motion.div>

          <motion.p
            variants={glitchIn}
            className="font-mono text-muted-foreground text-sm md:text-base max-w-lg mb-10 leading-relaxed border-l-2 border-secondary/50 pl-6"
          >
            Design engineering at the intersection of aesthetics and functionality.
            Crafting immersive digital experiences that feel <span className="text-secondary font-bold">alive</span>.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={techPop}
            className="flex flex-wrap gap-5"
          >
            <Button
              size="lg"
              className="h-14 bg-foreground text-background text-lg font-bold px-8 rounded-none border border-transparent hover:border-primary hover:bg-background hover:text-foreground transition-all duration-300 shadow-[4px_4px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              asChild
            >
              <a href="#projects" onClick={(e) => handleScroll(e, "#projects")}>
                VIEW_PROJECTS <Cpu className="ml-2 w-4 h-4" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-14 border-foreground/20 text-foreground text-lg font-medium px-8 rounded-none hover:bg-secondary/10 hover:border-secondary hover:text-secondary transition-all"
              asChild
            >
              <a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>
                CONTACT_ME
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Column: Geometric Abstract Art */}
        <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center h-full min-h-[600px]">
          {/* Rotating Rings (CSS Animation) */}
          <div className="relative w-[500px] h-[500px]">
            {/* Ring 1 */}
            <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-4 border border-dashed border-secondary/20 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
            <div className="absolute inset-16 border-[0.5px] border-foreground/10 rounded-full" />

            {/* Planet / Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-tr from-background to-primary/10 rounded-full shadow-2xl border border-primary/10 backdrop-blur-sm z-10">
              <div className="absolute top-4 right-8 w-4 h-4 bg-white/50 rounded-full blur-[2px]" />
            </div>

            {/* Orbiting Dot */}
            <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 animate-[spin_10s_linear_infinite]">
              <div className="absolute top-0 left-1/2 w-3 h-3 bg-secondary rounded-full -translate-x-1/2 shadow-[0_0_10px_var(--secondary)]" />
            </div>

            {/* Background Big Text */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 translate-x-10 rotate-90 origin-left opacity-[0.04] pointer-events-none whitespace-nowrap">
              <span className="text-[8rem] font-black font-heading leading-none">ARCHITECT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Side Text */}
      <div className="absolute right-8 bottom-32 hidden lg:flex flex-col items-center gap-8 z-20">
        <div className="w-[1px] h-32 bg-foreground/20" />
        <span className="writing-vertical-rl text-xs font-mono text-muted-foreground tracking-[0.3em] uppercase rotate-180">
          Based in Tokyo / 2024
        </span>
      </div>

      {/* Tech Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border">
        <div className="absolute right-20 bottom-0 w-32 h-[3px] bg-primary" />
      </div>

    </section>
  );
};

export default Hero;
