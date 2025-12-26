

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Folder, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

const Archive = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-6 max-w-5xl">
                <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-12 transition-colors">
                    <ArrowLeft size={20} />
                    <span className="font-mono">RETURN_HOME</span>
                </Link>

                <div className="mb-16">
                    <h1 className="text-5xl md:text-8xl font-heading font-black text-foreground mb-6">ARCHIVE</h1>
                    <p className="font-mono text-primary/80 max-w-xl">
                        &gt; ACCESSING_DATABASE...<br />
                        &gt; SHOWING_ALL_PROJECTS
                    </p>
                </div>

                <div className="relative">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 pb-4 border-b border-border font-mono text-sm text-muted-foreground mb-4 px-4">
                        <div className="col-span-1">YEAR</div>
                        <div className="col-span-5 md:col-span-4">PROJECT</div>
                        <div className="col-span-3 hidden md:block">CATEGORY</div>
                        <div className="col-span-4 md:col-span-3 text-right hidden sm:block">BUILT_WITH</div>
                        <div className="col-span-1 text-right">LINK</div>
                    </div>

                    <div className="space-y-2">
                        {projects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link to={`/works/${project.id}`} className="block group">
                                    <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg hover:bg-card border border-transparent hover:border-border hover:shadow-lg transition-all duration-300">

                                        <div className="col-span-1 font-mono text-sm text-muted-foreground">
                                            2024
                                        </div>

                                        <div className="col-span-7 md:col-span-4 font-bold text-lg text-foreground flex items-center gap-3">
                                            {project.title}
                                            <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                                        </div>

                                        <div className="col-span-3 hidden md:flex items-center">
                                            <Badge variant="outline" className="font-mono text-xs rounded-full border-foreground/10 text-foreground/70">
                                                {project.category}
                                            </Badge>
                                        </div>

                                        <div className="col-span-4 md:col-span-3 hidden sm:flex flex-wrap gap-1 justify-end">
                                            {project.tech.slice(0, 3).map(t => (
                                                <span key={t} className="text-xs text-muted-foreground bg-secondary/10 px-2 py-1 rounded">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="col-span-4 sm:col-span-1 text-right">
                                            <Folder className="w-5 h-5 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>

                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Archive;
