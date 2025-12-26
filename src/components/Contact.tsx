import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Check, Loader2, Terminal, MessageSquare, User, AtSign } from "lucide-react";
import { useState } from "react";

const Confetti = () => {
  const particles = Array.from({ length: 20 });
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            scale: [0, 1, 0],
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`absolute w-4 h-4 ${
            ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-white'][Math.floor(Math.random() * 4)]
          } ${
            ['rounded-full', 'rounded-none', 'rounded-sm'][Math.floor(Math.random() * 3)]
          }`}
        />
      ))}
    </div>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFormState('success');
    
    // Reset after showing success state
    setTimeout(() => {
      setFormState('idle');
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      {/* Cyber Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background via-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        {/* Radar Scan Effect */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/10 rounded-full opacity-30"
        >
          <div className="absolute top-0 left-1/2 w-[1px] h-1/2 bg-gradient-to-b from-transparent to-primary/50 origin-bottom" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Text & Info */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <span className="font-mono text-sm text-primary tracking-widest">COMMS_LINK_READY</span>
              </div>

              <h2 className="font-heading font-black text-6xl md:text-8xl mb-6 leading-none text-foreground drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                LET'S<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary animate-gradient-x">
                  CONNECT
                </span>
              </h2>
              
              <div className="font-mono text-lg text-muted-foreground border-l-2 border-primary/30 pl-6 py-2 bg-gradient-to-r from-primary/5 to-transparent">
                <p>
                  &gt; INITIATE_PROTOCOL: Collaboration<br />
                  &gt; STATUS: Waiting for signal...<br />
                  &gt; MSG: "Let's build something impossible."
                </p>
              </div>
            </motion.div>

            <div className="space-y-6">
              <a 
                href="mailto:hello@rikuto.design" 
                className="group relative flex items-center justify-between p-8 bg-black/40 border border-primary/30 rounded-lg hover:border-primary transition-all overflow-hidden"
              >
                {/* Hover Fill Effect */}
                <div className="absolute inset-0 bg-primary/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                
                <div className="relative z-10">
                  <span className="block text-xs font-mono text-primary mb-2 tracking-widest">Target_Address</span>
                  <span className="font-heading font-bold text-2xl md:text-4xl text-foreground">hello@rikuto.design</span>
                </div>
                <div className="relative z-10 w-16 h-16 rounded-full border-2 border-primary/50 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all group-hover:shadow-[0_0_20px_var(--primary)]">
                  <Mail className="w-8 h-8" strokeWidth={2} />
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-card/30 backdrop-blur-xl p-1 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(var(--primary),0.1)]"
          >
            <div className="bg-black/80 p-8 md:p-10 rounded-xl relative overflow-hidden">
              {/* Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] pointer-events-none bg-[length:100%_4px,3px_100%]" />
              
              {/* Header UI */}
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <Terminal size={14} />
                  <span>TRANSMISSION_CONSOLE</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
              </div>

              <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label htmlFor="name" className="text-xs font-mono text-primary flex items-center gap-2 group-focus-within:text-white transition-colors">
                      <User size={12} /> // IDENTIFIER
                    </label>
                    <Input 
                      id="name" 
                      required
                      placeholder="Input Name..." 
                      disabled={formState !== 'idle'}
                      className="bg-white/5 border-white/10 focus:border-primary h-12 rounded-none text-base font-mono text-foreground transition-all focus:bg-white/10 placeholder:text-muted-foreground/30" 
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label htmlFor="email" className="text-xs font-mono text-primary flex items-center gap-2 group-focus-within:text-white transition-colors">
                      <AtSign size={12} /> // FREQUENCY
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      required
                      placeholder="Input Email..." 
                      disabled={formState !== 'idle'}
                      className="bg-white/5 border-white/10 focus:border-primary h-12 rounded-none text-base font-mono text-foreground transition-all focus:bg-white/10 placeholder:text-muted-foreground/30" 
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label htmlFor="message" className="text-xs font-mono text-primary flex items-center gap-2 group-focus-within:text-white transition-colors">
                    <MessageSquare size={12} /> // DATA_PACKET
                  </label>
                  <Textarea 
                    id="message" 
                    required
                    placeholder="Input Message Sequence..." 
                    disabled={formState !== 'idle'}
                    className="bg-white/5 border-white/10 focus:border-primary min-h-[150px] rounded-none text-base font-mono text-foreground resize-none p-4 transition-all focus:bg-white/10 placeholder:text-muted-foreground/30"
                  />
                </div>

                <div className="relative pt-4">
                  {formState === 'success' && <Confetti />}
                  
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={formState !== 'idle'}
                    className={`w-full h-14 text-lg font-bold rounded-none border transition-all relative overflow-hidden group
                      ${formState === 'success' 
                        ? 'bg-green-500/20 text-green-500 border-green-500' 
                        : 'bg-primary/10 text-primary border-primary hover:bg-primary hover:text-black'
                      }
                    `}
                  >
                    {/* Button Decor */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-50" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-50" />

                    <AnimatePresence mode="wait">
                      {formState === 'idle' && (
                        <motion.span 
                          key="idle"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-3 font-mono tracking-wider"
                        >
                          <Send className="w-5 h-5" />
                          TRANSMIT_DATA
                        </motion.span>
                      )}
                      {formState === 'submitting' && (
                        <motion.span 
                          key="submitting"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3 font-mono tracking-wider"
                        >
                          <Loader2 className="w-5 h-5 animate-spin" />
                          UPLOADING...
                        </motion.span>
                      )}
                      {formState === 'success' && (
                        <motion.span 
                          key="success"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="flex items-center gap-3 font-mono tracking-wider"
                        >
                          <Check className="w-5 h-5" />
                          TRANSMISSION_COMPLETE
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
