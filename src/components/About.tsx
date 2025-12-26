import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";
import { Cpu, Zap, Code, Terminal, Layout } from "lucide-react";
import { staggerContainer } from "@/lib/animation-variants";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const skills = [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Next.js", level: 80 },
    { name: "Framer Motion", level: 75 },
    { name: "UI/UX Design", level: 85 },
    { name: "Figma", level: 90 },
    { name: "Three.js", level: 60 }
  ];

  const services = [
    {
      title: "ENGINEERING",
      id: "DEV_01",
      description: "Building scalable, performant web applications with modern stacks.",
      icon: <Code className="w-5 h-5" />,
      tags: ["Frontend", "Backend", "Performance"]
    },
    {
      title: "INTERFACE",
      id: "UI_02",
      description: "Crafting intuitive, accessible, and beautiful user experiences.",
      icon: <Layout className="w-5 h-5" />,
      tags: ["Design System", "Interaction", "Motion"]
    },
    {
      title: "STRATEGY",
      id: "UX_03",
      description: "Translating business goals into technical reality.",
      icon: <Zap className="w-5 h-5" />,
      tags: ["Analytics", "SEO", "Growth"]
    },
  ];

  return (
    <section id="about" ref={containerRef} className="py-32 min-h-screen relative overflow-hidden flex items-center bg-transparent">

      {/* --- Dynamic Cyber Background (Optimized) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Static Grid - Light Opacity */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary),0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)] opacity-40 will-change-transform" />

        {/* Ambient Glow spots - Optimized (No Blur, No Blend) */}
        <div className="absolute top-1/4 -right-10 w-[300px] h-[300px] bg-primary/5 rounded-full opacity-60" />
        <div className="absolute -bottom-10 -left-10 w-[200px] h-[200px] bg-secondary/5 rounded-full opacity-60" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* --- Left Column: Identity Module --- */}
          <motion.div
            className="lg:col-span-5 flex flex-col gap-8 relative"
            style={{ y }}
          >
            {/* Holographic Header */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="font-mono text-xs text-primary mb-2 flex items-center gap-2"
              >
                <Terminal size={12} />
                <span>ID_VERIFICATION: 2045-XJ</span>
              </motion.div>

              <h2 className="font-heading font-black text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground/90 to-foreground/50 leading-[0.85] tracking-tighter">
                WHO<br />
                <span className="text-stroke-primary text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-gradient-x">AM I?</span>
              </h2>
            </div>

            {/* Profile Card HUD */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative group perspective-1000"
            >
              <div className="absolute inset-0 bg-primary/5 transform rotate-2 rounded-2xl border border-primary/20 transition-transform group-hover:rotate-1" />

              <div className="relative bg-card/80 border border-border/50 rounded-2xl p-6 overflow-hidden shadow-lg">
                {/* Decorative Lines */}
                <div className="absolute top-4 right-4 flex gap-1">
                  <div className="w-12 h-1 bg-primary/50" />
                  <div className="w-2 h-1 bg-secondary/50" />
                </div>

                <div className="relative z-10">
                  <p className="font-mono text-primary/80 text-sm mb-4 border-b border-primary/20 pb-2 inline-block">
                    &gt; EXECUTE: BIO_SUMMARY
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Tokyo-based digital craftsman with a passion for building <span className="text-foreground font-bold">immersive web experiences</span>.
                    Merging technical precision with artistic direction to create digital products that feel alive.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Creative Dev", "UI Designer", "3D Artist"].map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-background border border-border rounded-full text-xs font-mono text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Overlay - Simplified */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </motion.div>

            {/* Skill Matrix Compact */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-card/50 border border-border/50 rounded-xl p-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid opacity-5" />
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2 font-mono tracking-widest text-sm">
                <Cpu size={16} className="text-primary" />
                  // SKILL_DATABASE_V1.0
              </h3>
              <div className="flex flex-wrap gap-2 relative z-10">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-background/80 border-border hover:border-primary text-muted-foreground hover:text-primary transition-all cursor-crosshair"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </motion.div>

          </motion.div>

          {/* --- Right Column: Services & Visuals --- */}
          <div className="lg:col-span-7 flex flex-col gap-6 pt-20">
            {/* Tech Cards */}
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

                <div className="relative bg-card/60 border border-border/60 group-hover:border-primary/50 rounded-xl p-6 lg:p-8 flex items-start gap-6 transition-all duration-300 group-hover:translate-x-2 overflow-hidden shadow-sm hover:shadow-md">

                  {/* Background Number */}
                  <span className="absolute -right-4 -bottom-8 text-9xl font-black text-foreground/5 font-heading pointer-events-none group-hover:text-primary/10 transition-colors">
                    0{index + 1}
                  </span>

                  {/* Icon Container */}
                  <div className="relative flex-shrink-0 w-14 h-14 bg-background border border-border/60 rounded-lg flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_15px_var(--primary)] transition-all">
                    <div className="text-foreground group-hover:text-primary transition-colors">
                      {service.icon}
                    </div>
                    {/* Corner Dots */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-foreground/10 rounded-full" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-foreground/10 rounded-full" />
                  </div>

                  {/* Content */}
                  <div className="flex-grow z-10 w-full">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-heading font-bold text-2xl text-foreground group-hover:text-primary transition-colors tracking-wide">
                        {service.title}
                      </h3>
                      <span className="font-mono text-xs text-muted-foreground border border-border/60 px-2 py-1 rounded">
                        {service.id}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4 font-light text-sm lg:text-base border-l-2 border-border/60 pl-4 group-hover:border-primary/50 transition-colors">
                      {service.description}
                    </p>

                    <div className="flex gap-4">
                      {service.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono text-muted-foreground/70 group-hover:text-primary/70 transition-colors flex items-center gap-1">
                          <div className="w-1 h-1 bg-current rounded-full" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Animated Border Line */}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
};

export default About;
