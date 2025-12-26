import { motion } from "framer-motion";
import { Home, User, Briefcase, Mail, Folder } from "lucide-react";
import { scrollToElement } from "@/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "projects", icon: Briefcase, label: "Projects" },
    { id: "contact", icon: Mail, label: "Contact" },
];

export const FloatingNav = () => {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { threshold: 0.5 });

        navItems.forEach(item => {
            const section = document.getElementById(item.id);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const handleScroll = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        scrollToElement(id);
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
                className="flex items-center gap-2 p-2 bg-background/80 backdrop-blur-xl border border-border/50 rounded-full shadow-2xl shadow-primary/10"
            >
                {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => handleScroll(e, item.id)}
                            className={`relative p-3 rounded-full transition-all duration-300 group ${isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
                        >
                            <item.icon className="w-5 h-5 relative z-10" />
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-primary/10 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            {/* Tooltip */}
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-background border border-border text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {item.label}
                            </span>
                        </a>
                    );
                })}

                <div className="w-[1px] h-6 bg-border mx-1" />

                <a
                    href="/archive"
                    className="p-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all relative group"
                >
                    <Folder className="w-5 h-5" />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-background border border-border text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Archive
                    </span>
                </a>
            </motion.div>
        </div>
    );
};
