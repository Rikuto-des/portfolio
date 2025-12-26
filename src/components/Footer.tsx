import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-foreground py-12 border-t border-white/10 relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.1]" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(var(--primary), 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary), 0.2) 1px, transparent 1px)', 
             backgroundSize: '30px 30px' 
           }} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start gap-4"
          >
            <div className="flex items-center gap-2 text-primary font-mono border border-primary/30 px-3 py-1 rounded bg-primary/5">
              <Terminal size={16} />
              <span>SYSTEM_OFFLINE</span>
            </div>
            
            <div className="text-center md:text-left">
              <span className="font-heading font-black text-4xl tracking-tighter text-white">
                RIKUTO
              </span>
              <p className="text-sm font-mono text-muted-foreground mt-1">
                // Digital Craftsman & UI/UX Designer
              </p>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-6 font-mono text-sm"
          >
            {[
              { name: 'HOME', href: '#home' },
              { name: 'ABOUT', href: '#about' },
              { name: 'WORK', href: '#projects' },
              { name: 'CONTACT', href: '#contact' }
            ].map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className="text-muted-foreground hover:text-primary transition-colors relative group"
              >
                <span className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary">&gt;</span>
                {item.name}
              </a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs font-mono text-muted-foreground/50 text-center md:text-right"
          >
            <p>EXECUTION TIME: {new Date().toLocaleTimeString()}</p>
            <p className="mt-1"> {currentYear} RIKUTO. ALL RIGHTS RESERVED.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
