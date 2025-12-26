import { useState, useEffect } from "react";
import { Menu, X, Github, Twitter, Linkedin, Terminal } from "lucide-react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { scrollToElement } from "@/lib/utils";
import { glitchIn, techPop } from "@/lib/animation-variants";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToElement(href, 80);
      }, 100);
    } else {
      scrollToElement(href, 80);
    }
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com" },
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Linkedin, href: "https://linkedin.com" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${isScrolled
            ? "py-3 bg-background/80 backdrop-blur-md border-border shadow-sm"
            : "py-6 bg-transparent"
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Top Tech Line Decoration */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            to="/"
            className="relative z-50 group flex items-center gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <motion.div
              variants={glitchIn}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-primary/10 border border-primary flex items-center justify-center rounded">
                <Terminal size={16} className="text-primary" />
              </div>
              <span className="font-heading font-bold text-2xl tracking-tighter text-foreground group-hover:text-primary transition-colors flex items-baseline gap-1 glitch-wrapper">
                <span className="glitch" data-text="RIKUTO">RIKUTO</span>
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex gap-1">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <a
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors group cursor-pointer"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity mr-1 text-primary">[</span>
                    {item.name}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-primary">]</span>

                    {/* Hover Glow */}
                    <span className="absolute inset-0 bg-primary/5 rounded opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </a>
                </motion.li>
              ))}
              {/* Archive Link */}
              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  to="/archive"
                  className="relative px-4 py-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity mr-1 text-primary">[</span>
                  Archive
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-primary">]</span>
                </Link>
              </motion.li>
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded bg-background/50 border border-primary/30 text-primary hover:bg-primary/10 transition-all"
            onClick={() => setIsOpen(!isOpen)}
            variants={techPop}
            initial="hidden"
            animate="visible"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex items-center justify-center md:hidden"
          >
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 pointer-events-none bg-grid opacity-20" />

            {/* Scanline */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20" />

            <nav className="text-center relative z-10 w-full px-6">
              <ul className="flex flex-col gap-6 mb-12">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      className="inline-block text-4xl font-heading font-black text-foreground hover:text-primary hover:tracking-widest transition-all duration-300 glitch-wrapper"
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      <span className="glitch" data-text={item.name}>{item.name}</span>
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    to="/archive"
                    className="inline-block text-4xl font-heading font-black text-foreground hover:text-primary hover:tracking-widest transition-all duration-300 glitch-wrapper"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="glitch" data-text="ARCHIVE">ARCHIVE</span>
                  </Link>
                </motion.li>
              </ul>

              <div className="flex justify-center gap-6">
                {socialLinks.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-3 bg-white border border-border rounded-full text-foreground hover:bg-primary hover:text-white hover:shadow-[0_0_15px_var(--primary)] transition-all"
                  >
                    <item.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
